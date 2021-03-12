import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React from "react";
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
import ScrapList from "Admin/views/TableList/ScrapList";

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
        category_id:'',
        item_name: '',
        item_price: ''
    });
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
    const t = JSON.parse(localStorage.getItem("token"));
    const formSubmit = (event) => {
        event.preventDefault();
        console.log("SCrap Data = ",data)
        //if (!phoneErr && !cityErr && !pwdErr && !userErr) {
        axios.post('http://127.0.0.1:5000/item', data, {
            headers:
                { 'Authorization': `Bearer ${t.token}` }
            }).then(response => {
                console.log("Response = ", response.data);
                alert(" Item Added Successfully " + data.item_name)
            })
            .catch(error => {
                console.log("Error ", error.response);
            });
       // }

    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Scrap
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle> */}
                <DialogContent>
                    <form className={classes.form} onSubmit={formSubmit}>
                        <CardHeader color="success" className={classes.cardHeader}>
                            <h4>Add Scrap</h4>
                        </CardHeader>
                        <CardBody>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-autowidth-label">Select Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    //value={age}
                                    name="category_id"
                                    onChange={Inputevent}
                                    fullWidth
                                >
                                    <MenuItem value={1}>Plastic</MenuItem>
                                    <MenuItem value={2}>Paper</MenuItem>
                                    <MenuItem value="Metal">Metal</MenuItem>
                                    <MenuItem value="E-Waste">E-Waste</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                            <CustomInput
                                required
                                labelText="Item Name"
                                //id="username"
                                name="item_name"
                                value={data.item_name}
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
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {/* <Button onClick={handleClose} color="primary">
                        Subscribe
                    </Button> */}
                </DialogActions>
            </Dialog>
            <ScrapList />
        </div>
    );
}
