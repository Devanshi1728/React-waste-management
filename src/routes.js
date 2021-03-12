// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Out from "@material-ui/icons/ExitToAppOutlined"
import DashboardPage from "Admin/views/Dashboard/Dashboard.js";
import AddVendor from "Admin/views/TableList/AddVendor";
import AddScrap from "Admin/views/TableList/AddScrap";
import Logout from "User/views/LoginPage/Logout";
import CustomerList from "Admin/views/TableList/CustomerList";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  //  {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
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
  },
  {
    path: "/logout",
    name: "Logout",
    rtlName: "طباعة",
    icon: Out,
    component: Logout,
    layout: "/admin"
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // }
  // },
  //  {
  //   path: "/vendor-page",
  //   name: "vendor",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/vendor/dashboard"
  // }
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
