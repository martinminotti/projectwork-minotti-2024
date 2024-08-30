from flask import request, jsonify, session
import flask, redis
from flask_cors import CORS
from dataframes import pianoanno, percentualepresenza, conteggiocantieri, andamentopiani
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from models import db, User, Role, insert_default_role

app = flask.Flask(__name__)  
app.config.from_object(ApplicationConfig)
db.init_app(app)
bcrypt = Bcrypt(app)

redis_cli = redis.Redis(
        host='redis',
        port=6379,
        charset="utf-8",
        decode_responses=True,
        ) 

# CORS configurato per ricevere da tutti i container in esecuzione in locale, con porta 3000
CORS(app, origins="http://localhost" ,supports_credentials=True)

def insert_default_users():
    if User.query.count() == 0:
        hashed_password = bcrypt.generate_password_hash("password")
        martinminotti = User(email="martinminotti@gmail.com", name="Martin Minotti", password=hashed_password) 
        stefanocastagnoli = User(email="stefano.castagnoli@fitstic-edu.com", name="Stefano Castagnoli", password=hashed_password, roleid=1) 
        db.session.add(martinminotti)
        db.session.add(stefanocastagnoli)
        db.session.commit()
    
with app.app_context():
    db.create_all()
    insert_default_role()
    insert_default_users()

@app.route("/@me")
def get_current_user():
    user_id = redis_cli.get("user_id")
    print(user_id)
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    if user:
        role = Role.query.filter_by(id=user.roleid).first()
    else: return jsonify({"error": "Unauthorized"}), 401

    if user:
        return jsonify({
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": role.name
        })
    
@app.route("/logout", methods=["GET"])
def logout_user():
    redis_cli.delete("user_id")
    return jsonify({"message": "Logout successed"}), 200
    

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    name = request.json["name"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Unauthorized"}), 401

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, name=name, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    try:
        email = request.json["email"]
        password = request.json["password"]
        print(f"credenziali ricevute, email: {email}; password: {password}")

        user = User.query.filter_by(email=email).first()
        if user is None:
            return jsonify({"error": "Unauthorized"}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Unauthorized"}), 401

        redis_cli.setex("user_id", 900 ,user.id)
        return jsonify({
            "id": user.id,
            "email": user.email
        })
    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"error": "Internal Server Error"}), 500


@app.route("/pianoanno")
def getPianoanno():
    return pianoanno.GetJson()

@app.route("/percentualepreseza")
def getPercentualePreseza():
    return percentualepresenza.GetJson()

@app.route("/conteggiocantieri")
def getConteggioCantieri():
    return conteggiocantieri.GetJson()

@app.route("/andamentopiani")
def getAndamentoPiani():
    return andamentopiani.GetJson()

if __name__ == "__main__":
    app.run(debug=True,host="0.0.0.0", port=5000)

        
