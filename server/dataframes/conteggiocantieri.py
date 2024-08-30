import pandas as pd
import json
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('data/stato_lavori.csv', sep=';', encoding='UTF-8')
str_prog = 'in programmazione|in progettazione' # In progettazione
str_esec = 'in esecuzione' # In esecuzione
str_term = 'terminato|lavori chiusi|in collaudo' # Terminato

def SceltaConteggio():
    # aperti
    fibra_cablata = df[df['Fibra'] == 1]['Regione'].value_counts().to_dict()
    fwa = df[df['FWA'] == 1]['Regione'].value_counts().to_dict()
    aperti = {"id": "Aperti", "fibra": fibra_cablata, "fwa": fwa}

    # terminati
    fibra_cablata = df[df['Stato Fibra'].str.contains(str_term, na=False)]['Regione'].value_counts().to_dict()
    fwa = df[df['Stato FWA'].str.contains(str_term, na=False)]['Regione'].value_counts().to_dict()
    terminati = {"id": "Terminati", "fibra": fibra_cablata, "fwa": fwa}

    # in progettazione
    fibra_cablata = df[df['Stato Fibra'].str.contains(str_prog, na=False)]['Regione'].value_counts().to_dict()
    fwa = df[df['Stato FWA'].str.contains(str_prog, na=False)]['Regione'].value_counts().to_dict()
    progettazione = {"id": "Progettazione", "fibra": fibra_cablata, "fwa": fwa}

    # Combina i risultati
    conteggio_combinato = [aperti, terminati, progettazione]

    return conteggio_combinato

conteggio_combinato = SceltaConteggio()
conteggio_json = json.dumps(conteggio_combinato, ensure_ascii=False, indent=4)

def GetJson():
    return conteggio_json

#print(conteggio_json)