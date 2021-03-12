import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CardHeader from "Admin/components/Card/CardHeader.js";
import CardBody from "Admin/components/Card/CardBody.js";
import CardFooter from "Admin/components/Card/CardFooter.js";
import CustomInput from "Admin/components/CustomInput/CustomInput.js";
import styles from "../../../User/assets/jss/material-kit-react/views/loginPage";
import axios from "axios";
//import image from "../../assets/img/kbg.png";
//import { useHistory } from 'react-router';

const useStyles = makeStyles(styles);

const EditVendor = (props) => {
    const { name, id, city, phone, vendors } = props
    const [data, setData] = useState({
        username: name,
        id: id,
        city: city,
        phone:phone
    });
    //var history = useHistory();
    const classes = useStyles();

    const t = JSON.parse(localStorage.getItem("token"));
    console.log(data)
    const Inputevent = (event) => {
        const { name, value } = event.target;
        // if (data[name].length < 3) { setUserErr(true) } else { setUserErr(false) }
        // if (data[name].length < 3) { setPwdErr(true) } else { setPwdErr(false) }

        setData((preVal) => {
            return {
                ...preVal,
                [name]: value
            }
        });
    }

    const formSubmit = (event) => {
        event.preventDefault();
        console.log("Vendor Data = ", data)

        axios.put('http://127.0.0.1:5000/user/' + data.id,
            { username: data.username, city: data.city, phone: data.phone },
            {
            headers:
                { 'Authorization': `Bearer ${t.token}` }
            }).then(response => {
            console.log(response)
            alert(data.username + "  Updated Successfully ")
            const index = vendors.findIndex((vendor) => vendor.UserId === data.id)
            vendors[index].Username = data.username;
            vendors[index].City = data.city;
            vendors[index].Phone = data.phone
            props.setVendors({ Vendors: vendors })
            props.setOpen(false);
        })
            .catch(error => {
                console.log("Error ", error);
            });
    }
    return (
        <div>
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">

                <DialogContent>
                    <form className={classes.form} onSubmit={formSubmit}>
                        <CardHeader color="success" className={classes.cardHeader}>
                            <h4>Update Vendor Details</h4>
                        </CardHeader>
                        <CardBody>
                            <CustomInput
                                required
                                labelText="Vendor Name"
                                name="username"
                                value={data.username}
                                onChange={Inputevent}
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                type="text"
                                inputProps={{
                                    type: "text"
                                }}
                            />
                            <CustomInput
                                required
                                labelText="City"
                                name="city"
                                value={data.city}
                                onChange={Inputevent}
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                type="text"
                                inputProps={{
                                    type: "text"
                                }}
                            />
                            <CustomInput
                                required
                                labelText="Phone"
                                name="phone"
                                value={data.phone}
                                onChange={Inputevent}
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                type="text"
                                inputProps={{
                                    type: "text"
                                }}
                            />
                            {/* {userErr ? <span style={{ "color": "red" }}>username require Valid data</span> : <span></span>} */}
                            {/* {pwdErr ? <span style={{ "color": "red" }}>Password require Valid data</span> : ""} */}
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            <Button type="submit" simple color="primary" size="lg">
                                Update Vendor
                            </Button>
                        </CardFooter>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { props.setOpen(false) }} color="primary">
                        Cancel
                    </Button>
                    {/* <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button>  */}
                </DialogActions>
            </Dialog>
            {/* <ScrapList /> */}
        </div>
    );
}
export default EditVendor