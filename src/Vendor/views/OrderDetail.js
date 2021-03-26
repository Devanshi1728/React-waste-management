import Button from '@material-ui/core/Button';
import GridContainer from "User/components/Grid/GridContainer.js";
import GridItem from "User/components/Grid/GridItem.js";
import Card from "User/components/Card/Card.js";
//import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CardHeader from "Admin/components/Card/CardHeader.js";
//import Button from "User/components/CustomButtons/Button.js";
import CardBody from "Admin/components/Card/CardBody.js";
import CardFooter from "Admin/components/Card/CardFooter.js";
import CustomInput from "Admin/components/CustomInput/CustomInput.js";
import axios from "axios";
//import InputLabel from '@material-ui/core/InputLabel';
//import image from "../../assets/img/kbg.png";
//import { useHistory } from 'react-router';

//const useStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
    root: {
        width: '100%',
        maxWidth: 1000,
        backgroundColor: theme.palette.background.paper,
    },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function OrderDetail(props) {

    const { order_id } = props;

    const [weight, setWeight] = useState([]);

    //var history = useHistory();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();

    const t = JSON.parse(localStorage.getItem("token"));

    const Inputevent = (event) => {
        const { name, value } = event.target;
        const newArray = [...weight];
        newArray[name.split("_")[1]] = value;
        console.log(newArray)
        setWeight(newArray);
        console.log(weight) 
    }
   
    const [items, setItems] = useState('') //ordered item, weight
    const [item, setItem] = useState(['']) //item_name,price
    useEffect(() => {
        getOrderData()
        getItemData()
    }, [])
    const getOrderData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/order_details/" + props.order_id, {
            headers:
                { 'Authorization': `Bearer ${t.token}` }
        })
        setItems({
            ...response.data.Order_Details,
            Items: JSON.parse(response.data.Order_Details.Items),
        })
    }
    const getItemData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/itemlist")
        setItem(response.data)
    }
  
    const formSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(weight))
        axios.put('http://127.0.0.1:5000/order_details/' + props.order_id, {
            weight: JSON.stringify(weight),
        },
            {
            headers:
                { 'Authorization': `Bearer ${t.token}` }
            }).then(response => {
            console.log(response)  //string ma convert krine send krva pdse
            alert(" Order Updated Successfully ")
            // const index = items.findIndex((item) => item.Item_id === data.item_id)
            // items[index].Item_price = data.item_price;
            // props.setItems({ Items: items })
            // props.setOpen(false);
        })
            .catch(error => {
                console.log("Error ", error.response);
            });
    }
    // Items: "[2,3,4,5]"
    // OrderDetails_id: 1
    // Weight: 0
    console.log("i = ", item)

    return (
        <div>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                    <Card className={classes[cardAnimaton]} maxWidth={false}>
                        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" >
                            <DialogContent style={{ width: '480px' }}>
                                <form className={classes.form} onSubmit={formSubmit}> 
                                    <CardHeader color="success" className={classes.cardHeader}>
                                        <h4>Add Order Details</h4>
                                    </CardHeader>
                                    <CardBody>
                                        {
                                            <List component="nav" aria-label="contacts" >
                                                {
                                                    (() => {
                                                        const set = new Set(items?.Items?.map(i => i))
                                                        //console.log(set)
                                                        return item.Items?.filter(i => set.has(i.Item_id)).map((i, index) =>
                                                        (
                                                            <ListItem button key={i._id} style={{ padding: '0px' }}>                                                            
                                                            <ListItemText primary={i.Item_name} secondary={i.Item_price + i.measure} />
                                                            <ListItemText secondary={
                                                                <CustomInput
                                                                    style={{ right: "0px", margin:"0px"}}
                                                                required
                                                                labelText="Weight"
                                                                    name={"weight_"+ index+"_"}   
                                                                //value={data.weight}
                                                                onChange={Inputevent}
                                                                formControlProps={{
                                                                }}
                                                                type="text"
                                                                inputProps={{
                                                                    type: "text",
                                                            }}
                                                            value={weight[index]}
                                                                />} />
                                                            </ListItem>
                                                        )
                                                        )  
                                                    })()
                                                }
                                            </List>
                                        }
                                </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button type="submit" simple color="primary" size="lg">
                                            Update Scrap
                            </Button>
                                    </CardFooter>
                                </form>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { props.setOpen(false) }} color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Card>
                </GridItem>
            </GridContainer>
            {/* <ScrapList /> */}
        </div>
    );
}
