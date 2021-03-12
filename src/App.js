import React from "react";
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
import Admin from "Admin/layouts/Admin";
//import DashboardPage from "Admin/views/Dashboard/Dashboard.js";
import Protected from "Protected";
import "./Admin/assets/css/material-dashboard-react.css?v=1.9.0";

var hist = createBrowserHistory();

function App() {
    return (
        <Router history={hist}>
            <Switch>
                <Route path="/landing-page" component={LandingPage} />
                <Route path="/profile-page" component={ProfilePage} />
                       
                <Route path="/logout">
                    <Protected Cmp={Logout} />
                </Route>
            
                <Route path="/login-page" component={LoginPage} />
                <Route path="/signup" component={RegistrationPage} />
             
                <Route path="/request">
                    <Protected Cmp={Pickup} />
                </Route>
                    
                <Route path="/ratecard" component={RatePage} />
                <Route path="/" exact component={Components} />
                <Route path="/admin" component={Admin} />
                <Redirect from="/admin" to="/admin/dashboard" />
              
   
            </Switch>
        </Router>
    );
};

export default App;