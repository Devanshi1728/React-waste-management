import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Card from '@material-ui/core/Card';
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import Button from '@material-ui/core/Button';
//import Button from "@material-ui/core/Button/Button";
import Card from "Admin/components/Card/Card.js";
import CardHeader from "Admin/components/Card/CardHeader.js";
import CardIcon from "Admin/components/Card/CardIcon.js";
//import CardBody from "Admin/components/Card/CardBody.js";
import CardFooter from "Admin/components/Card/CardFooter.js";
import OrderDetail from "./OrderDetail";
import axios from 'axios';
import styles from "Admin/assets/jss/material-dashboard-react/views/dashboardStyle.js"
const useStyles = makeStyles(styles);

    
export default function Vendor_order(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [order_id, setOrderId] = useState(null);

    const handleClickOpen = (order_id) => {
        setOrderId(order_id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [order, setOrder] = useState(null)
    useEffect(() => {
        getData()
    }, [])

    const t = JSON.parse(localStorage.getItem("token"));
    
    const getData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/order",
            {
                headers: {
                    "Authorization": `Bearer ${t.token}`
                }
            })
        //console.log(response.data)
        //console.log(response.data.Orders)
        //console.log(response.data.totalOrders)
        setOrder(response.data)
    }

    const renderBody = () => {
        //console.log(order && order.Orders)
        return order && order.Orders ? order.Orders?.map(({ Address, auth_id, Username , Phone, Pickup_Date,
            Pickup_slot, order_id}) => {
            return [
                <b>order id : </b>, order_id, <br />,
                <b>Customer Name : </b>, Username, <br />,
                <b>Address : </b>, Address, <br/>,
                <b>Phone : </b>, Phone, <br />,
                <b>Pickup Date : </b>,Pickup_Date, <br />,
                <b>Pickup Slot : </b>, Pickup_slot, <br/ >,
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    onClick={() => handleClickOpen(order_id)}
                >Pickup Request</Button>, <br />,<hr></hr>,]
        }) : <h3>You have not any Order Request</h3>
    }

    return (
       <>
            <Card>
                 {open ?
                    < OrderDetail order_id={order_id} open={open} setOpen={setOpen} /> : null} 
                <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                        <Store />
                    </CardIcon>
                    <p className={classes.cardCategory}>Total Orders : {order?.totalOrders}</p>
                    <br /><br /><br />
                    <h5 className={classes.cardTitle}>{renderBody()}</h5>
                </CardHeader>
                <CardFooter stats>
                    <div className={classes.stats}>
                        <DateRange />
                    </div>
                </CardFooter>
            </Card>
            </>
    );
}
