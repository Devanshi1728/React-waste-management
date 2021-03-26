import React, { useState, useEffect, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Header from "User/components/Header/Header.js";
import HeaderLinks from "User/components/Header/HeaderLinks.js";
import Footer from "User/components/Footer/Footer.js";
import GridContainer from "User/components/Grid/GridContainer.js";
import GridItem from "User/components/Grid/GridItem.js";
import Button from "User/components/CustomButtons/Button.js";
import styles from "../assets/jss/material-kit-react/views/loginPage";
import Pickup from "User/components/Pickup";
import {ItemPrice} from '../../App';
import image from "../assets/img/kbg.png";
import axios from "axios";


const useStyles = makeStyles(styles);

export default function RateCard(props) {
    const catArr = useContext(ItemPrice);
    const classes = useStyles();   
    console.log("CatARr = ", catArr) // ama km nthi avto data?

    //const [items, setItems] = useState(null)
    //const [catArr, setCatArr] = useState([null]);
    // useEffect(() => {
    //     getRateData()
    // }, [])

    // const getRateData = async () => {
    //     const response = await axios.get("http://127.0.0.1:5000/itemlist")
    //     const catArray = {}
    //     const items = response.data.Items;
    //     items.map(el => {
    //         catArray[el.Category] = [];
    //         console.log("el =", el.Category)
    //     })
        
    //     items.map(el => {
    //         catArray[el.Category] = [...catArray[el.Category], el];
    //     })
        
    //     setItems(response.data)
    //     setCatArr(catArray)
    //     //console.log("item list = ", response.data)
    // }

    const { ...rest } = props;
    return (
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
                }}>
                <div className={classes.container}>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>                           
                            {
                                
                                Object.keys(catArr).map((type) => (
                                    <>
                                    <div>
                                        <div className={classes.title} key={type._id}>                                                                                          
                                                <h3 style={{ "color": "black", "fontWeight": "bolder" }}>{type}</h3>
                                            </div>
                                            {
                                                catArr[type]?.map(i => (
                                                    <Button color="facebook" round style={{ "cursor": "default" }} key={i._id}>
                                                        {i.Item_name} <br /> {i.Item_price + '/' + i.measure}
                                                    </Button>
                                                ))
                                            }
                                        </div>
                                    </>
                                ))
                            }
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
                {/* <Pickup catArr={catArr} /> */}
        </div>
    );
}