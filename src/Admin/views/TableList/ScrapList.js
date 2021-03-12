import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button/Button"
// core components
import GridItem from "Admin/components/Grid/GridItem.js";
import GridContainer from "Admin/components/Grid/GridContainer.js";
import Table from "Admin/components/Table/Table.js";
import Card from "Admin/components/Card/Card.js";
import CardHeader from "Admin/components/Card/CardHeader.js";
import CardBody from "Admin/components/Card/CardBody.js";
import EditScrap from "./EditScrap";
import axios from "axios";
import { useHistory } from "react-router";

const URL = 'http://127.0.0.1:5000/delete'
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
    var history = useHistory();
    const [id,setId] = React.useState(0)
    const t = JSON.parse(localStorage.getItem("token"));

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id) => {
        console.log('click')
        setId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    

    const [items, setItems] = useState(null)
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/itemlist", {
            headers: {
                "Authorization": "Bearer " + `${t.token}`
            }})
        setItems(response.data)
    }
    const renderHeader = () => {
        let headerElement = ['id', 'item_name', 'item_price', 'Delete', 'Modify']
        return headerElement.map((key, index) => {
            return key.toUpperCase()
        })
    }
   
    const removeData = (id) => {
        axios.delete(`http://127.0.0.1:5000/item`,
            {
                headers: { 'Authorization': "Bearer " + `${t.token}` },
                data: { item_name: id }
            }).then(res => {
            const del = items.Items.filter(Items => id !== Items.Item_Id)
                console.log("Response del= ", del)
                console.log("Status = ",res.status)
            setItems(del)
            alert("Item Deleted Successfully")
            }).catch(error => {
                console.log("Status = ", error.status)
                //    alert("Item with given name already exist")
            //console.log("Users.UserId ", Userid)
            console.log("Error : ", error)
        })
    }

    const renderBody = (props) => {
        //console.log(items)
        //item.map(row => console.log(row.name))
        
        return items ? items.Items.map(({ Item_id, Item_name, Item_price }) => {
            return [Item_id, Item_name, Item_price,
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
                    onClick={() => handleClickOpen(Item_id)}
                >Edit</Button>
            ]
            //<Button onClick={() => removeData(Username)}>Delete</Button>]
        }) : []
    }

    return (
        // <>
        //     <h1 id='title'>React Table</h1>
        //     <table id='employee'>
        //         <thead>
        //             <tr>{renderHeader()}</tr>
        //         </thead>
        //         <tbody>
        //             {renderBody()}
        //         </tbody>
        //     </table>
        // </>
        // );
        <GridContainer>
            < EditScrap data={id} open={open} handleClose={handleClose}/>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Simple Table</h4>
                        <p className={classes.cardCategoryWhite}>
                            Here is a subtitle for this table
            </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={renderHeader()}
                            tableData={renderBody()}
                        />
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>
    );
}
