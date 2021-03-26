import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button/Button";
// core components
import MUIDataTable from "mui-datatables";
import GridItem from "Admin/components/Grid/GridItem.js";
import GridContainer from "Admin/components/Grid/GridContainer.js";
import Card from "Admin/components/Card/Card.js";
import CardHeader from "Admin/components/Card/CardHeader.js";
import CardBody from "Admin/components/Card/CardBody.js";
import EditScrap from "./EditScrap";
import axios from "axios";
//import { useHistory } from "react-router";

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

export default function ScrapList(props) {
    //var history = useHistory();
    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)
    const [itemId, setId] = useState(0)
    
    const t = JSON.parse(localStorage.getItem("token"));

    const classes = useStyles();
    const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "standard"
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = (name, price, id) => {
        setId(id)       
        setName(name)
        setPrice(price)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { items, setItems } = props; //run kru? english may i yens now run this? not working
    // show me parent component
    // const [items, setItems] = useState(null) // Why declaring here when using props..thisis not for props..before it im sstoring value to show in table
    useEffect(() => {
        getData()
        props.setItems({ items })
        //console.log(props.setItems)
    }, [])

    const getData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/itemlist", {
            headers: {
                "Authorization": `Bearer ${t.token}`
            }
        })
        console.log(response.data)
        props.setItems(response.data)
    }
    
    const renderHeader = () => {
        let headerElement = ['category','item_name', 'item_price', 'Delete', 'Modify']
        return headerElement.map((key, index) => {
            return key.toUpperCase()
        })
    }
   
    const removeData = (id) => {
        axios.delete(`http://127.0.0.1:5000/item`,
            {
                headers: { 'Authorization': `Bearer ${t.token}` },
                data: { item_name: id }
            }).then(res => {
                //const del = items.Items.filter(Items => id !== Items.Item_Id)
                alert("Item Deleted Successfully")
                getData()
                //setItems(del)
            }).catch(error => {
                console.log("Status = ", error.status)
                //    alert("Item with given name already exist")
            //console.log("Users.UserId ", Userid)
            console.log("Error : ", error)
        })
    }

    const renderBody = (props) => {
        return items && items.Items ? items.Items?.map(({ Category, Item_id, Item_name, Item_price, measure }) => {
            return [Category, Item_name, Item_price + '/' + measure,
                                       
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => removeData(Item_name)}
                >Delete</Button>,
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={() => handleClickOpen(Item_name,Item_price,Item_id)}
                >Edit</Button>
            ]
        }) : []
    }

    return (
        <GridContainer>
            {open ?
                < EditScrap name={name} price={price} id={itemId} open={open} setOpen={setOpen} items={items.Items} setItems={setItems} /> : null}
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Item Details</h4>
                        {/* <p className={classes.cardCategoryWhite}>
                            Here is a subtitle for this table
                         </p> */}
                    </CardHeader>
                    <CardBody>
                        <MUIDataTable
                            title={"ScrapMart Scrap list"}
                            data={renderBody()}
                            columns={renderHeader()}
                            options={options}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
