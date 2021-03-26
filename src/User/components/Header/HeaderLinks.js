/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { NavLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import LoginPage from '../../views/LoginPage/LoginPage';
import Logout from "../../views/LoginPage/Logout";
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "User/components/CustomDropdown/CustomDropdown.js";
import Button from "User/components/CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  var isLoggedIn = localStorage.getItem("login");
  // console.log(isLoggedIn)
  return (
    <List className={classes.list}>
      {/* <ListItem className={classes.listItem}>
        <Button
          href="./"
          color="transparent"

          className={classes.navLink}
        >
          Home
        </Button>
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <NavLink to="./ratecard"
          color="transparent"
        
          className={classes.navLink}
        >
          Scrap Rate
        </NavLink>
      </ListItem>
      {
        isLoggedIn ? (
          <>
            <ListItem className={classes.listItem}>
              <NavLink
                to="./request"
                color="transparent"
                className={classes.navLink}
              >
                Pickup Request
        </NavLink>
            </ListItem>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              buttonText="Profile"
              buttonProps={{
                className: classes.navLink,
                color: "transparent"
              }}
              dropdownList={
                [
                  <NavLink to="/" className={classes.dropdownLink}>
                    My Order
            </NavLink>,
                  <NavLink to="/change" className={classes.dropdownLink}>
                    Change Password
            </NavLink>,
                  <NavLink to="/logout" className={classes.dropdownLink}>
                    Log out
            </NavLink>
                ]}
            />
          </ListItem>
        </>
        ) :
      <>
      <ListItem className={classes.listItem}>
        <NavLink
          to="./signup"
          color="transparent"
          className={classes.navLink}
        >
              SignUp
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink
          to="/login-page"
          color="transparent"
        
          className={classes.navLink}
        >
              Login
        </NavLink>
      </ListItem>
        </>
      }
    
        
    
     
      {/* <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        {/* <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-twitter"} />
          </Button>
        </Tooltip>
      </ListItem>  */}
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem> */}
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem> */}
    </List>
  );
}
