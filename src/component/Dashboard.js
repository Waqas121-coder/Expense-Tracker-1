import React, {useEffect,useState} from 'react'
import '../config/firebase_config'
import firebase from "firebase/app"
import "firebase/auth"
import {showToast} from "../App";
import Console from "./Console";
import Login from "./Login";
import LinearProgress from "@material-ui/core/LinearProgress";

const Dashboard =props=>{

    const [auth,setAuth]=useState(true)
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                setAuth(true)
            } else {
                setAuth(false)
            }
            setLoading(false)
        });
    },[])

    return(
        <div>
            {
                loading?(
                    <LinearProgress/>
                ):(
                    auth?(
                        <Console/>
                    ):(
                        <Login/>
                    )
                )
            }
        </div>
    )
}

export default Dashboard
