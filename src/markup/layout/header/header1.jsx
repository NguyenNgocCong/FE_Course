import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sticky from "react-stickynode";

// Images
import logo from "../../../images/logopurple.png";
import Cookies from "js-cookie";
import { CAvatar } from "@coreui/react";
import avatarProfile from "../../../images/icon/avatar.svg";
import { useSelector, useDispatch } from "react-redux";
import { setEditAvatar } from "../../../redux/reducers/user";

import "react-confirm-alert/src/react-confirm-alert.css";
import { combieImg } from "../../../utils";
import { getUserInfoReduce, resetState } from "../../../redux/reducers/auth";
import {
  getAllCartServer,
} from "../../../redux/reducers/order";

function Header() {
  const { isLogin } = useSelector((state) => state.auth);
  const { packages, combos } = useSelector((state) => state.order.data);
  const totalCart = packages.length + combos.length;
  const [id, setId] = useState(Cookies.get("id"));
  const [user, setUser] = useState(
    Cookies.get("user") === undefined
      ? Cookies.get("user")
      : JSON.parse(Cookies.get("user")),
  );

  // eslint-disable-next-line
  const [role, setRole] = useState(Cookies.get("roles"));
  const [isExpand, setIsExpand] = useState(false);

  const dispatch = useDispatch();
  const editAvatar = useSelector((state) => state.userReducers.editAvatar);
  useEffect(() => {
    dispatch(getUserInfoReduce());
  }, [dispatch]);
  useEffect(() => {
    if (isLogin) {
      dispatch(getAllCartServer());
    }
  }, [isLogin, dispatch]);
  useEffect(() => {
    // var searchBtn = document.getElementById("quik-search-btn");
    // var searchForm = document.querySelector(".nav-search-bar");
    // var closeBtn = document.getElementById("search-remove");
    // searchBtn.addEventListener("click", function () {
    //   searchForm.classList.add("show");
    // });

    // closeBtn.addEventListener("click", function () {
    //   searchForm.classList.remove("show");
    // });

    // Mobile Menu sidebar function
    var btn = document.querySelector(".menuicon");
    var nav = document.querySelector(".menu-links");

    function toggleFunc() {
      btn.classList.toggle("open");
      nav.classList.toggle("show");
    }

    btn.addEventListener("click", toggleFunc);

    // Mobile Submenu open close function
    var navMenu = [].slice.call(
      document.querySelectorAll(".menu-links > ul > li"),
    );
    for (var y = 0; y < navMenu.length; y++) {
      navMenu[y].addEventListener("click", function () {
        menuClick(this);
      });
    }

    function menuClick(current) {
      const active = current.classList.contains("open");
      navMenu.forEach((el) => el.classList.remove("open"));

      if (active) {
        current.classList.remove("open");
      } else {
        current.classList.add("open");
      }
    }
  }, []);

  useEffect(() => {
    setUser(
      Cookies.get("user") === undefined
        ? Cookies.get("user")
        : JSON.parse(Cookies.get("user")),
    );
    dispatch(setEditAvatar(false));
    // eslint-disable-next-line
  }, [editAvatar]);

  const handleLogout = () => {
    Cookies.remove("id");
    Cookies.remove("username");
    Cookies.remove("access_token");
    Cookies.remove("roles");
    Cookies.remove("user");
    setId(undefined);
    dispatch(resetState());
  };

  return (
    <>
      <header className="header1 rs-nav">
        <Sticky enabled={true} className="sticky-header navbar-expand-lg">
          <div className="menu-bar clearfix">
            <div className="container clearfix">
              {/* <!-- Header Logo ==== --> */}
              <div className="menu-logo" style={{ height: "60px" }}>
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              {/* <!-- Mobile Nav Button ==== --> */}
              <button
                className="navbar-toggler collapsed menuicon justify-content-end"
                type="button"
                data-toggle="collapse"
                data-target="#menuDropdown"
                aria-controls="menuDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              {/* <!-- Author Nav ==== --> */}
              <div className="secondary-menu">
                <div className="secondary-inner">
                  <div className="topbar-right">
                    <ul className="d-flex">
                      <li >
                        <Link
                          to={"/profile"}
                          id="quik-search-btn"
                          type="button"
                          className="btn-link fs-3 link__card"
                        >
                          <i className="fa fa-shopping-cart"></i>{" "}
                          <span>{totalCart}</span>
                        </Link>
                      </li>
                      {id ? (
                        <li className="is-logged-in">
                          <div
                            onClick={() => setIsExpand(!isExpand)}
                          >
                            <CAvatar
                              src={combieImg(user?.avatar)}
                              alt=""
                              size="md"
                              onError={({ currentTarget }) => {
                                currentTarget.src = avatarProfile;
                              }}
                            />
                          </div>
                          <ul
                            className="sub-menu"
                            style={
                              isExpand
                                ? {
                                  visibility: "visible",
                                  opacity: "1",
                                  width: "200px",
                                }
                                : {
                                  visibility: "hidden",
                                  opacity: "0",
                                }
                            }
                          >
                            {role === "ROLE_ADMIN" ? (
                              <Link to="/admin/dashboard">
                                <li className="text-left">Dashboard</li>
                              </Link>
                            ) : role === "ROLE_SUPPORTER" ? (
                              <Link to="/admin/contacts">
                                <li className="text-left">Admin</li>
                              </Link>
                            ) : role === "ROLE_MARKETER" ? (
                              <Link to="/admin/posts">
                                <li className="text-left">Admin</li>
                              </Link>
                            ) : role === "ROLE_MANAGER" ? (
                              <Link to="/admin/class">
                                <li className="text-left">Admin</li>
                              </Link>
                            ) : (
                              ""
                            )}
                            <Link to="/profile">
                              <li className="text-left">User Profile</li>
                            </Link>
                            <Link to="/profile">
                              <li className="text-left">Change Password</li>
                            </Link>
                            <li className="text-left" onClick={handleLogout}>
                              Logout
                            </li>
                          </ul>
                        </li>
                      ) : (
                        <div>
                          <li className="text-left">
                            <Link to="/login">Login</Link>
                          </li>
                          <li className="text-left">
                            <Link to="/register">Register</Link>
                          </li>
                        </div>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="menu-links navbar-collapse collapse justify-content-start"
                id="menuDropdown"
              >
                <div className="menu-logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/lecturers">Teachers</Link>
                  </li>
                  <li>
                    <Link to="/products">Courses</Link>
                  </li>
                  <li>
                    <Link to="/combo">Combos</Link>
                  </li>
                  <li>
                    <Link to="/class">Classes</Link>
                  </li>
                  <li>
                    <Link to="/blog">Blogs</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Sticky>
        <div className="nav-search-bar">
          <form action="#">
            <input
              name="search"
              type="text"
              className="form-control"
              placeholder="Type to search"
            />
            <span>
              <i className="ti-search"></i>
            </span>
          </form>
          <span id="search-remove">
            <i className="ti-close"></i>
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
