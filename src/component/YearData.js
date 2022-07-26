import React, { useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom'

function YearData() {


    const location = useLocation();
    // console.log(location.state.data);
    const componenetRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componenetRef.current,
        documentTitle: 'One Year Data',
    });

    // const getTotal = () => {
    //     var sum = 0;
    //     location.state.data.map((d) => {
    //       if (d.type === 0) sum -= d.amount;
    //       else sum += d.amount;
    //     });
    //     return sum;
    //   };

    return (
        <>
            <div ref={componenetRef} style={{ width: '100%', height: window.innerheight }}>



                <table style={{ margin: "auto", marginTop: "40px" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "10vw", textAlign: "center" }} scope="col">#</th>
                            <th style={{ width: "10vw", textAlign: "center" }} scope="col">MONTH</th>
                            <th style={{ width: "10vw", textAlign: "center" }} scope="col">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {location.state.data.map((data, ind) => ( */}
                            <tr >
                                <td style={{ width: "10vw", textAlign: 'left' }}>6</td>
                                <td style={{ width: "10vw", textAlign: 'left' }}>6</td>
                                <td style={{ width: "25vw", textAlign: 'left' }}>7</td>
                               
                            </tr>
                        {/* ))} */}


                    </tbody>
                </table>
                {/* <center> <h2>Total Amount : {getTotal()} </h2></center> */}


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

export default YearData