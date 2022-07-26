import React, {useEffect, useState} from 'react'
import firebase from "firebase";
import {showToast} from "../App";
import LinearProgress from "@material-ui/core/LinearProgress";
import DailyChart from "./DailyChart";
import MonthlyChart from "./MonthlyChart";

import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, useNavigate } from "react-router-dom"

const Year=props=>{
    let navigate = useNavigate();


    const [date,setDate]=useState(props.date)
    const [loading,setLoading]=useState(true)
    const [dataPoints,setDataPoints]=useState([])

    const [version,setVersion]=useState(props.version)

    useEffect(()=>{
        setVersion(props.version)
    },[props.version])

    useEffect(()=>{
        setDate(props.date)
    },[props.date])

    useEffect(()=>{
        console.log(dataPoints)
    },[dataPoints])

    useEffect(()=>{
        firebase.firestore().collection('transaction')
            .where('uid','==',firebase.auth().currentUser.uid)
            .where('year','==',date.getFullYear())
            .orderBy('timestamp','desc')
            .get()
            .then(res=>{
                var data=[]
                res.docs.map(doc=>{
                    var currDoc=doc.data()
                    currDoc['id']=doc.id
                    data.push(currDoc)
                })
                setDataPoints(data)
                setLoading(false)
            }).catch(err=>{
            setLoading(false)
            console.log(err)
            showToast(err.message)
        })
    },[date,props.version])

    return(
        <div>
             <Button
                    style={{
                        bottom: 200,
                        right: 20,
                        position: 'absolute'
                    }}
                    variant={"outlined"}
                      onClick={() => {
                        navigate('/Year')
                      }}
                    endIcon={<ExitToAppIcon />}
                    color={"secondary"}
                >
                    Table
                </Button>
            {
                loading?(
                    <LinearProgress/>
                ):(
                    <div>
                        <MonthlyChart version={version} data={dataPoints} date={date} year={date.getFullYear()}/>
                    </div>
                )
            }
        </div>
    )
}

export default Year
