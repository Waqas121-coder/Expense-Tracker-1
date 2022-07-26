import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from "react-to-print";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom'

function MonthData() {

    // condition

    const [condition, setCondition] = useState(false)


    const [schemaData, setSchemaData] = useState(null)




    console.log(schemaData);


    const location = useLocation();
    console.log(location.state.date);
    const componenetRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componenetRef.current,
        documentTitle: 'One Month Data',
    });


    const getTotal = () => {
        var sum = 0;
        location.state.data.map((d) => {
            if (d.type === 0) sum -= d.amount;
            else sum += d.amount;
        });
        return sum;
    };

    // month data
    // const monthNames = ["January", "February", "March", "April", "May", "June",
    //     "July", "August", "September", "October", "November", "December"
    // ];

    const isLeapYear = year => {
        if (year % 400 === 0) return 1
        if (year % 100 === 0) return 0
        if (year % 4 === 0) return 1
        return 0
    }

    var nDays = [
        [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    ]


    let month = parseInt(location.state.date.getMonth() + 1)

    useEffect(() => {

        var data = []
        for (var i = 0; i <= nDays[isLeapYear()][month - 1]; i++)
            data.push(0)

        location.state.data.map(d => {
            if (d.type === 0)
                data[d.date] -= d.amount
            else
                data[d.date] += d.amount
        })

        let userdata = []
        data.map((val, ind) => {
            userdata.push({ val })
        })
        console.log(userdata);

        // console.log(data);

        setSchemaData(userdata)
        setCondition(true)
    }, [])




    return (
        <>
            <div ref={componenetRef} style={{ width: '100%', height: window.innerheight }}>



                <table style={{ margin: "auto", marginTop: "40px" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "10vw", textAlign: "center" }} scope="col">#</th>
                            <th style={{ width: "15vw", textAlign: "center" }} scope="col">DATE</th>
                            <th style={{ width: "15vw", textAlign: "center" }} scope="col">CASH IN</th>
                            <th style={{ width: "15vw", textAlign: "center" }} scope="col">CASH OUT</th>
                            <th style={{ width: "20vw", textAlign: "center" }} scope="col">ONE DAY AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>

                        { condition && schemaData.map((data, ind) => (
                            // console.log(data)
                            < tr key = { ind } >
                                <td style={{ width: "10vw", textAlign: 'center' }}>{ind+1}</td>
                                <td style={{ width: "10vw", textAlign: 'center' }}>{(new Date(data.timestamp).toLocaleDateString())}</td>
                                <td style={{ width: "10vw", textAlign: 'center' }}></td>
                                <td style={{ width: "10vw", textAlign: 'center' }}></td>
                                <td style={{ width: "10vw", textAlign: 'center' }}>{data.val}</td>               
                            </tr>
                         ))}


                </tbody>
            </table>
            <center> <h2>ONE MONTH TOTAL AMOUNT : {getTotal()}</h2></center>


            <Button
                style={{
                    bottom: 20,
                    right: 20,
                    position: 'fixed'
                }}
                variant={"outlined"}
                onClick={handlePrint}
                endIcon={<ExitToAppIcon />}
                color={"secondary"}
            >
                PrintOut
            </Button>
        </div>
        </>
    )
}

export default MonthData