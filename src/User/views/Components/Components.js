import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "User/components/Header/Header.js";
import Footer from "User/components/Footer/Footer.js";
import GridContainer from "User/components/Grid/GridContainer.js";
import GridItem from "User/components/Grid/GridItem.js";
import Button from "User/components/CustomButtons/Button.js";
import Parallax from "User/components/Parallax/Parallax.js";
// sections for this page
import TeamSection from "../LandingPage/Sections/TeamSection";

import HeaderLinks from "User/components/Header/HeaderLinks.js";
// import SectionBasics from "./Sections/SectionBasics.js";
// import SectionNavbars from "./Sections/SectionNavbars.js";
// import SectionTabs from "./Sections/SectionTabs.js";
// import SectionPills from "./Sections/SectionPills.js";
// import SectionNotifications from "./Sections/SectionNotifications.js";
// import SectionTypography from "./Sections/SectionTypography.js";
// import SectionJavascript from "./Sections/SectionJavascript.js";
// import SectionCarousel from "./Sections/SectionCarousel.js";
// import SectionCompletedExamples from "./Sections/SectionCompletedExamples.js";
// import SectionLogin from "./Sections/SectionLogin.js";
// import SectionExamples from "./Sections/SectionExamples.js";
// import SectionDownload from "./Sections/SectionDownload.js";

import styles from "../../assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="Scrap Mart"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax image={require("../../assets/img/kabadi9.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title} >Sell Your<span style={{ "color": "black" }}> Scrap</span></h1>
                <h3 className={classes.subtitle} style={{ "fontWeight":"bold" }}>
                  Earn more <span style={{ "color": "black" }}>by Selling more</span>
                </h3><br></br> <NavLink to={"/ratecard"}>
                <Button
                  color="white"
                  size="lg"                
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ "color": "green" }}
                >
                  {/* <i className="fas fa-watch" /> */}
                 Get Started
              </Button></NavLink>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <TeamSection />
        {/* <SectionBasics />
        <SectionNavbars />
        <SectionTabs />
        <SectionPills />
        <SectionNotifications />  */}
       {/* <SectionTypography />  */}
        {/* <SectionJavascript />
        <SectionCarousel />
        <SectionCompletedExamples />
        <SectionLogin />
        <GridItem md={12} className={classes.textCenter}>
          <Link to={"/login-page"} className={classes.link}>
            <Button color="primary" size="lg" simple>
              View Login Page
            </Button>
          </Link>
        </GridItem>
        <SectionExamples />
        <SectionDownload /> */}
      </div>
      <Footer />
    </div>
  );
}
