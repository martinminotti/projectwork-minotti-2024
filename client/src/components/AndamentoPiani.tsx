import React, { useState, useEffect } from 'react'
import { ResponsiveLine } from '@nivo/line';
import { fetchAndamentiPiani } from '../service/api';
import { tokens } from "../theme";
import { useTheme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SelectBox from '../scenes/global/SelectBox';


interface DataItem {
    id: string;
    data: { x: string, y: number }[];
}

export default function AndamentoPianiLine({isDashboard = false}) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const[data, setData] = useState<DataItem[]>([])
    const [filter, setFilter] = useState<string>('Fibra');

    useEffect(() => {fetchAndamentiPiani().then(items => setData(items))}, []);

    const handleChange = (e: SelectChangeEvent<string>) => {
        setFilter(e.target.value);
    };

    const filteredData = data.find(item => item.id === filter);

    if (!filteredData) {
        return <div>No data available</div>;
    }

    const transformedData:DataItem[] =[{
        id: filter,
        data: filteredData.data.map(entry => ({ x: entry.x , y:entry.y}))
    }];
    
    return(<>
        <div>
            {isDashboard ? undefined : <SelectBox label='Tecnologia' inputs={['Fibra', 'FWA']} callback={handleChange}/>}
        </div>

        
            <ResponsiveLine
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
                    tooltip: {
                      container: {
                        color: colors.primary[500],
                      },
                    },
                  }}
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : 'Anno',
                    legendOffset: 36,
                    legendPosition: 'middle'
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : 'Conteggio',
                    legendOffset: -50,
                    legendPosition: 'middle'
                }}
                colors={{ scheme: "nivo" }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={isDashboard ? undefined :[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                layers={[
                    'grid',
                    'markers',
                    'areas',
                    'lines',
                    'slices',
                    'points',
                    'axes',
                    'legends',
                    'crosshair'
                ]}
                curve="linear"
                enableGridX={true}
                enableGridY={true}
                enablePoints={true}
                enablePointLabel={false}
                pointLabel="y"
                enableArea={false}
                areaOpacity={0.1}
                areaBlendMode="normal"
                areaBaselineValue={0}
                lineWidth={2}
                isInteractive={true}
                debugMesh={false}
                tooltip={({ point }) => (
                    <div>
                        <strong>{point.serieId}</strong> [{point.data.xFormatted}, {point.data.yFormatted}]
                    </div>
                )}
                enableSlices="x"
                debugSlices={false}
                sliceTooltip={({ slice }) => (
                    <div
                        style={{
                            background: 'white',
                            padding: '9px 12px',
                            border: '1px solid #ccc',
                        }}
                    >
                        {slice.points.map(point => (
                            <div
                                key={point.id}
                                style={{
                                    color: point.serieColor,
                                    padding: '3px 0',
                                }}
                            >
                                <strong>{point.serieId}</strong> [{point.data.xFormatted}, {point.data.yFormatted}]
                            </div>
                        ))}
                    </div>
                )}
                enableCrosshair={true}
                crosshairType="x"
                role="application"
                defs={[]}
                fill={[]}
            />
        
        </>
    );
  }
  