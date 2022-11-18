import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Layout
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";

// Images
import { comboApi } from "../../api/comboApi";
import bannerImg from "../../images/banner/banner2.jpg";
import blogDefaultThum1 from "../../images/blog/default/thum1.jpg";
import testiPic1 from "../../images/testimonials/pic1.jpg";
import DataTable from "react-data-table-component";

function ClassUserDetails(props) {
  const params = useParams();

  const [res, setRes] = useState(classDetailEx);

  const { id } = params;

  useEffect(() => {
    comboApi.getComboById(id).then((res) => {
      setRes(res);
    });
  }, [id]);

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
              <h1 className="text-white">{res.title}</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{res.title}</li>
            </ul>
          </div>
        </div>

        <div className="content-block">
          <div className="section-area section-sp1">
            <div className="container">
              <div className="row d-flex flex-row-reverse">
                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 m-b30">
                  <div className="course-detail-bx">
                    <div className="course-price">
                      <del>${res._package.listPrice}</del>
                      <h4 className="price">${res._package.listPrice}</h4>
                    </div>
                    <div className="course-buy-now text-center">
                      <Link to="#" className="btn radius-xl btn-primary">
                        Buy Now {res._class.code}
                      </Link>
                    </div>
                    <div className="teacher-bx">
                      <div className="teacher-info">
                        <div className="teacher-thumb">
                          <img src={testiPic1} alt="" />
                        </div>
                        <div className="teacher-name">
                          <h5>Hinata Hyuga</h5>
                          <span>Science Teacher</span>
                        </div>
                      </div>
                    </div>
                    <div className="cours-more-info">
                      <div className="review">
                        <span>3 Review</span>
                        <ul className="cours-star">
                          <li className="active">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="active">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="active">
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="price categories">
                        <span>Categories</span>
                        <h5 className="text-primary"></h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
                  <div className="courses-post">
                    <div className="ttr-post-media media-effect">
                      <Link to="#">
                        <img src={blogDefaultThum1} alt="" />
                      </Link>
                    </div>
                    <div className="ttr-post-info m-b30">
                      <div className="ttr-post-title ">
                        <h2 className="post-title">{res.supporter.fullname}</h2>
                      </div>
                      <div className="ttr-post-text">
                        <p>{res._package.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="" id="reviews">
                    <h4>Reviews</h4>

                    <div className="review-bx">
                      <div className="all-review">
                        <h2 className="rating-type">3</h2>
                        <ul className="cours-star">
                          <li className="active">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="active">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="active">
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                          <li>
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>
                        <span>3 Rating</span>
                      </div>
                      <div className="review-bar">
                        <div className="bar-bx">
                          <div className="side">
                            <div>5 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-5"
                                style={{ width: "90%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="side right">
                            <div>150</div>
                          </div>
                        </div>
                        <div className="bar-bx">
                          <div className="side">
                            <div>4 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-5"
                                style={{ width: "70%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="side right">
                            <div>140</div>
                          </div>
                        </div>
                        <div className="bar-bx">
                          <div className="side">
                            <div>3 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-5"
                                style={{ width: "50%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="side right">
                            <div>120</div>
                          </div>
                        </div>
                        <div className="bar-bx">
                          <div className="side">
                            <div>2 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-5"
                                style={{ width: "40%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="side right">
                            <div>110</div>
                          </div>
                        </div>
                        <div className="bar-bx">
                          <div className="side">
                            <div>1 star</div>
                          </div>
                          <div className="middle">
                            <div className="bar-container">
                              <div
                                className="bar-5"
                                style={{ width: "20%" }}
                              ></div>
                            </div>
                          </div>
                          <div className="side right">
                            <div>80</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

const classDetailEx = {
  startDate: "2022-11-09T07:00:00.000+00:00",
  _package: {
    id: 2,
    createdDate: "2022-11-04 17:59:57.51",
    updatedDate: "2022-11-04 17:59:57.51",
    title: "Product 1",
    excerpt: "asdasdasd",
    duration: "Duration1",
    description: "test123",
    combo: true,
    status: false,
    listPrice: 500.0,
    sale_price: 12300.0,
  },
  supporter: {
    id: 22,
    username: "Marketer",
    email: "Marketer@gmail.com",
    fullname: "Marketer",
    phoneNumber: "",
    avatar:
      "http://localhost:8080/api/account/downloadFile/24659c6a-2ab5-4e7c-ad7b-e8f99733ac44.jpg",
    role: "ROLE_MARKETER",
    active: true,
  },
  _class: {
    id: 1,
    code: "IS202210273202",
    dateFrom: "2022-12-24T07:00:00.000+00:00",
    dateTo: "2022-12-17T07:00:00.000+00:00",
    status: false,
    packages: "1234",
    trainer: {
      id: 7,
      username: "expert1",
      email: "expert1@gmail.com",
      fullname: "Expert1",
      phoneNumber: "",
      avatar: "http://localhost:8080/api/account/downloadFile/null",
      role: "ROLE_EXPERT",
      active: true,
    },
  },
};

export default ClassUserDetails;
