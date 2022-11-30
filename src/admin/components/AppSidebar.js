import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import logo from "../../images/logo.png";

// sidebar nav config
import navigation from "../../_nav";
import Cookies from "js-cookie";

const AppSidebar = () => {
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.sidebarShow);


    const [role, setRole] = useState("");
    const [listNavigation, setListNavigation] = useState([]);

    useEffect(() => {
        setRole(JSON.parse(Cookies.get("user"))?.role);
    }, []);
    useEffect(() => {
        if (navigation.length) {
            if (role === "ROLE_MANAGER") {
                const newList = [];
                navigation.map((element) => {
                    const array1 = [
                        "Combo",
                        "Coupon",
                        "Class",
                        "Packages",
                        "Expert",
                        "Posts",
                    ];
                    if (array1.includes(element.name)) {
                        newList.push(element);
                    }
                });
                setListNavigation(newList);
            } else if (role === "ROLE_SUPPORTER") {
                const newList = [];
                navigation.map((element) => {
                    const array1 = [
                        "Class",
                        "Contact",
                        "Trainee",
                        "Registration",
                        "Orders",
                        "Ordered",
                        "Feedback",
                        "Dashboard",
                        "Posts",
                    ];
                    if (array1.includes(element.name)) {
                        newList.push(element);
                    }
                });
                setListNavigation(newList);
            } else if (role === "ROLE_MARKETER") {
                const newList = [];
                navigation.map((element) => {
                    const array1 = ["Sliders", "Posts"];
                    if (array1.includes(element.name)) {
                        newList.push(element);
                    }
                });
                setListNavigation(newList);
            } else if (role === "ROLE_EXPERT") {
                const newList = [];
                navigation.map((element) => {
                    const array1 = [""];
                    if (array1.includes(element.name)) {
                        newList.push(element);
                    }
                });
                setListNavigation(newList);
            }
        }
    }, [role]);

    return (
        <CSidebar
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                dispatch({ type: "set", sidebarShow: visible });
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" style={{ backgroundColor: "#FFFFFF", border: "solid 1px #cfd8dc" }} to="/">
                <img src={logo} alt="" width={150} />
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={navigation} />
                </SimpleBar>
            </CSidebarNav>
            {/* <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() =>
                    dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
                }
            /> */}
        </CSidebar>
    );
};

export default React.memo(AppSidebar);
