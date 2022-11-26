import React, { useEffect, useState } from "react";
import PagingQuestion from "../elements/PagingQuestion/PagingQuestion";
import Header from "../layout/header/header1";

import { Link } from "react-router-dom";
import { expert } from "../../api/expertApi";
import adv from "../../images/adv/adv.jpg";
import bannerImg from "../../images/banner/banner3.jpg";
import blogRecentPic1 from "../../images/blog/recent-blog/pic1.jpg";
import blogRecentPic3 from "../../images/blog/recent-blog/pic3.jpg";
import Footer1 from "../layout/footer/footer1";
import {
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";
const Expert = () => {
  const [res, setRes] = useState(ExpertExample);

  const [page, setPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line
    expert.getAllExpert(page - 1).then((res) => {
      setRes(res);
    });
  }, [page]);
  const { data, totalItems, totalPages, currentPage } = res;
  return (
    <>
      <Header />

      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ height: "200px", backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Our Courses</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>Our Courses</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-12">
                  <div className="widget widget_archive">
                    <h5 className="widget-title style-1">All Courses</h5>
                    <ul>
                      <li className="active">
                        <Link to="#">General</Link>
                      </li>
                      <li>
                        <Link to="/courses-details">IT & Software</Link>
                      </li>
                      <li>
                        <Link to="/courses-details">Photography</Link>
                      </li>
                      <li>
                        <Link to="/courses-details">Programming Language</Link>
                      </li>
                      <li>
                        <Link to="/courses-details">Technology</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="widget recent-posts-entry widget-courses">
                    <h5 className="widget-title style-1">Recent Courses</h5>
                    <div className="widget-post-bx">
                      <div className="widget-post clearfix">
                        <div className="ttr-post-media">
                          {" "}
                          <img
                            src={blogRecentPic1}
                            width="200"
                            height="143"
                            alt=""
                          />{" "}
                        </div>
                        <div className="ttr-post-info">
                          <div className="ttr-post-header">
                            <h6 className="post-title">
                              <Link to="/courses-details">
                                Introduction EduChamp
                              </Link>
                            </h6>
                          </div>
                          <div className="ttr-post-meta">
                            <ul>
                              <li className="price">
                                <del>$190</del>
                                <h5>$120</h5>
                              </li>
                              <li className="review">03 Review</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="widget-post clearfix">
                        <div className="ttr-post-media">
                          {" "}
                          <img
                            src={blogRecentPic3}
                            width="200"
                            height="160"
                            alt=""
                          />{" "}
                        </div>
                        <div className="ttr-post-info">
                          <div className="ttr-post-header">
                            <h6 className="post-title">
                              <Link to="/courses-details">
                                English For Tommorow
                              </Link>
                            </h6>
                          </div>
                          <div className="ttr-post-meta">
                            <ul>
                              <li className="price">
                                <h5 className="free">Free</h5>
                              </li>
                              <li className="review">07 Review</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget">
                    <Link to="/membership">
                      <img src={adv} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                  <div className="row">
                    {data.map((item) => (
                      <CCard
                        className="mb-5 p-2 cousor border-0 border-bottom"
                        role={"button"}
                        key={item.id}
                      >
                        <CRow className="g-0">
                          <CCol md={4}>
                            <CCardImage src={blogRecentPic1} />
                          </CCol>
                          <CCol md={8}>
                            <CCardBody>
                              <CCardTitle>{item.user.fullname}</CCardTitle>
                              <CCardText>{item.description}</CCardText>
                              <CCardText>
                                <small className="text-medium-emphasis">
                                  {item.createdDate}
                                </small>
                              </CCardText>
                            </CCardBody>
                          </CCol>
                        </CRow>
                      </CCard>
                    ))}
                    <div className="col-lg-12 m-b20">
                      <div className="pagination-bx rounded-sm gray clearfix">
                        <PagingQuestion
                          currentPage={currentPage}
                          totalPage={totalPages}
                          totalItem={totalItems}
                          onChange={(e) => {
                            setPage(e);
                          }}
                        ></PagingQuestion>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer1 />
    </>
  );
};

const ExpertExample = {
  totalItems: 12,
  data: [
    {
      id: 5,
      createdDate: "2022-11-08 23:37:20.969",
      updatedDate: "2022-11-08 23:37:20.969",
      description: "C#",
      company: "C# express",
      jobTitle: "backend dev",
      status: true,
      user: {
        id: 23,
        createdDate: "2022-11-08 21:57:08.429",
        updatedDate: "2022-11-08 21:57:08.429",
        email: "Trainee@gmail.com",
        username: "Trainee",
        password:
          "$2a$10$oU99qQRsTFT06NJm/md7ouxFinlckXrXf99l/ZzcOk3HuHFR6DSMO",
        fullname: "Trainee",
        phoneNumber: null,
        avatar: "24659c6a-2ab5-4e7c-ad7b-e8f99733ac44.jpg",
        note: null,
        active: true,
        registerToken: "YimPUtujifDd3iamw7Sl4RcPG3FBUi",
        timeRegisterToken: "2022-11-08T21:57:08",
        resetPasswordToken: null,
        type_account: null,
        role: {
          setting_id: 6,
          type: {
            type_id: 1,
            title: "User Role",
          },
          setting_title: "Trainee",
          setting_value: "ROLE_TRAINEE",
          display_order: "role of trainee",
          status: true,
          desciption: "role of trainee",
        },
      },
    },
  ],
  totalPages: 2,
  currentPage: 0,
};
export default Expert;
