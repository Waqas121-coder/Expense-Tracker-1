import { Button } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';

const DailyChart = props => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const isLeapYear=year=>{
        if(year%400===0)return 1
        if(year%100===0)return 0
        if(year%4===0) return 1
        return 0
    }

    var nDays=[
        [31,28,31,30,31,30,31,31,30,31,30,31],
        [31,29,31,30,31,30,31,31,30,31,30,31]
    ]

    const [schemaData,setSchemaData]=useState(null)


      useEffect(()=>{
          var labels=['']
          for(var i=1;i<=nDays[isLeapYear()][props.month-1];i++)
              labels.push(i)
          var data=[]
          for(var i=0;i<=nDays[isLeapYear()][props.month-1];i++)
              data.push(0)
          props.data.map(d=>{
              if(d.type===0)
                  data[d.date]-=d.amount
              else
                  data[d.date]+=d.amount
          })
          var max=data[0];
          for(var i=1;i<data.length;i++)
              if(data[i]>max)
                  max=data[i]
          var min=data[0];
          for(var i=1;i<data.length;i++)
              if(data[i]<min)
                  min=data[i]

          var schema={
              labels:labels,
              data:data,
              max:max,
              min:min
          }
          setSchemaData(schema)
      },[props.month,props.data])


    return (
        <div style={{scaleY:'2'}} className="dailyChart">
            {
                schemaData===null?(
                    <div/>
                ):(
                    <Line
                        data={{
                            labels: schemaData.labels,
                            datasets: [{
                                label: 'Daily Remaining cash',
                                data: schemaData.data,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }]
                        }}
                        width={10}
                        height={300}
                        options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        max:schemaData.max,
                                        min:schemaData.min
                                    }
                                }]
                            },
                            title:{
                                display:true,
                                text:monthNames[props.month-1]+', '+props.date.getFullYear(),
                                fontSize:25
                            },
                            maintainAspectRatio: false }}
                    />
                )
            }

        </div>

    )
}

export default DailyChart
