import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";


function LogoutHandler() {
    const history = useHistory()
    useEffect(() => {
        localStorage.removeItem('token')
        localStorage.clear();
        console.log("logged out")
        history.push('/')
    }, []);
    return null;
}

const Logout = () => {
    return (
        <LogoutHandler />
    )
}
export default Logout;
