import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyChart = (data) => {
    const [currentYear,setCurrentYear]=useState(0)
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
          "date": 19,
          "type": 1,
          "amount": 20
        },
        {
          "timestamp": 182132325200,
          "year": 2022,
          "month": 4,
          "date": 20,
          "type": 0,
          "amount": 20
        },
        {
          "timestamp": 182132325200,
          "year": 2021,
          "month": 8,
          "date": 10,
          "type": 1,
          "amount": 80
        },
        {
          "timestamp": 182132325200,
          "year": 2021,
          "month": 8,
          "date": 30,
          "type": 0,
          "amount": 20
        }
      ])
      let arr=new Array(13);
      for(let i=0;i<13;i++){
          arr[i]=0;
      }
      monthlyData.map(({month,amount,type,year})=>{
          let dailyExpense=0;
          let monthlyExpense=arr[month-1];
            if(amount != null){
                if(type ==1){
                    dailyExpense+=amount;
                }
                if(type ==0){
                    dailyExpense-=amount;
                }
            }
            monthlyExpense+=dailyExpense;
            if(year == currentYear){
                arr[month-1]=monthlyExpense;
            }
            
        
      });
      console.log(arr);
    return (
        <div className="monthlyChart">
            <Button onClick={()=>setCurrentYear(2021)}>2021</Button>
            <Button onClick={()=>setCurrentYear(2022)}>2022</Button>
            <Line
                data={{
                    labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Monthly Expense',
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
                width={10}
                height={500}
                options={{ 
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max:500
                            }
                        }]
                    },
                    title:{
                        display:true,
                        text:currentYear,
                        fontSize:25
                    },
                    maintainAspectRatio: false }}
            />
        </div>
    )
}

export default MonthlyChart
