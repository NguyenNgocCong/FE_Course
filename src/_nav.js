import { CNavItem } from "@coreui/react";

const _nav = [
    {
        component: CNavItem,
        name: "Dashboard",
        to: "/admin/dashboard",
        icon: "fa fa-home",
        badge: {
            color: "info",
            text: "NEW",
        },
    },
    {
        component: CNavItem,
        name: "Users",
        to: "/admin/users",
        icon: "fa fa-user",
    },
    {
        component: CNavItem,
        name: "Contact",
        to: "/admin/contacts",
        icon: "fa fa-id-badge",
    },
    {
        component: CNavItem,
        name: "Subjects",
        to: "/admin/subjects",
        icon: "fa fa-book",
    },
    {
        component: CNavItem,
        name: "Class",
        to: "/admin/class",
        icon: "fa fa-users",
    },
    {
        component: CNavItem,
        name: "Trainee",
        to: "/admin/trainee",
        icon: "fa fa-user-circle",
    },
    {
        component: CNavItem,
        name: "Posts",
        to: "/admin/posts",
        icon: "fa fa-bookmark",
    },
    {
        component: CNavItem,
        name: "Sliders",
        to: "/admin/sliders",
        icon: "fa fa-image",
    },
    {
        component: CNavItem,
        name: "Packages",
        to: "/admin/packages",
        icon: "fa fa-folder",
    }, {
        component: CNavItem,
        name: "Expert",
        to: "/admin/experts",
        icon: "fa fa-user-md",
    },
    {
        component: CNavItem,
        name: "Combo",
        to: "/admin/combos",
        icon: "fa fa-inbox",
    },
    {
        component: CNavItem,
        name: "Registration",
        to: "/admin/registration",
        icon: "fa fa-shopping-cart",
    },
    {
        component: CNavItem,
        name: "Orders",
        to: "/admin/orders",
        icon: "fa fa-shopping-basket",
    },
    {
        component: CNavItem,
        name: "Ordered",
        to: "/admin/ordered",
        icon: "fa fa-shopping-bag",
    },
    {
        component: CNavItem,
        name: "Coupon",
        to: "/admin/coupon",
        icon: "fa fa-table",
    },
    {
        component: CNavItem,
        name: "Setting",
        to: "/admin/settings",
        icon: "fa fa-sliders",
    }
];

export default _nav;
