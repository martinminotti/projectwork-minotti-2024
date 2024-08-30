import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('data/stato_lavori.csv', sep=';', encoding='UTF-8')

# Creo le stringhe per filtrare i lavori in base al loro stato, come specificato nel glossario, in ordine
str_prog = 'in programmazione|in progettazione' # In progettazione
str_esec = 'in esecuzione' # In esecuzione
str_term = 'terminato|lavori chiusi|in collaudo' # Terminato

terminati = df[(df['Stato Fibra'].str.contains(str_term, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index() # sort index gli ordina cronologicamente
in_esecuzione = df[(df['Stato Fibra'].str.contains(str_esec, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()
in_progettazione = df[(df['Stato Fibra'].str.contains(str_prog, na=False)) & (df['Fibra'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()
anni = df['Piano fibra (anno)'].sort_values().dropna().unique()

conteggio_combinato_lavori_lomb = pd.DataFrame({'anni': anni, 'progettazione': in_progettazione, 'esecuzione': in_esecuzione, 'terminati': terminati})

def GetJson():
    return conteggio_combinato_lavori_lomb.fillna(0).to_json(orient="records")#setto i null a 0, poi faccio il tojson


#print(GetJson())