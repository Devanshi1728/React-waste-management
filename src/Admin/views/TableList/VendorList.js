import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button/Button"
// core components.
import MUIDataTable from "mui-datatables";
import GridItem from "Admin/components/Grid/GridItem.js";
import GridContainer from "Admin/components/Grid/GridContainer.js";
import Card from "Admin/components/Card/Card.js";
import CardHeader from "Admin/components/Card/CardHeader.js";
import CardBody from "Admin/components/Card/CardBody.js";
import axios from "axios";
import EditVendor from "./EditVendor";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

const useStyles = makeStyles(styles);

export default function VendorList(props) {
    const [data, setData] = useState([]);  

    const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "standard"
    };
    
    const classes = useStyles();
   
    const [open, setOpen] = useState(false);
    const [vendorRecord, setVendorRecord] = useState(null);
    const { gc } = props
    const handleClickOpen = (row) => {
        setVendorRecord(row)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        console.log('Test for this method call')
        getData()
    }, [gc]);
    
    const [vendors, setVendors] = useState(null);
    useEffect(() => {
        getData()        
    }, [])

    useEffect(() => {
        setData(renderBody())
    }, [vendors, vendors?.Vendors]);

    const getData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/vendorlist")
        setVendors(response.data)
    }
    const renderHeader = () => {
        let headerElement = ['username', 'Role', 'city', 'phone', 'Delete', 'Modify']
        return headerElement.map((key, index) => {
            return key.toUpperCase()
        })
    }
    const t = JSON.parse(localStorage.getItem("token"));

    const removeData = (id) => {
        console.log('delete id', id)
        axios.delete(`http://127.0.0.1:5000/delete`,
            {
                headers: { 'Authorization': `Bearer ${t.token}` },
                data: { username: id }
            }).then(res => {
                console.log('vendor user', vendors  )
                //const del = vendors.Users?.filter(Users => id !== Users.UserId)
                //console.log("Response del= ", del)
                window.alert("Vendor Deleted Successfully")
                getData()
                //setVendors(del)
            }).catch(error => {
                //console.log("id", id)
                console.log("Error : ", error)
            })
    }

    const renderBody = (props) => {
        //console.log(vendors)
        return vendors && vendors.Vendors ? vendors.Vendors?.map((row) => {
            const { Username, Role, City, Phone } = row;
            return [ Username, Role, City, Phone,
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => removeData(Username)}
                >Delete</Button>,
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={() => handleClickOpen(row)}
                >Edit</Button>
            ]
        }) : []
    }

    return (
        <GridContainer>
            {open ?
                < EditVendor open={open} setOpen={setOpen} vendors={vendors.Vendors} setVendors={setVendors} vendorRecord={vendorRecord} /> : null}
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Customer Details</h4>
                        {/* <p className={classes.cardCategoryWhite}>
                            Here is a subtitle for this table
                        </p> */}
                    </CardHeader>
                    <CardBody>
                    <MUIDataTable
                        title={"ScrapMart Vendor list"}
                        data={data}
                        columns={renderHeader()}
                        options={options}  />
                    </CardBody>
                </Card>
            </GridItem>
            </GridContainer>
    );
}