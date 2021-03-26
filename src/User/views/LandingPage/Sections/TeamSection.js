import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "User/components/Grid/GridContainer.js";
import GridItem from "User/components/Grid/GridItem.js";
import Card from "User/components/Card/Card.js";
import CardBody from "User/components/Card/CardBody.js";

import styles from "../../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "../../../assets/img/hand.png";
import team2 from "../../../assets/img/electric.png";
import team3 from "../../../assets/img/price.png";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Our Service</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team1} alt="scrap" className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Collection of 40+ scrap items
                <br />
              
              </h4>
              <CardBody>
                <p className={classes.description}>
                  Scrap Mart collects 40+ scrap items that can be recycled like Paper, Plastic, Cartons, Metal, E-waste etc.
                </p>
              </CardBody>
              {/* <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team2} alt="scrap" className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Electronic Scrap Weighing
                <br />
               
              </h4>
              <CardBody>
                <p className={classes.description}>
                  For accurate weight measurement we use Electronnic weighing machine.
                </p>
              </CardBody>
              {/* <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-linkedin"} />
                </Button>
              </CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={team3} alt="scrap" className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                High Scrap Prices
                <br />
               
              </h4>
              <CardBody>
                <p className={classes.description}>
                  We make sure to offer attractive prices for Scrap items by accurately weighing the scrap using Electronic weighing machine.
                </p>
              </CardBody>
              {/* <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-instagram"} />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <i className={classes.socials + " fab fa-facebook"} />
                </Button>
              </CardFooter> */}
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
