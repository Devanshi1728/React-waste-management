import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
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
import { HomeOutlined, Phone } from "@material-ui/icons";
import axios from "../../../axios";



const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  var history = useHistory();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const [data, setData] = React.useState({
    username: '',
    password: '',
    login: false
  });
  const [userErr, setUserErr] = useState(false)
  const [pwdErr, setPwdErr] = useState(false)

  
  const Inputevent = (event) => {
    const { name, value } = event.target;
    if (data[name].length < 2) { setUserErr(true) } else { setUserErr(false) }
    if (data[name].length < 2) { setPwdErr(true) } else { setPwdErr(false) }
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      }
    });
  }




  const formSubmit = (event) => {
    console.log('test submit', data)
    event.preventDefault();
    // if (!pwdErr && !userErr) {
    axios.post('http://127.0.0.1:5000/auth/login', data)
        .then(response => {
          //console.log(response);
          setData((preVal) => {
            return {
              ...preVal,
              login: true
            }
          });
          localStorage.setItem('login', JSON.stringify({
            login: true,
            role: response.data.role,
          }));
          localStorage.setItem('token', JSON.stringify({
            token: response.data.access_token,
          }));
          if (response.data.role === 'Admin') {
            history.push("/admin")
          }
            
          // else if (response.data.role === 'Vendor')
          //   history.push("/vendor/dashbord")
          else
            history.push("/")
        })
        .catch(error => {
          alert("Invalid Credentials")
          console.log(error.response);
        })
    //}
  }
  
  return (
    <div>
      <div>
      {/* <a href="/" > */}
      <Header
        absolute
        brand="Scrap Mart"
        rightLinks={<HeaderLinks />}
        {...rest}
        /> 
      {/* </a> */}
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
                  <form className={classes.form} onSubmit={(e)=> formSubmit(e)} action="#">
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  {/* <p className={classes.divider}>Or Be Classical</p>  */}
                  <CardBody>
                    <CustomInput
                      labelText="Username..."
                      id="username"
                      name="username"
                      onChange={Inputevent}
                      formControlProps={{
                        fullWidth: true
                      }}
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
                    {pwdErr ? <span style={{ "color": "red" }}>Password require Valid data</span> : ""}
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="success" size="lg">
                      Login
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

// 6 m0nths 3400 40mbps
// router frame

// 3moths 1990
