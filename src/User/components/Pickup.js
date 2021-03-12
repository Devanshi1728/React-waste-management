import React from "react";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import People from "@material-ui/icons/People";
// core components
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

//import styles from "../assets/jss/material-kit-react/views/loginPage.js";

import image from "../assets/img/kbg.png";
import { Phone } from "@material-ui/icons";

//const useStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
    // formControl: {
    //     margin: theme.spacing(1),
    //     minWidth: 120,
    //     maxWidth: 300,
    // },
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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function LoginPage(props) {

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;

    ////////////////////////////////
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        setPersonName(event.target.value);
    };

    // const handleChangeMultiple = (event) => {
    //     const { options } = event.target;
    //     const value = [];
    //     for (let i = 0, l = options.length; i < l; i += 1) {
    //         if (options[i].selected) {
    //             value.push(options[i].value);
    //         }
    //     }
    //     setPersonName(value);
    // };

    //////////////////////////////////////


    return (
        <div> <a href="/">
            <Header
                absolute
                brand="Scrape Mart"
                rightLinks={<HeaderLinks />}
                {...rest}
            /> </a>
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
                                <form className={classes.form}>
                                    <CardHeader color="primary" className={classes.cardHeader}>
                                        <h4>Send Your PickUp Request</h4>
                                    </CardHeader>
                                    {/* <p className={classes.divider}>Or Be Classical</p> */}
                                    <CardBody>
                                        <CustomInput
                                            labelText="Username..."
                                            id="username"
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
                                            labelText="Address..."
                                            id="address"
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
                                        <CustomInput
                                            labelText="Mobile Number..."
                                            id="phone"
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

                                        <FormControl fullWidth>
                                            <InputLabel id="demo-mutiple-chip-label">Select Scrap Item</InputLabel>
                                            <Select
                                                labelId="demo-mutiple-chip-label"
                                                id="demo-mutiple-chip"
                                                multiple
                                                value={personName}
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
                                                {names.map((name) => (
                                                    <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl><br /><br />

                                        <FormControl fullWidth>
                                            {/* <label>Approx weight of Garbage</label> */}
                                            <InputLabel>Approx weight of Garbage</InputLabel>
                                            <NativeSelect
                                                id="weight"
                                                inputProps={{
                                                    type: "weight"
                                                }}>
                                                
                                                <option value={10}>10kg to 20kg</option>
                                                <option value={20}>20kg to 50kg</option>
                                                <option value={50}>50kg to 100kg</option>
                                                <option value={100}>100kg Up</option>
                                            </NativeSelect>
                                        </FormControl>
                                        <br /><br />
                                        <FormControl  fullWidth>
                                            <InputLabel>Pickup Slot</InputLabel>
                                            <NativeSelect
                                                id="pickup"
                                                inputProps={{
                                                    type: "pickup"
                                                }}>
                                              
                                                <option value={10}>10AM to 1PM</option>
                                                <option value={4}>4PM to 7PM</option>
                                            </NativeSelect>
                                        </FormControl>
                                    </CardBody>
                                    <CardFooter className={classes.cardFooter}>
                                        <Button simple color="success" size="lg">
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
