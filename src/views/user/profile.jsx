import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";

// Layout
import Header from "../home/layout/header/header";
import MyCart from "./element/my-cart";
import EditProfile from "./element/edit-profile";
import ChangePassword from "./element/change-password";
import bannerImg from "../../images/banner/banner1.jpg";
import avatarProfile from "../../images/icon/avatar.svg";
import { userApi } from "../../api/userApi";
import { combieImg } from "../../utils";
import MyOrderProfile from "./element/my-order-profile";
import MyClass from "./element/my-class";
import MyCourses from "./element/my-courses";
import { useSelector } from "react-redux";

function Profile(props) {
  const { isLogin } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const [state, setState] = useState(false);

  const getUsetProfile = async () => {
    try {
      const response = await userApi.getUserDetail();
      setUser(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  useEffect(() => {
    getUsetProfile();
  }, [state]);

  return (
    <>
      <Header />
      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Hồ sơ cá nhân</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>Hồ sơ cá nhân</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area section-sp1">
            <div >
              <Tab.Container defaultActiveKey="tabOne">
                <Tab.Content>
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-12 m-b30">
                      <div className="profile-bx text-center">
                        {isLogin ? (
                          <>
                            <div className="user-profile-thumb ">
                              <img
                                src={
                                  user?.avatar != null && user?.avatar
                                    ? combieImg(user?.avatar)
                                    : avatarProfile
                                }
                                className="w-100 h-100"
                                alt=""
                              />
                            </div>
                            <div className="profile-info">
                              <h4>{user?.fullname}</h4>
                              <span>{user?.email}</span>
                            </div>
                          </>
                        ) : (
                          <Link to={"/login"} className="btn btn-warning m-5 ">
                            Đăng nhập
                          </Link>
                        )}
                        {/* <div className="profile-social">
                          <ul className="list-inline m-a0">
                            <li>
                              <Link to="#">
                                <i className="fa fa-facebook"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fa fa-twitter"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fa fa-linkedin"></i>
                              </Link>
                            </li>
                            <li>
                              <Link to="#">
                                <i className="fa fa-google-plus"></i>
                              </Link>
                            </li>
                          </ul>
                        </div> */}
                        <div className="profile-tabnav">
                          <Nav className="nav-tabs">
                            <Nav.Item>
                              <Nav.Link eventKey="tabOne">
                                <i className="ti-book"></i>
                                Giỏ hàng
                              </Nav.Link>
                            </Nav.Item>
                            {isLogin && (
                              <>
                                <Nav.Item>
                                  <Nav.Link eventKey="tabTwo">
                                    <i className="ti-book"></i>
                                   Đơn hàng
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="tabThree">
                                    <i className="ti-book"></i>
                                    Lớp học đã mua
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="tabFour">
                                    <i className="ti-book"></i>
                                    Khóa học đã mua
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="tabFive">
                                    <i className="ti-pencil-alt"></i>
                                    Chỉnh sửa thông tin liên hệ
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                  <Nav.Link eventKey="tabSix">
                                    <i className="ti-lock"></i>
                                    Thay đổi mật khẩu
                                  </Nav.Link>
                                </Nav.Item>
                              </>
                            )}
                          </Nav>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12 m-b30">
                      <div className="profile-content-bx">
                        <div className="tab-content">
                          <Tab.Pane eventKey="tabOne">
                            <MyCart />
                          </Tab.Pane>
                          <Tab.Pane eventKey="tabTwo">
                            <MyOrderProfile />
                          </Tab.Pane>
                          <Tab.Pane eventKey="tabThree">
                            <MyClass />
                          </Tab.Pane>
                          <Tab.Pane eventKey="tabFour">
                            <MyCourses />
                          </Tab.Pane>
                          <Tab.Pane eventKey="tabFive">
                            <EditProfile
                              user={user}
                              stateChanger={setState}
                              state={state}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="tabSix">
                            <ChangePassword />
                          </Tab.Pane>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
