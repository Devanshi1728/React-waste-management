import React, { useEffect, useState } from "react";
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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Pickup from 'User/components/Pickup';

import styles from "../../assets/jss/material-kit-react/views/loginPage.js";

import image from "../../assets/img/kbg.png";
import { Phone } from "@material-ui/icons";
import axios from "../../../axios";
import { useHistory } from "react-router";

const useStyles = makeStyles(styles);

export default function RegistrationPage(props) {

    const [addcity,setCity] = useState(null)
    
    useEffect(() => {
        if (localStorage.getItem("token")) {
            history.push('/request')
        }
        getData()
    }, [])
    //getting city n set in setCity
    const getData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/vendorlist")
        //console.log("City = ", response.data.Vendors.map(e => e.City))
        const city = response.data.Vendors.map(e => e.City)
        setCity(city)
    }

    var history = useHistory();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState('');
    const { ...rest } = props;

    const handleKeyDown = event => {
        switch (event.key) {
            case ",":
            case " ": {
                event.preventDefault();
                event.stopPropagation();
                if (event.target.value.length > 0) {
                    setData((preVal) => {
                        return {
                            ...preVal,
                            [city]: event.target.value
                        }
                    });
                    //setData([...preVal, [city]:event.target.value]);
                }
                break;
            }
            default:
        }
    };

    const city = addcity ? addcity : []
 
    //console.log("city add = ",city)
    
    //console.log(addcity)

    //// ========================== logic   ============================== /////
    //main setData of form
    const [data, setData] = React.useState({
        username: '',
        password: '',
        city: '',
        phone: ''
    });
    const [userErr, setUserErr] = useState(false)
    const [pwdErr, setPwdErr] = useState(false)
    const [cityErr, setCityErr] = useState(false)
    //const [phoneErr, setPhoneErr] = useState(false)
    
        //onchange event
    const Inputevent = (event) => {
        const { name, value } = event.target;
        if (data['username'].length < 3) { setUserErr(true) } else { setUserErr(false) }
        if (data['password'].length < 3) { setPwdErr(true) } else { setPwdErr(false) }
        if (data['city'].length < 3) { setCityErr(true) } else { setCityErr(false) }
       
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        });
    }
    const formSubmit = (event) => {
        //console.log("called")
        event.preventDefault();
        //if (!phoneErr && !cityErr && !pwdErr && !userErr) {
        axios.post('http://127.0.0.1:5000/auth/registration', data)
                .then(response => {
                    //console.log("Response = ", response.data);
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
                                            required
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
                                            required
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
                                            required
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
                                      {/* {phoneErr ? <span style={{ "color": "red" }}>Field require Valid data</span> : <span></span>} */}
                                        {/* <div>{ JSON.stringify(city)}</div> */}
                                        <Autocomplete
                                            value={data.city}
                                            onChange={(event, newValue) => {
                                                setData({ ...data, city: newValue });
                                            }}
                                            inputValue={inputValue}
                                            onInputChange={(event, newInputValue) => {
                                                setInputValue(newInputValue);
                                            }}
                                            options={city}
                                            renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
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