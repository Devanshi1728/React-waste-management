import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// core components
//import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
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
import axios from "../../../axios";

const useStyles = makeStyles((styles) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: '2px',
        },
    },
}));

export default function ChangePwd(props) {
    var history = useHistory();
    // useEffect(() => {
    //     if (localStorage.getItem("token")) {
    //         history.push('/')
    //     }
    // }, [])

    const [user, setUser] = useState('')
    useEffect(() => {
        getData()
    }, [])

    const t = JSON.parse(localStorage.getItem("token"));

    const getData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/user", {
            headers: {
                "Authorization": `Bearer ${t.token}`
            }
        })
        setUser(response.data)
        console.log(user)
    }
    const [cardAnimaton, setCardAnimation] = useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const [data, setData] = useState({
        old_password: '',
        password: ''
    });

    const [pwdErr, setPwdErr] = useState(false)
    console.log("pwd = ", user.User?.Password)

    const Inputevent = (event) => {
        const { name, value } = event.target;
        //if (data['username'].length < 2) { setUserErr(true) } else { setUserErr(false) }
        //if (data['password'].length < 2) { setPwdErr(true) } else { setPwdErr(false) }
       
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        });
    }

    const formSubmit = (event) => {
        event.preventDefault();
        console.log('test submit', data)
        console.log("Data Password = ", data.password)
        if (data.old_password == user.User?.Password && data.old_password.length === 0) {
            axios.put('http://127.0.0.1:5000/user/profile/' + user.User?.UserId,
                { password: data.password },
                {
                    headers:
                        { 'Authorization': `Bearer ${t.token}` }
                }).then(response => {
                    console.log(response)
                    console.log("REsponse pwd = ", response.data.password)
                    // <div className={classes.root}>
                    // <Alert severity="success" >This is a success alert check it out!</Alert >
                    //</div>
                    history.push("/")
                }).catch(error => {
                    alert("Invalid Credentials")
                    console.log(error);
                })
        }
        else {
            alert("Your Current Password is incorrect or missing")
        }
        //}
    }

    return (
        <div>
            <div>
                <Header
                    absolute
                    href="/"
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
                            <GridItem xs={12} sm={12} md={4}>

                                <Card className={classes[cardAnimaton]}>
                                    <form className={classes.form} onSubmit={formSubmit} action="#">
                                        <CardHeader color="primary" className={classes.cardHeader}>
                                            <h4>Change Password</h4>
                                        </CardHeader>
                                        {/* <p className={classes.divider}>Or Be Classical</p>  */}
                                        <CardBody>
                                            <CustomInput
                                                labelText="Old Password"
                                                id="password"
                                                name="old_password"
                                                value={data.old_password}
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
                                            <CustomInput
                                                labelText="New Password"
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
                                            {/* {pwdErr ? <span style={{ "color": "red" }}>Password require Valid data</span> : ""} */}
                                        </CardBody>
                                        <CardFooter className={classes.cardFooter}>
                                            <Button type="submit" simple color="success" size="lg">
                                                Change Password
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
        </div>
    );
}

