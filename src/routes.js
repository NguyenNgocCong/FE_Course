import React from "react";

const Dashboard = React.lazy(() => import("./admin/views/dashboard/Dashboard"));
// Base
const Users = React.lazy(() => import("./admin/views/users/Users"));
const Subject = React.lazy(() => import("./admin/views/subjects/subjects"));
const Registration = React.lazy(() => import("./admin/views/registration/registration"));
const Orders = React.lazy(() => import("./admin/views/orders/orders"));
const Ordered = React.lazy(() => import("./admin/views/ordered/ordered"));
const Contact = React.lazy(() => import("./admin/views/contact/contact"));
const Trainee = React.lazy(() => import("./admin/views/trainee/trainee"));
const Coupon = React.lazy(() => import("./admin/views/coupon/coupon"));
const Class = React.lazy(() => import("./admin/views/class/class"));
const Posts = React.lazy(() => import("./admin/views/posts/Posts"));
const Sliders = React.lazy(() => import("./admin/views/sliders/Sliders"));
const Packages = React.lazy(() => import("./admin/views/packages/Packages"));
const Experts = React.lazy(() => import("./admin/views/expert/Experts"));
const Combo = React.lazy(() => import("./admin/views/combo/Combo"));
const Settings = React.lazy(() => import("./admin/views/settings/Settings"));

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/admin/dashboard", name: "Dashboard", element: Dashboard },
    { path: "/admin/users", name: "Users", element: Users },
    { path: "/admin/contacts", name: "Contact", element: Contact },
    { path: "/admin/subjects", name: "Subject", element: Subject },
    { path: "/admin/registration", name: "Registration", element: Registration },
    { path: "/admin/orders", name: "Orders", element: Orders },
    { path: "/admin/ordered", name: "Ordered", element: Ordered },
    { path: "/admin/class", name: "Class", element: Class },
    { path: "/admin/coupon", name: "Coupon", element: Coupon },
    { path: "/admin/trainee", name: "Trainee", element: Trainee },
    { path: "/admin/posts", name: "Posts", element: Posts },
    { path: "/admin/sliders", name: "Sliders", element: Sliders },
    { path: "/admin/packages", name: "Packages", element: Packages },
    { path: "/admin/experts", name: "Experts", element: Experts },
    { path: "/admin/combos", name: "Combo", element: Combo },
    { path: "/admin/settings", name: "Settings", element: Settings }
];

export default routes;
