import React, { createContext, useState, useEffect } from "react";
import Components from "User/views/Components/Components.js";
import LandingPage from "User/views/LandingPage/LandingPage.js";
import ProfilePage from "User/views/ProfilePage/ProfilePage.js";
import LoginPage from "User/views/LoginPage/LoginPage.js";
import Logout from "User/views/LoginPage/Logout.js";
import RegistrationPage from "User/views/LoginPage/RegistrationPage";
import RatePage from "./User/components/Ratecard";
import Pickup from "./User/components/Pickup";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
// Admin core components
import axios from 'axios';
import routes from './routes';
import Admin from "Admin/layouts/Admin";
//import DashboardPage from "Admin/views/Dashboard/Dashboard.js";
import Protected from "Protected";
import "./Admin/assets/css/material-dashboard-react.css?v=1.9.0";
import ChangePwd from 'User/views/LoginPage/ChangePwd';
import OrderDetail from "Vendor/views/OrderDetail";

var hist = createBrowserHistory();
const ItemPrice = createContext();
const Role = createContext();

function App() {
    const [items, setItems] = useState(null)
    const [catArr, setCatArr] = useState([null]); // a joiye che mre catArr
    useEffect(() => {
        getRateData()
    }, [])

    const getRateData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/itemlist")
        const catArray = {}
        const items = response.data.Items;
        items.map(el => {
            catArray[el.Category] = [];
            //console.log("el =", el.Category)
        })

        items.map(el => {
            catArray[el.Category] = [...catArray[el.Category], el];
        })

        setItems(response.data)
        setCatArr(catArray)
        //console.log(catArr)
    }
    const role = JSON.parse(localStorage.getItem('role'))
    console.log("Role = ",role)
    const Role = createContext(); 
    return (
        <>
            <Router history={hist}>
                <Switch>
                    <Route path="/landing-page" component={LandingPage} />
                    <Route path="/profile-page" component={ProfilePage} />
                    <Route path="/" exact component={Components} />
                    <Route path="/logout">
                        <Protected Cmp={Logout} />
                    </Route>
                    <Route path="/login-page" component={LoginPage} />
                    <Route path="/signup" component={RegistrationPage} />

                    <Route path="/change">
                        <Protected Cmp={ChangePwd} />
                    </Route>
                    <Route path="/admin" component={Admin} />
                    <Route path="/vendor" component={Admin} />
                    <Redirect from="/admin" to="/admin/dashboard" />
                    <Redirect from="/vendor" to="admin/dashboard_vendor" />
                    <ItemPrice.Provider value={catArr}>
                        <Route path="/ratecard" component={RatePage} />
                        <Route path="/request">
                            <Protected Cmp={Pickup} />
                        </Route>
                        <Route path='/admin/order-details' component={OrderDetail} />
                    </ItemPrice.Provider>
                    <Role.Provider value={role}>
                        <Route component={routes}/>
                    </Role.Provider>
                </Switch>

            </Router>

        </>
    );
};

export default App;
export { ItemPrice }
export {Role}