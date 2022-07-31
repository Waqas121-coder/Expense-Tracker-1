import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function YearData() {
  const location = useLocation();
  // console.log(location.state.date);
  const componenetRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componenetRef.current,
    documentTitle: "One Year Data",
  });

  const [schemaData, setSchemaData] = useState(null);
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    var labels = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    location.state.data.map((d) => {
      if (d.type === 0) data[d.month] -= d.amount;
      else data[d.month] += d.amount;
      let userdataval = [];
      data.map((val, ind) => {
        userdataval.push({ val });
      });
      setSchemaData(userdataval);
      setCondition(true);
    });
  }, []);
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
      <div
        ref={componenetRef}
        style={{ width: "100%", height: window.innerheight }}
      >
        <table style={{ margin: "auto", marginTop: "40px" }}>
          <thead>
            <tr>
              <th style={{ width: "10vw", textAlign: "center" }} scope="col">
                #
              </th>
              <th style={{ width: "10vw", textAlign: "center" }} scope="col">
                MONTH
              </th>
              <th style={{ width: "15vw", textAlign: "center" }} scope="col">
                CASH IN
              </th>
              <th style={{ width: "15vw", textAlign: "center" }} scope="col">
                CASH OUT
              </th>
              <th style={{ width: "10vw", textAlign: "center" }} scope="col">
                ONE MONTH AMOUNT
              </th>
            </tr>
          </thead>
          <tbody>
            {condition && schemaData.map((data, ind) => (
              <tr>
                <td style={{ width: "10vw", textAlign: "center" }}>
                  {ind + 1}
                </td>
                <td style={{ width: "10vw", textAlign: "center" }}>
                  {data.date}
                </td>
                <td style={{ width: "10vw", textAlign: "center" }}></td>
                <td style={{ width: "10vw", textAlign: "center" }}></td>
                <td style={{ width: "10vw", textAlign: "center" }}>
                  {data.val}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <center> <h2>Total Amount : {getTotal()} </h2></center>

        <Button
          style={{
            bottom: 20,
            right: 20,
            position: "fixed",
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
  );
}

export default YearData;
