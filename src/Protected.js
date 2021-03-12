import React, { useEffect } from "react";
import { useHistory } from "react-router";

export default function Protected(props){
    const history = useHistory();
    let Cmp = props.Cmp;
    useEffect(() => {
        if (!localStorage.getItem('token')) {
           history.push('/signup')
       } 
    }, [])
    return (
        <div>
            <Cmp />
        </div>
    )
}