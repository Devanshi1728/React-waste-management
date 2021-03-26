import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React,{useState} from "react";
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

const EditScrap=(props) => {
    const {name,id,price,items} =props
    const [data, setData] = useState({
        item_name: name,
        item_id: id,
        item_price: price
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
        console.log("Scrap Data = ", data)

        axios.put('http://127.0.0.1:5000/item/' + data.item_id, { item_price: data.item_price}, {
            headers:
                { 'Authorization': `Bearer ${t.token}` }
        }).then(response => {       
            alert(" Item Updated Successfully " + data.item_name)
            const index = items.findIndex((item) => item.Item_id === data.item_id)
            items[index].Item_price = data.item_price;
            props.setItems({Items:items})
            props.setOpen(false);
        }).catch(error => {
            console.log("Error ", error.response);
            props.setOpen(false);
        });
    }
    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit Scrap
            </Button> */}
            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                
                <DialogContent>
                    <form className={classes.form} onSubmit={formSubmit}>
                        <CardHeader color="success" className={classes.cardHeader}>
                            <h4>Modify Scrap</h4>
                        </CardHeader>
                        <CardBody>
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
                                    type: "text",
                                    disabled: true,
                                }}
                            />
                            <CustomInput
                                required
                                labelText="Item Price"
                                name="item_price"
                                value={data.item_price}
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
                                Update Scrap
                            </Button>
                        </CardFooter>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{props.setOpen(false)}} color="primary">
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
export default EditScrap