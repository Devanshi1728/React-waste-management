import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import Header from "User/components/Header/Header.js";
import HeaderLinks from "User/components/Header/HeaderLinks.js";
import Footer from "User/components/Footer/Footer.js";
import GridContainer from "User/components/Grid/GridContainer.js";
import GridItem from "User/components/Grid/GridItem.js";
import Button from "User/components/CustomButtons/Button.js";
import Card from "User/components/Card/Card.js";
import CardBody from "User/components/Card/CardBody.js";
import CardHeader from "User/components/Card/CardHeader.js";
import CardFooter from "User/components/Card/CardFooter.js";
import CustomInput from "User/components/CustomInput/CustomInput.js";

import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

import image from "../../assets/img/kbg.png";
import { HomeOutlined, Phone } from "@material-ui/icons";

//import { Router, Switch, Redirect, Route } from "react-router-dom";
//import axios from 'axios';
import axios from "../../../axios";
import { useHistory } from "react-router";

const useStyles = makeStyles(styles);

export default function RegistrationPage(props) {

    var history = useHistory();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();

    const { ...rest } = props;

    //// ========================== logic   ============================== /////

    const [data, setData] = React.useState({
        username: '',
        password: '',
        city: '',
        phone: ''
    });
    const [userErr, setUserErr] = useState(false)
    const [pwdErr, setPwdErr] = useState(false)
    const [cityErr, setCityErr] = useState(false)
    const [phoneErr, setPhoneErr] = useState(false)
    

    const Inputevent = (event) => {
        const { name, value } = event.target;
        if (data[name].length < 3) { setUserErr(true) } else { setUserErr(false) }
        if (data[name].length < 3) { setPwdErr(true) } else { setPwdErr(false) }
        if (data[name].length < 3) { setCityErr(true) } else { setCityErr(false) }
        if (data[name].length == 9) { setPhoneErr(false) } else { setPhoneErr(true) }
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        });
    }
    const formSubmit = (event) => {
        console.log("called")
        event.preventDefault();
        //if (!phoneErr && !cityErr && !pwdErr && !userErr) {
        axios.post('http://127.0.0.1:5000/auth/registration', data)
                .then(response => {
                    console.log("Response = ", response.data);
                    // alert("Successfully Signup")
                    history.push('/login-page')
                })
                .catch(error => {
                    alert("Invalid Data")
                    console.log("Error ", error.response);
                });
       // }
    }

    return (
        <div> 
            <Header
                absolute
                brand="Scrap Mart"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={5}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form} onSubmit={(e) => formSubmit(e)} action="#">
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>SignUp</h4>
                                    </CardHeader>
                                    {/* <p className={classes.divider}>Or Be Classical</p> */}
                                    <CardBody>
                                        <CustomInput
                                            labelText="Username..."
                                            // id="username"
                                            name="username"
                                            value={data.username}
                                            onChange={Inputevent}
                                            formControlProps={{
                                                fullWidth: true,  
                                               
                                            }}
                                            type="text"
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        {userErr ? <span style={{ "color": "red" }}>username require Valid data</span> : <span></span>}
                                        <CustomInput
                                            labelText="Password"
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            onChange={Inputevent}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "password",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputIconsColor}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                autoComplete: "off"
                                            }}
                                        />
                                        {pwdErr ? <span style={{ "color": "red" }}>Password require Valid data</span> : <span></span>}
                                        <CustomInput
                                            labelText="Mobile Number..."
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            onChange={Inputevent}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Phone className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        {phoneErr ? <span style={{ "color": "red" }}>Field require Valid data</span> : <span></span>}
                                        <CustomInput
                                            labelText="City"
                                            id="city"
                                            name="city"
                                            value={data.city}
                                            onChange={Inputevent}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "city",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <HomeOutlined className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        {cityErr ? <span style={{ "color": "red" }}>Field require Valid data</span> : <span></span>}
                                        <br /><br />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button type="submit" simple color="success" size="lg">
                                            SignUp
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}



//id proof address proof