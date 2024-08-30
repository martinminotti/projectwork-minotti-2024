import React, { useState, useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar';
import { fetchPianoAnno } from '../service/api';
import { tokens } from "../theme";
import { useTheme } from '@mui/material';

export default function PianoAnnoBar({isDashboard = false}) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const[data, setData] = useState([{}]);
  useEffect(() => {fetchPianoAnno().then(items => setData(items))}, []);
  
  
    
  return (
    <>
      <ResponsiveBar
        data={data}
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
        keys={['progettazione', 'esecuzione', 'terminati']}
        indexBy="anni"
        margin={{ top: 60, right: 120, bottom: 60, left: 120 }}
        padding={0.3}
        innerPadding={2}
        maxValue={1800}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        colors={{ scheme: 'set1' }}
        animate={true}
        enableLabel={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : 'Anni',
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Cantieri",
          legendPosition: "middle",
          legendOffset: -50
        }}
      />
    </>
  );
}
