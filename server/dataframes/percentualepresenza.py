import pandas as pd
import json
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('data/stato_lavori.csv', sep=';', encoding='UTF-8')

c1_1 = df[(df['Fibra'] == 1) & (df['FWA'] == 1)].shape[0]
c0_1 = df[(df['Fibra'] == 1) | (df['FWA'] == 1)].shape[0] - c1_1 #df[(df['Fibra'] == 1) & (df['FWA'] == 0)].shape[0] + df[(df['Fibra'] == 0) & (df['FWA'] == 1)].shape[0]
c0_0 = df[(df['Fibra'] == 0) & (df['FWA'] == 0)].shape[0]

output = [
    {
      "id": "Entrambe",
      "value": c1_1,
    },
    {
      "id": "Fibra o FWA",
      "value": c0_1,
    },
    {
      "id": "Nessuna",
      "value": c0_0,
    }
  ]

def GetJson():
    return json.dumps(output)

#print(GetJson())