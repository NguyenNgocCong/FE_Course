import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Layout
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";

// Images
import { comboApi } from "../../api/comboApi";
import adv from "../../images/adv/adv.jpg";
import bannerImg from "../../images/banner/banner3.jpg";
import blogRecentPic1 from "../../images/blog/recent-blog/pic1.jpg";
import blogRecentPic3 from "../../images/blog/recent-blog/pic3.jpg";
import PagingQuestion from "../elements/PagingQuestion/PagingQuestion";
import { classApi } from "../../api/classApi";

function Class() {
  const [res, setRes] = useState(classEx);

  const [page, setPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line
    classApi.getAllClass(page - 1).then((res) => {
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
                    {data.map((item, index) => (
                      <div
                        className="col-md-6 col-lg-4 col-sm-6 m-b30"
                        key={index}
                      >
                        <div className="cours-bx">
                          <div className="action-box">
                            <img src={blogRecentPic1} alt="" />
                            <Link
                              to={`/class/${item._class.id}`}
                              className="btn"
                            >
                              Read More
                            </Link>
                          </div>
                          <div className="info-bx">
                            <span>{item._class.status}</span>
                            <h6>
                              <Link to={`/class/${item._class.id}`}>
                                {item._class.trainer.fullname}
                              </Link>
                            </h6>
                          </div>
                          <div className="cours-more-info">
                            <div className="review">
                              <span> {item.supporter.fullname}</span>
                              {/* <ul className="cours-star">
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
															</ul> */}
                              <div>{item._class.status}</div>
                            </div>
                            {/* <div className="price">
                              <del>${item}</del>
                              <h5>${item.sale_price}</h5>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="col-lg-12 m-b20">
                      <div className="pagination-bx rounded-sm gray clearfix">
                        {/* <ul className="pagination">
													<li className="previous"><Link to="#"><i className="ti-arrow-left"></i> Prev</Link></li>
													<li className="active"><Link to="#">1</Link></li>
													<li><Link to="#">2</Link></li>
													<li><Link to="#">3</Link></li>
													<li className="next"><Link to="#">Next <i className="ti-arrow-right"></i></Link></li>
												</ul> */}
                        <PagingQuestion
                          currentPage={currentPage}
                          totalPage={totalPages}
                          totalItem={totalItems}
                          onChange={() => {}}
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

      <Footer />
    </>
  );
}

const classEx = {
  totalItems: 0,
  data: [
    {
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
    },
  ],
  totalPages: 0,
  currentPage: 0,
};

export default Class;
