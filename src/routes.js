// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Out from "@material-ui/icons/ExitToAppOutlined"
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
// import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
// import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "Admin/views/Dashboard/Dashboard.js";
import UserProfile from "Admin/views/UserProfile/UserProfile.js";
//import TableList from "Admin/views/TableList/TableList.js";
import AddVendor from "Admin/views/TableList/AddVendor";
import AddScrap from "Admin/views/TableList/AddScrap";
import Logout from "User/views/LoginPage/Logout";
import ScrapList from "Admin/views/TableList/ScrapList";
//import Icons from "Admin/views/Icons/Icons.js";
// import Maps from "Admin/views/Maps/Maps.js";
// import NotificationsPage from "Admin/views/Notifications/Notifications.js";
// import UpgradeToPro from "Admin/views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
//import RTLPage from "Admin/views/RTLPage/RTLPage.js";

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
    path: "/add-scrap",
    name: "Scrap Details",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: AddScrap,
    layout: "/admin"
  },
  {
    path: "/add-vendor",
    name: "Users Details ",
    rtlName: "قائمة الجدول",
    icon: Person,
    component: AddVendor,
    layout: "/admin"
  },
  {
    path: "/scrap-list",
    name: "Scrap List",
    rtlName: "طباعة",
    icon: "content_paste",
    component: ScrapList,
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
