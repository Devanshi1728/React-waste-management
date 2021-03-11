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
import axios from "axios";

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

export default function VendorList() {
    const classes = useStyles();
    const [vendors, setVendors] = useState(null);
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get("http://127.0.0.1:5000/userlist")
        setVendors(response.data)
        console.log("Role = ", response.data.Users.Role)
        // console.log("data.username = ",response.data.Users.Username)
        // axios.get("http://127.0.0.1:5000/userlist")
        //     .then(response => {
        //         setVendors(response.data)
        //         //console.log(response.data.TotalUsers)
        //         //console.log(response.data.Users)
    }
    const renderHeader = () => {
        let headerElement = ['id', 'username', 'Role', 'city', 'phone', 'Delete']
        return headerElement.map((key, index) => {
            return key.toUpperCase()
        })
    }
    const t = JSON.parse(localStorage.getItem("token"));

    const removeData = (id) => {
        axios.delete(`http://127.0.0.1:5000/delete`,
            {
                headers: { 'Authorization': "Bearer " + `${t.token}` },
                data: { username: id }
            }).then(res => {
                const del = vendors.Users.filter(Users => id !== Users.UserId)
                console.log("Response del= ", del)
                setVendors(del)
                console.log("vendors ",vendors)
                alert("Vendor Deleted Successfully")
        }).catch(error => {
            console.log("id", id)
            console.log("Error : ", error)
        })
    }

    // const EditData = (id) => {
    //     console.log("Edit called")
    //     axios.put(`http://127.0.0.1:5000/user`,
    //         {
    //             headers:
    //                 { 'Authorization': "Bearer " + `${t.token}` }, data: { id: id }
    //         }).then(res => {
    //         //const del = vendors.Users.filter(Users => id !== Users.UserId)
    //         console.log("Response = ", res)

    //         setVendors(res)
    //         alert("Data Updated Successfully")
    //     }).catch(error => {
    //         console.log("id", id)
    //         //console.log("Users.UserId ", Userid)
    //         console.log("Error : ", error)
    //     })
    // }

    const renderBody = (props) => {
        console.log(vendors)
        return vendors && vendors.Users ? vendors.Users.map(({ UserId, Username, Role, City, Phone }) => {
            return [UserId, Username, Role, City, Phone,
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => removeData(Username)}
                >Delete</Button>
                // <Button
                //     variant="contained"
                //     color="primary"
                //     size="small"
                //     className={classes.button}
                //     startIcon={<EditIcon />}
                //     onClick={() => EditData(UserId)}
                // >Edit</Button>
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
