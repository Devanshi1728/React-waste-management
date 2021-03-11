import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import GridContaineri from "User/components/Grid/GridContainer.js";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import SportsHandballOutlined from "@material-ui/icons/SportsHandball";
// core components
import GridContainer from "User/components/Grid/GridContainer.js";
import GridItem from "User/components/Grid/GridItem.js";
import InfoArea from "User/components/InfoArea/InfoArea.js";
import image1 from "User/assets/img/hand.png";
import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Let{"'"}s talk about Service</h2>
          <h5 className={classes.description}>
            In Scrap Mart, you can sell your scrap in just 3 easy steps.
            First Select Garbge item for selling from here.
            Second Choose date for scrap pickup and
            pickup boys will arrive at your given address
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContaineri />
        <GridContainer>
          {/* <GridItem xs={12} sm={12} md={4} className={classes.marginLeft}>
            <img
              src={image1}
              alt="..."
              className={classes.imgRoundedCircle + " " + classes.imgFluid}
            /> 
            
            <InfoArea
              title="Collection of 40+ scrap items"
              description="Scrap Mart collects 40+ scrap items that can be recycled like Paper, Plastic, Cartons, Metal, E-waste etc."    
              vertical
            />
          </GridItem> */}
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Electronic Scrap Weighing"
              description="For accurate weight measurement we use Electronnic weighing machine."
              icon={SportsHandballOutlined}
              iconColor="success"
              vertical
            />
          </GridItem>
          {/* <GridItem xs={12} sm={12} md={4}
           className={classes.marginLeft}>
              <img
                src={image1}
                alt="..."
                className={classes.imgRoundedCircle + " " + classes.imgFluid}
              />
            <InfoArea
              title="High Scrap Prices"
              description="We make sure to offer attractive prices for Scrap items by accurately weighing the scrap using Electronic weighing machine. "
              icon={SportsHandballOutlined}
              iconColor="danger"
              vertical
            />
          </GridItem> */}
        </GridContainer>
      </div>
    </div>
  );
}
