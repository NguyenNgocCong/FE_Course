import { CNavGroup, CNavItem } from "@coreui/react";


const _nav = [
    {
        component: CNavItem,
        name: "Dashboard",
        to: "/admin/dashboard",
        icon: "fa fa-home",
        badge: {
            color: "info",
            text: "NEW",
        }
    },
    {
        component: CNavItem,
        name: "Người dùng",
        to: "/admin/users",
        icon: "fa fa-user",
    },
    {
        component: CNavItem,
        name: "Thông tin liên hệ",
        to: "/admin/contacts",
        icon: "fa fa-id-badge",
    },
    {
        component: CNavItem,
        name: "Bài học",
        to: "/admin/subjects",
        icon: "fa fa-book",
    },
    {
        component: CNavItem,
        name: "Lớp học",
        to: "/admin/class",
        icon: "fa fa-users",
    },
    {
        component: CNavItem,
        name: "Học viên",
        to: "/admin/trainee",
        icon: "fa fa-user-circle",
    },
    {
        component: CNavItem,
        name: "Blog",
        to: "/admin/posts",
        icon: "fa fa-bookmark",
    },
    {
        component: CNavItem,
        name: "Slider",
        to: "/admin/sliders",
        icon: "fa fa-image",
    },
    {
        component: CNavItem,
        name: "Khóa học",
        to: "/admin/packages",
        icon: "fa fa-folder",
    }, {
        component: CNavItem,
        name: "Giảng viên",
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
        component: CNavGroup,
        name: 'Đơn hàng',
        to: '/admin/order',
        icon: "fa fa-shopping-cart",
        items: [
            {
                component: CNavItem,
                name: "Đăng ký lớp học",
                to: "/admin/registration",
                icon: "fa fa-shopping-cart",
            },
            {
                component: CNavItem,
                name: "Khóa học",
                to: "/admin/orders",
                icon: "fa fa-shopping-basket",
            },
            {
                component: CNavItem,
                name: "Đơn hàng thanh toán",
                to: "/admin/order-done",
                icon: "fa fa-cart-plus",
            },
            {
                component: CNavItem,
                name: "Đơn hàng bị hủy",
                to: "/admin/order-cancel",
                icon: "fa fa-cart-arrow-down",
            }
        ]
    },
    {
        component: CNavItem,
        name: "Mã giảm giá",
        to: "/admin/coupon",
        icon: "fa fa-table",
    },
    {
        component: CNavItem,
        name: "Thiết lập",
        to: "/admin/settings",
        icon: "fa fa-sliders",
    }
];

export default _nav;
