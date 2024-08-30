import React, { useState, useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar';
import { fetchConteggioCantieri } from '../service/api';
import { tokens } from "../theme";
import { useTheme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SelectBox from '../scenes/global/SelectBox';


interface DataItem {
    id: string;
    fibra: Record<string, number>;
    fwa: Record<string, number>;
}


export default function ConteggioCantieriBar({isDashboard = false}) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const [data, setData] = useState<DataItem[]>([]);
    const [filter, setFilter] = useState<string>('Aperti');

    useEffect(() => {
        fetchConteggioCantieri().then(items => setData(items))
    }, []);

    const handleChange = (e: SelectChangeEvent<string>) => {
        setFilter(e.target.value);
    };

    const filteredData = data.find(item => item.id === filter);

    if (!filteredData) {
        return <div>No data available</div>;
    }

    const transformedData = Object.keys(filteredData.fibra).map(region => ({
        regione: region,
        fibra: filteredData.fibra[region],
        fwa: filteredData.fwa[region]
    }));
    
    return(<>
            <div>
                {isDashboard ? undefined : <SelectBox label='Stato Cantieri' inputs={['Aperti', 'Terminati', 'Progettazione']} callback={handleChange}/>}
            </div>

                <ResponsiveBar
                    data={transformedData}
                    theme={{
                        axis: {
                          domain: {
                            line: {
                              stroke: colors.grey[100],
                            },
                          },
                          legend: {
                            text: {
                              fill: colors.grey[100],
                            },
                          },
                          ticks: {
                            line: {
                              stroke: colors.grey[100],
                              strokeWidth: 1,
                            },
                            text: {
                              fill: colors.grey[100],
                            },
                          },
                        },
                        legends: {
                          text: {
                            fill: colors.grey[100],
                          },
                        },
                        tooltip:{
                            container:{
                                color: colors.grey[500]
                            }
                        }
                      }}
                    keys={['fibra', 'fwa']}
                    
                    indexBy="regione"
                    margin={{ top: 10, right: 130, bottom: 90, left: 60 }}
                    padding={0.3}
                    colors={{ scheme: 'nivo' }}
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={isDashboard ? null : {
                      tickSize: 5,
                      tickPadding: 5,
                      truncateTickAt: 14,
                      tickRotation: -90,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: isDashboard ? undefined : 'Conteggio',
                      legendPosition: 'middle',
                      legendOffset: -45
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    animate={true}
                />
            
        </>
    );
  }