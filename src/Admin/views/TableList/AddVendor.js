import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// // core components
import People from "@material-ui/icons/People";
import CardHeader from "Admin/components/Card/CardHeader.js";
import CardBody from "Admin/components/Card/CardBody.js";
import CardFooter from "Admin/components/Card/CardFooter.js";
import CustomInput from "Admin/components/CustomInput/CustomInput.js";
import styles from "../../../User/assets/jss/material-kit-react/views/loginPage";
import axios from "axios";
//import image from "../../assets/img/kbg.png";
import { HomeOutlined, Phone } from "@material-ui/icons";
import VendorList from "Admin/views/TableList/VendorList";

const useStyles = makeStyles(styles);

export default function AddVendor() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    //const { ...rest } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [data, setData] = React.useState({
        username: '',
        password: '',
        city: '',
        phone: '',
        role: 'Vendor'
    });
    const [userErr, setUserErr] = useState(false)
    const [pwdErr, setPwdErr] = useState(false)
    const [cityErr, setCityErr] = useState(false)
    const [phoneErr, setPhoneErr] = useState(false)


    const Inputevent = (event) => {
        const { name, value } = event.target;
        if (data[name].length < 3) { setUserErr(true) } else { setUserErr(false) }
        if (data[name].length < 3) { setPwdErr(true) } else { setPwdErr(false)}
        if (data[name].length < 3) { setCityErr(true) } else { setCityErr(false)}
        if (data[name].length === 9) { setPhoneErr(false) } else { setPhoneErr(true) }
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        });
        console.log("phone length = ", data.phone.length)
    }
    const formSubmit = (event) => {
        event.preventDefault();
        if (!phoneErr && !cityErr && !pwdErr && !userErr) {
            axios.post('http://127.0.0.1:5000/auth/registration', data)
                .then(response => {
                    console.log("Response = ", response.data);
                    alert(" Vendor added Successfully "+ data.username)
                })
                .catch(error => {
                    console.log("Error ", error.response);
                });
        }
    
    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Vendor
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
                <DialogContent>
                    <form className={classes.form} onSubmit={formSubmit}>
                        <CardHeader color="success" className={classes.cardHeader}>
                            <h4>Vendor SignUp</h4>
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
                            {pwdErr ? <span style={{ "color": "red" }}>Password require Valid data</span> : ""}
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
                            {phoneErr ? <span style={{ "color": "red" }}>Field require Valid data</span> : ""}
                            <CustomInput
                                required
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
                            {cityErr ? <span style={{ "color": "red" }}>Field require Valid data</span> : ""}
                            <br /><br />
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            <Button type="submit" simple color="success" size="lg">
                               Add Vendor
                            </Button>
                        </CardFooter>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {/* <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button> */}
                </DialogActions>
            </Dialog>
           <VendorList />
        </div>
    );
}
