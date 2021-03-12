import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// @material-ui/icons
// core components
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CardHeader from "Admin/components/Card/CardHeader.js";
import CardBody from "Admin/components/Card/CardBody.js";
import CardFooter from "Admin/components/Card/CardFooter.js";
import CustomInput from "Admin/components/CustomInput/CustomInput.js";
import styles from "../../../User/assets/jss/material-kit-react/views/loginPage";
import axios from "axios";
//import image from "../../assets/img/kbg.png";
import { useHistory } from 'react-router';

const useStyles = makeStyles(styles);

export default function EditScrap(props) {
    var history = useHistory();
    const classes = useStyles();

    const t = JSON.parse(localStorage.getItem("token"));
    //const { ...rest } = props;
    const [open, setOpen] = React.useState(false);
   
    const handleClickOpen = () => {
        console.log('open')
        console.log(props.data)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [data, setData] = React.useState({
        category_id: '',
        item_name: '',
        item_price: ''
    });
    const [itemList, setItemList] = React.useState([])
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        console.log("get data called")
        const id = props.data;
        console.log("ID = ", props.data)
        await axios.get("http://127.0.0.1:5000/item",
            {
                headers: { "Authorization": "Bearer " + `${t.token}` },
                data : { item_name: "Hard Plastic" }
            }).then(response => {       
                    //setData(response.data)
                    console.log(response)                  
            }).catch(error => console.log(error.response))
    }
    // const [userErr, setUserErr] = useState(false)
    // const [pwdErr, setPwdErr] = useState(false)
    // const [cityErr, setCityErr] = useState(false)


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
   
    // const formSubmit = (event) => {
    //     event.preventDefault();
    //     console.log("Scrap Data = ", data)
    //     //if (!phoneErr && !cityErr && !pwdErr && !userErr) {
    //     axios.put('http://127.0.0.1:5000/item', data, {
    //         headers:
    //             { 'Authorization': "Bearer " + `${t.token}` }
    //     }).then(response => {
    //         const mydata = [...itemList, response.data]
    //         setItemList(mydata);
    //         console.log("Response = ", response.data);
    //         alert(" Item Updated Successfully " + data.item_name)
    //     })
    //         .catch(error => {
    //             console.log("Error ", error.response);
    //         });
    // }
    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit Scrap
            </Button> */}
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                
                <DialogContent>
                    <form className={classes.form}>
                        <CardHeader color="success" className={classes.cardHeader}>
                            <h4>Modify Scrap</h4>
                        </CardHeader>
                        <CardBody>
                            <CustomInput
                                required
                                labelText="Category Name"
                                name="category_id"
                                value={data.category_id}                
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
                                labelText="Item Name"
                                name="item_name"
                                value={data.item_name}
                               
                                formControlProps={{
                                    fullWidth: true,
                                }}
                                type="text"
                                inputProps={{
                                    type: "text"
                                }}
                            />
                            {/* {userErr ? <span style={{ "color": "red" }}>username require Valid data</span> : <span></span>} */}
                            <CustomInput
                                required
                                labelText="Item Price"
                                //id="password"
                                name="item_price"
                                value={data.item_price}
                                onChange={Inputevent}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text"
                                }}
                            />
                            {/* {pwdErr ? <span style={{ "color": "red" }}>Password require Valid data</span> : ""} */}
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                            <Button type="submit" simple color="primary" size="lg">
                                Add Scrap
                            </Button>
                        </CardFooter>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
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
