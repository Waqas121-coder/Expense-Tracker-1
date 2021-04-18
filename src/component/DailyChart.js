import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const DailyChart = () => {
    const [currentMonth,setCurrentMonth]=useState(0)
    const [monthlyData,setMonthlyData]=useState([
        {
          "timestamp": 182132325200,
          "year": 2021,
          "month": 4,
          "date": 18,
          "type": 1,
          "amount": 10
        },
        {
          "timestamp": 182132325200,
          "year": 2021,
          "month": 4,
          "date": 18,
          "type": 1,
          "amount": 10
        },
        {
          "timestamp": 182132325200,
          "year": 2021,
          "month": 4,
          "date": 18,
          "type": 0,
          "amount": 10
        },
        {
          "timestamp": 182132325200,
          "year": 2021,
          "month": 4,
          "date": 20,
          "type": 1,
          "amount": 30
        }
      ])
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
            arr[date-1]=expense;
        }
  });
      console.log(arr);
    return (
        <div className="dailyChart">
            <Button onClick={()=>setCurrentMonth(4)}>April</Button>
            <Button onClick={()=>setCurrentMonth(5)}>May</Button>
            <Line
                data={{
                    labels: ['1', '1', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16','17', '18','19','20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
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
                                max:50
                            }
                        }]
                    },
                    title:{
                        display:true,
                        text:currentMonth,
                        fontSize:25
                    },
                    maintainAspectRatio: false }}
            />
        </div>
    )
}

export default DailyChart
