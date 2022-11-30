import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logoNegative } from "../assets/brand/logo-negative";
import { sygnet } from "../assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../../_nav";
import Cookies from "js-cookie";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const [role, setRole] = useState("");
  const [listNavigation, setListNavigation] = useState(navigation);

  useEffect(() => {
    setRole(JSON.parse(Cookies.get("user"))?.role);
  }, []);
  useEffect(() => {
    if (listNavigation.length) {
      if (role === "ROLE_MANAGER") {
        const newList = [];
        listNavigation.map((element) => {
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
        listNavigation.map((element) => {
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
        listNavigation.map((element) => {
          const array1 = ["Sliders", "Posts"];
          if (array1.includes(element.name)) {
            newList.push(element);
          }
        });
        setListNavigation(newList);
      } else if (role === "ROLE_EXPERT") {
        const newList = [];
        listNavigation.map((element) => {
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
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={listNavigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
