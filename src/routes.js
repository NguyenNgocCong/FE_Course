import React from "react";

const Dashboard = React.lazy(() => import("./views/admin/dashboard/dashboard"));
const Users = React.lazy(() => import("./views/admin/users/users"));
const Subject = React.lazy(() => import("./views/admin/subjects/subjects"));
const Order = React.lazy(() => import("./views/admin/order/index"));
const Contact = React.lazy(() => import("./views/admin/contact/contact"));
const Trainee = React.lazy(() => import("./views/admin/trainee/index"));
const Coupon = React.lazy(() => import("./views/admin/coupon/coupon"));
const Class = React.lazy(() => import("./views/admin/class/class"));
const Posts = React.lazy(() => import("./views/admin/posts/posts"));
const Sliders = React.lazy(() => import("./views/admin/sliders/sliders"));
const Packages = React.lazy(() => import("./views/admin/packages/packages"));
const Experts = React.lazy(() => import("./views/admin/expert/experts"));
const Combo = React.lazy(() => import("./views/admin/combo/combo"));
const Settings = React.lazy(() => import("./views/admin/settings/settings"));

const routes = [
    { path: "/", exact: true, name: "Home" },
    { path: "/admin/dashboard", name: "Dashboard", element: Dashboard },
    { path: "/admin/users", name: "Users", element: Users },
    { path: "/admin/contacts", name: "Contact", element: Contact },
    { path: "/admin/subjects", name: "Subject", element: Subject },
    { path: "/admin/order", name: "Order", element: Order },
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
