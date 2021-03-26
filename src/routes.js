// @material-ui/icons
import React, { useContext, useState } from "react";
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";

import Out from "@material-ui/icons/ExitToAppOutlined"
import DashboardPage from "Admin/views/Dashboard/Dashboard.js";
import AddVendor from "Admin/views/TableList/AddVendor";
import AddScrap from "Admin/views/TableList/AddScrap";
import Logout from "User/views/LoginPage/Logout";
import CustomerList from "Admin/views/TableList/CustomerList";
import Dashboard_vendor from 'Admin/views/Dashboard/Dashboard_vendor';
import Vendor_order from 'Vendor/views/Vendor_order';
import Role from './App';


const routes = []
//const urole = useContext(Role);
//console.log(urole)
if (JSON.parse(localStorage.getItem('role'))?.role === 'Admin')
//if(urole==='Admin')
{
  routes.push(...[
    {
      path: "/dashboard",
      name: "Dashboard",
      rtlName: "لوحة القيادة",
      icon: Dashboard,
      component: DashboardPage,
      layout: "/admin"
    },
    {
      path: "/add-vendor",
      name: "Manage Vendor",
      rtlName: "قائمة الجدول",
      icon: Person,
      component: AddVendor,
      layout: "/admin"
    },
    {
      path: "/customer-list",
      name: "Manage Customer",
      rtlName: "طباعة",
      icon: Person,
      component: CustomerList,
      layout: "/admin"
    },
    {
      path: "/add-scrap",
      name: "Manage Scrap",
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: AddScrap,
      layout: "/admin"
    }
  ])
}
  else {
  routes.push(...[
    // {
    //   path: "/dashboard_vendor",
    //   name: "Vendor Dashboard",
    //   rtlName: "لوحة القيادة",
    //   icon: Dashboard,
    //   component: Dashboard_vendor,
    //   layout: "/admin"
    // },
    {
      path: "/order-details",
      name: "Manage Order",
      rtlName: "قائمة الجدول",
      icon: "content_paste",
      component: Vendor_order,
      layout: "/admin"
    }
  ])
}
routes.push(...[
  {
  path: "/logout",
  name: "Logout",
  rtlName: "طباعة",
  icon: Out,
  component: Logout,
  layout: "/admin"
},])

export default routes;
