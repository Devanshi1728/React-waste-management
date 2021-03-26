import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
import 'date-fns';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Header from "User/components/Header/Header.js";
import HeaderLinks from "User/components/Header/HeaderLinks.js";
import Footer from "User/components/Footer/Footer.js";
import GridContainer from "User/components/Grid/GridContainer.js";
import GridItem from "User/components/Grid/GridItem.js";
import Button from "User/components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
import Card from "User/components/Card/Card";
import CardBody from "User/components/Card/CardBody.js";
import CardHeader from "User/components/Card/CardHeader.js";
import CardFooter from "User/components/Card/CardFooter.js";
import CustomInput from "User/components/CustomInput/CustomInput.js";
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import {ItemPrice} from '../../App';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

//import styles from "../assets/jss/material-kit-react/views/loginPage.js";

import image from "../assets/img/kbg.png";
import { Phone } from "@material-ui/icons";

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
}));

// ================   multiple select ============ //
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

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
   
function getStyles(name, itemName, theme) {
    return {
        fontWeight:
            itemName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function Pickup(props) {
    const history = useHistory()
    
    const [Names, setName] = useState([]);
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/itemlist")
        const items = response.data.Items;
        console.log('test', items)
        let newArr = []
        items.forEach((res) => {
            if (newArr.length > 0) {
                newArr = [...newArr, { id: res.Item_id, name: res.Item_name }]
            } else {
                newArr = [{ id: res.Item_id, name: res.Item_name }]
            }
        })
        setName(names => [
            ...names,
            ...newArr
        ])
    }
    
    const names = Names //store in names 
    //console.log(names)
    //console.log(names)

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    const userdata = JSON.parse(localStorage.getItem('user_data'))
    //console.log(userdata.username)
    const [data, setData] = React.useState({
        username: userdata?.username,
        phone: userdata?.phone,
        address: '',
        items: '',
        pickup_date: '',
        pickup_slot: ''
    });
   
    const [addressErr, setAddressErr] = useState(false)
    const [slotErr, setSlotErr] = useState(false)
    const [itemErr, setItemErr] = useState(false)

    const Inputevent = (event) => {
        const { name, value } = event.target;
        if (data['address'].length < 5) { setAddressErr(true) } else { setAddressErr(false) }
        setData((preVal) => {
            return {
                ...preVal,
                [name]: value,
            }
        });
    }
    const t = JSON.parse(localStorage.getItem("token"));

    const formSubmit = (event) => {
        event.preventDefault();
        if (!addressErr) {
            axios.post('http://127.0.0.1:5000/order', data, {
                headers:
                    { 'Authorization': `Bearer ${t.token}` }
            }).then(response => {
                console.log("Response = ", response.data);
                alert("Successfully Order")
                history.push('/')
            }).catch(error => {
                alert("Invalid Order Data")
                console.log("Error ", error);
            });
        }
    }
  
    const theme = useTheme();
    const [itemName, setItemName] = useState([]); 

    const handleChange = (event) => {
        console.log('event', event)
        let finalArr = []
            names.forEach((name) => {
            return event.target.value.forEach((data) => {
                if (name.name === data) {
                    if (finalArr.length > 0) finalArr = [...finalArr, name.id]
                   else finalArr=[name.id]
                }
            })
        })
        setItemName(event.target.value)
        console.log("ItemNAme = ", JSON.stringify(finalArr))
        console.log(typeof (JSON.stringify(finalArr)))
        setData((preVal) => {
            return {
                ...preVal,
                items: JSON.stringify(finalArr) //item setData ma set kri
            }
        })
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData((preVal) => {
            return {
                ...preVal,
                pickup_date: date
            }
        })
    };

    const [selectedDate, setSelectedDate] = useState(
        new Date(tomorrow)
    );

    return (
        <div>
            <Header
                absolute
                brand="Scrap Mart"
                rightLinks={<HeaderLinks />}
                {...rest}
            />
            <div
                className={classes.pageHeader}
                style={{
                    backgroundImage: "url(" + image + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center"
                }}
            >
                <div className={classes.container}>
                    <br /><br /><br /><br /><br />
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={4}>
                            <Card className={classes[cardAnimaton]}>
                                <form className={classes.form} onSubmit={formSubmit}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Send Your PickUp Request</h4>
                                    </CardHeader>
                                    {/* <p className={classes.divider}>Or Be Classical</p> */}
                                    <CardBody>
                                        <CustomInput
                                            labelText="Username..."
                                            id="username"
                                            name="usename"
                                            value={data.username}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="Mobile Number..."
                                            id="phone"
                                            name="phone"
                                            value={data.phone}
                                            //onChange={Inputevent}
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
                                        <CustomInput
                                            required
                                            labelText="Address..."
                                            id="address"
                                            name="address"
                                            value={data.address}
                                            onChange={Inputevent}
                                            rows={4}
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "text",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <People className={classes.inputIconsColor} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        {addressErr ? <span style={{ "color": "red" }}>Add Valid Address data </span> : <span></span>}


                                         <FormControl fullWidth>
                                            <InputLabel id="demo-mutiple-chip-label">Select Scrap Item</InputLabel>
                                            <Select
                                                required
                                                labelId="demo-mutiple-chip-label"
                                                id="demo-mutiple-chip"
                                                multiple
                                                name="items"
                                                value={itemName}
                                                onChange={handleChange}
                                                input={<Input id="select-multiple-chip" />}
                                                renderValue={(selected) => (
                                                    <div className={classes.chips}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} className={classes.chip} />
                                                        ))}
                                                    </div>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {Names.map((name, index) => (
                                                    <MenuItem key={index} value={name.name} style={getStyles(name, itemName, theme)}>
                                                        {name.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            
                                        </FormControl><br /><br /> 
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <Grid container justify="space-around">
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    fullWidth
                                                    name="pickup_date"
                                                    minDate={tomorrow}
                                                    variant="inline"
                                                    format="MM/dd/yyyy"
                                                    margin="normal"
                                                    id="date-picker-inline"
                                                    label="Select pickup Date"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        "aria-label": "change date"
                                                    }}
                                                />
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                        <br />
                                        <FormControl fullWidth>
                                            <InputLabel>Pickup Slot</InputLabel>
                                            <NativeSelect
                                                required
                                                id="pickup"
                                                name="pickup_slot"
                                                onChange={Inputevent}
                                                inputProps={{
                                                    type: "pickup"
                                                }}>
                                                <option>---Select Slot---</option>
                                                <option value="10AM to 1PM">10AM to 1PM</option>
                                                <option value="4PM to 7PM">4PM to 7PM</option>
                                            </NativeSelect>
                                        </FormControl>
                                        <br />
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button type="submit" simple color="success" size="lg">
                                            Send Request
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </div>
                <Footer whiteFont />
            </div>
        </div>
    );
}