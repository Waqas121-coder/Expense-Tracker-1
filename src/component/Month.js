import React, {useEffect, useState} from 'react'
import firebase from "firebase";
import {showToast} from "../App";
import LinearProgress from "@material-ui/core/LinearProgress";

const Month=props=>{

    const [date,setDate]=useState(props.date)
    const [loading,setLoading]=useState(true)
    const [dataPoints,setDataPoints]=useState([])

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
            .where('month','==',date.getMonth()+1)
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
            {
                loading?(
                    <LinearProgress/>
                ):(
                    <div>
                    </div>
                )
            }
        </div>
    )
}

export default Month
