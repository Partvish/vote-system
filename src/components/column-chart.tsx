import React from 'react';
import {VictoryAxis, VictoryBar, VictoryChart, VictoryLabel} from 'victory';

type ColumnChartPropsType = {
    data: any[],
    candidates: string[]
}

const ColumnChart= (props: ColumnChartPropsType) =>{
    return <VictoryChart domainPadding={20}>
    <VictoryAxis tickFormat={x=>x} />
    <VictoryAxis dependentAxis tickFormat={(x) => x}/>
    <VictoryBar data={props.data} x="index" y="value" labels={props.candidates} style={{data: {fill: '#673AB7'}}} labelComponent={
      <VictoryLabel angle={-45} textAnchor="start" style={{fontSize: 8}}  />
    }  />
  </VictoryChart>
}


export default ColumnChart