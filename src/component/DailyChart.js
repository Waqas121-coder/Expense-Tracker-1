import { Button } from '@material-ui/core';
import React, { useState } from 'react';
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

    var labels=['']

    for(var i=1;i<=nDays[isLeapYear()][props.month-1];i++)
        labels.push(i)

    const [currentMonth,setCurrentMonth]=useState(props.month)
    const [monthlyData,setMonthlyData]=useState(props.data)
      let arr=new Array(32);
      for(let i=0;i<32;i++){
          arr[i]=0;
      }
      
      monthlyData.map(({month,amount,date,type})=>{
        
            let expense=arr[date-1];
        if(amount != null){
            if(type==1){
                expense+=amount;
            }
            if(type==0){
                expense-=amount
            }else{
                console.log("error");
            }
        }
        if(month==currentMonth){
            arr[date]=expense;
        }
  });

      const getMax=()=>{
          var max=arr[0];
          for(var i=1;i<arr.length;i++)
              if(arr[i]>max)
                  max=arr[i]
          return max
      }

    const getMin=()=>{
        var min=arr[0];
        for(var i=1;i<arr.length;i++)
            if(arr[i]<min)
                min=arr[i]
        return min
    }

      console.log(arr);
    return (
        <div className="dailyChart">
            <Line
                data={{
                    labels: labels,
                    datasets: [{
                        label: 'Daily Expense',
                        data: arr,
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
                width={100}
                height={300}
                options={{ 
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max:getMax(),
                                min:getMin()
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
        </div>
    )
}

export default DailyChart
