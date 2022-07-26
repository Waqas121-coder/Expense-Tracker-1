import React, { useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom'

function DayData() {


    const location = useLocation();
    // console.log(location.state.data);
    const componenetRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componenetRef.current,
        documentTitle: 'One Day Data',
    });

    const getTotal = () => {
        var sum = 0;
        location.state.data.map((d) => {
          if (d.type === 0) sum -= d.amount;
          else sum += d.amount;
        });
        return sum;
      };

    return (
        <>
            <div ref={componenetRef} style={{ width: '100%', height: window.innerheight }}>



                <table style={{ margin: "auto", marginTop: "40px" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "5vw", textAlign: "center" }} scope="col">#</th>
                            <th style={{ width: "10vw", textAlign: "center" }} scope="col">CASH</th>
                            <th style={{ width: "10vw", textAlign: "center" }} scope="col">ONE ITEM AMOUNT</th>
                            <th style={{ width: "10vw", textAlign: "center" }} scope="col">DATE & TIME</th>
                            <th style={{ width: "10vw", textAlign: "center" }} scope="col">CAUSE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {location.state.data.map((data, ind) => (
                            <tr key={ind}>
                                <th style={{ width: "5vw", textAlign: 'center' }} scope="row">{ind + 1}</th>
                                <th style={{ width: "10vw", textAlign: 'center' }} scope="row">{
                                    data.type === 0 ? "Out" : "In"
                                }</th>
                                <td style={{ width: "20vw", textAlign: 'left' }}>{data.amount}</td>
                                <td style={{ width: "25vw", textAlign: 'left' }}>{(new Date(data.timestamp).toLocaleString())}</td>
                                <td style={{ width: "10vw", textAlign: 'left' }}>{data.cause}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <center> <h2>ONE DAY TOTAL AMOUNT : {getTotal()} </h2></center>
                <Button
                    style={{
                        bottom: 20,
                        right: 20,
                        position: 'absolute'
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

export default DayData