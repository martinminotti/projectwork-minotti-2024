import pandas as pd
import json

# Leggere il file CSV
df = pd.read_csv('data/stato_lavori.csv', sep=';', encoding='UTF-8')

# Preparare i dati per la fibra
valori_fibra = df[(df['Fibra'] == 1) & (df['Piano fibra (anno)'] != 0)]['Piano fibra (anno)'].value_counts().sort_index()
anni_fibra = sorted(df['Piano fibra (anno)'].dropna().unique())  # Assicurarsi che gli anni siano ordinati
fibra_anno = [{'x': str(anno), 'y': int(valori_fibra.get(anno, 0))} for anno in anni_fibra]

# Preparare i dati per il FWA
valori_fwa = df[(df['FWA'] == 1) & (df['Piano FWA (anno)'] != 0)]['Piano FWA (anno)'].value_counts().sort_index()
anni_fwa = sorted(df['Piano FWA (anno)'].dropna().unique())  # Assicurarsi che gli anni siano ordinati
fwa_anno = [{'x': str(anno), 'y': int(valori_fwa.get(anno, 0))} for anno in anni_fwa]

# Struttura finale dei dati
new_data = [
    {
        'id': 'Fibra',
        'data': fibra_anno
    },
    {
        'id': 'FWA',
        'data': fwa_anno
    }
]

# Funzione per ottenere i dati JSON
def GetJson():
    return json.dumps(new_data, indent=4)

#print(GetJson())
