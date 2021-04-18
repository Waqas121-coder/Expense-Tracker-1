import React, {useEffect} from 'react'
import '../config/firebase_config'
import firebase from "firebase/app"
import "firebase/auth"
import {showToast} from "../App";
import Button from "@material-ui/core/Button";

const Dashboard =props=>{

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log('logged in')
            } else {
                console.log('not logged in')
            }
        });
    },[])

    const click=()=>{
        showToast("Clicked from dashboard")
    }

    return(
        <div>
            <Button
                variant={'outlined'}
                color={'primary'}
                onClick={click}
            >
                Show Toast
            </Button>
        </div>
    )
}

export default Dashboard
