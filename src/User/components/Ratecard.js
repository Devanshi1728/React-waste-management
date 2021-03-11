import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "User/components/Header/Header.js";
import HeaderLinks from "User/components/Header/HeaderLinks.js";
import Footer from "User/components/Footer/Footer.js";
import GridContainer from "User/components/Grid/GridContainer.js";
import GridItem from "User/components/Grid/GridItem.js";
import Button from "User/components/CustomButtons/Button.js";
import Badge from "User/components/Badge/Badge";
import styles from "../assets/jss/material-kit-react/views/loginPage";

import image from "../assets/img/kbg.png";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    // const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    // setTimeout(function () {
    //     setCardAnimation("");
    // }, 700);
    const classes = useStyles();
    const { ...rest } = props;
    return (
        <div>
            <a href="/">
            <Header
                absolute
              
                brand="Scrap Mart"
                rightLinks={<HeaderLinks />}
                {...rest}
                /></a>
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <div className={classes.title}>
                                <h3 style={{ "color": "black", "fontWeight": "bolder" }}>Paper</h3>
                            </div>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                                NewsPaper<br /> 8/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                                Books<br /> 10/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                                Carton (House) <br /> 5/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                                Magazines <br />5/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}} >
                                White Papers <br />6.5/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}} >
                                Grey Board <br />2/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}} >
                                Record Paper <br />7/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}} >
                                Carton [Shop] <br />8/kg
                            </Button>
                        </GridItem>
                    </GridContainer>
                    <b><hr /></b>
                     <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <div className={classes.title}>
                                <h3 style={{ "color": "black", "fontWeight": "bolder" }}>Plastic</h3>
                            </div>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                                Soft Plastic<br /> 8/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                                Hard Plastic<br /> 5/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                                Mix plastic<br /> 8/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                               Milk Covers <br />30/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                                Polythene [Mix]<br />25/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                                Plastic Jar [15 ltr] <br />10/piece
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                               Fiber <br />8/kg
                            </Button>
                            <Button color="facebook" round style={{"cursor":"default"}}>
                               Plastic Jar [5 ltr] <br />15/piece
                            </Button>
                            <Button color="facebook" round style={{ "cursor": "default" }}>
                                Plastic Bori <br />8/kg
                            </Button>
                        </GridItem>
                    </GridContainer>
                   <b> <hr /></b>
                    {/* <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                        <div className={classes.title}>
                            <h6>Paper</h6>
                        </div>             
                            <Button color="info" round>
                                NewsPaper<br /> 8/kg
                            </Button>
                            <Button color="info" round>
                                Books<br /> 10/kg
                            </Button>
                            <Button color="info" round>
                                Carton (House) <br /> 5/kg
                            </Button>
                            <Button color="info" round>
                                Magazines <br />5/kg
                            </Button>
                            <Button color="success" round>
                                White Papers <br />6.5/kg
                            </Button>
                            <Button color="facebook" round >
                                Grey Board <br />2/kg
                            </Button>
                            <Button color="primary" round>
                                Record Paper <br />7/kg
                            </Button>
                            <Button color="github" round>
                                Carton [Shop] <br />8/kg
                            </Button>                          
                        </GridItem>
                    </GridContainer> */}
                    {/* <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                            <div className={classes.title}>
                                <h6>Paper</h6>
                            </div>
                            <Button color="success" round style={{"cursor":"default"}} >
                                NewsPaper<br /> 8/kg
                            </Button>
                            <Button color="success" round style={{"cursor":"default"}} >
                                Books<br /> 10/kg
                            </Button>
                            <Button color="success" round style={{"cursor":"default"}} >
                                Carton (House) <br /> 5/kg
                            </Button>
                            <Button color="success" round style={{"cursor":"default"}} >
                                Magazines <br />5/kg
                            </Button>
                            <Button color="success" round style={{"cursor":"default"}}>
                                White Papers <br />6.5/kg
                            </Button>
                            <Button color="success" round style={{"cursor":"default"}} >
                                Grey Board <br />2/kg
                            </Button>
                            <Button color="success" round style={{"cursor":"default"}}>
                                Record Paper <br />7/kg
                            </Button>
                            <Button color="success" round style={{ "cursor": "default" }}>
                                Carton [Shop] <br />8/kg
                            </Button>
                        </GridItem>
                    </GridContainer> */}
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}
