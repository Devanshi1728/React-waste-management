import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React, {useState} from "react";
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

export default function AddScrap() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    //const { ...rest } = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [items, setItems] = useState('') //  i declare this
    const [data, setData] = React.useState({
        category_id:'',
        item_name: '',
        item_price: '',
        measure:''
    });

    const Inputevent = (event) => {
        const { name, value } = event.target;
    
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
        //console.log("SCrap Data = ",data)
        axios.post('http://127.0.0.1:5000/item', data, {
            headers:
                { 'Authorization': `Bearer ${t.token}` }
            }).then(response => {
                alert(data.item_name + " Added Successfully ")
                console.log("REponse = ",response.data)
                setItems(
                    {
                        ...items,
                        Items: [
                            response.data['Item'],
                            ...items['Items']
                        ]
                    })
                console.log("REponse of items= ", items)
                setOpen(false);
            })
            .catch(error => {
                console.log("Error ", error);
                setOpen(false)
            });
    }
    //console.log(items)
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
                                    <MenuItem value={1}>Paper</MenuItem>
                                    <MenuItem value={2}>Plastic</MenuItem>
                                    <MenuItem value={3}>Metal</MenuItem>
                                    <MenuItem value={4}>E-Waste</MenuItem>
                                    <MenuItem value={5}>Other</MenuItem>
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
                            <CustomInput
                                required
                                labelText="Item Price"
                                //id="password"
                                name="item_price"
                                value={data.item_price}
                                onChange={Inputevent}
                                formControlProps={{
                                    fullWidth: false
                                }}
                                inputProps={{
                                    type: "text"
                                }}
                            />
                            <FormControl style={{ width: '25ch', marginTop: '27px' }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Select Measure</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    //id="demo-simple-select-autowidth"
                                    value={data.measure}
                                    name="measure"
                                    onChange={Inputevent}
                                    fullWidth  
                                >
                                    <MenuItem value="Kg">Kg</MenuItem>
                                    <MenuItem value="Piece">Piece</MenuItem>
                                </Select>
                            </FormControl>
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
            <ScrapList setItems={setItems} items={ items}/> 
        </div>
    );
}
