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
import { combieImg } from "../../utils/index";
import { Badge } from "react-bootstrap";

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
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">Our Class</h1>
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
          <div className="section-area section-sp1">
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
                            <img
                              src={combieImg(
                                item._class.packages.sucjectCode.expert.avatar
                              )}
                              alt=""
                            />
                            <Link
                              to={`/class/${item._class.id}`}
                              className="btn m-3 btn-warning"
                            >
                              Read More
                            </Link>
                          </div>
                          <div className="info-bx">
                            <span>{item._class.packages.title}</span>
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
                              {/* <div>{item._class.status}</div> */}
                            </div>
                            <div className="price">
                              {item._class.online ? (
                                <Badge bg="success">online</Badge>
                              ) : (
                                <Badge bg="info">offline</Badge>
                              )}
                            </div>
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
  totalItems: 3,
  data: [
    {
      startDate: "2022-11-23T00:00:00.000+00:00",
      supporter: {
        id: 21,
        username: "Supporter",
        email: "Supporter@gmail.com",
        fullname: "Supporter",
        phoneNumber: "",
        avatar: "24659c6a-2ab5-4e7c-ad7b-e8f99733ac44.jpg",
        role: "ROLE_SUPPORTER",
        active: true,
      },
      _class: {
        id: 2,
        code: "IS202211210457",
        dateFrom: "2022-11-21T00:00:00.000+00:00",
        dateTo: "2022-12-04T00:00:00.000+00:00",
        status: true,
        packages: {
          id: 1,
          title: "khóa học spring MVC cơ bản",
          excerpt: "",
          duration: "60",
          description: "",
          status: true,
          listPrice: 3000000.0,
          salePrice: 1800000.0,
          sucjectCode: {
            id: 1,
            code: "Java0001",
            name: "Lập trình java spring",
            status: true,
            note: "khóa học lập trình java spring",
            manager: {
              id: 3,
              username: "NgVinh",
              email: "manage1@gmail.com",
              fullname: "Nguyễn Văn Vinh",
              phoneNumber: "0358283749",
              avatar: null,
              role: "ROLE_MANAGER",
              active: true,
            },
            expert: {
              id: 10,
              username: "Hungnv",
              email: "expert4@gmail.com",
              fullname: "Nguyễn Việt Hùng",
              phoneNumber: "01238423753",
              avatar: "a0222275-f295-4552-8690-8f182ff20bf5.jpg",
              role: "ROLE_EXPERT",
              active: true,
            },
            image: null,
            categoryId: 12,
          },
        },
        trainer: {
          id: 4,
          createdDate: "2022-11-19 13:42:33.564",
          updatedDate: "2022-11-19 13:42:33.564",
          company: "FPT",
          jobTitle: ".NET Developer, Project Manager, Trainer",
          status: true,
          description: "",
          user: {
            id: 9,
            createdDate: "2022-10-25 11:07:08.598",
            updatedDate: "2022-11-19 13:47:45.735",
            email: "expert3@gmail.com",
            username: "Tungnh",
            password:
              "$2a$10$8E5BJ0YAewy/wBwLB1U9G.R0izWif1dn6VbfmXejhaNFNo7w7EZAe",
            fullname: "Nguyễn Hoàng Tùng",
            phoneNumber: "0123812314",
            avatar: "c9a313ee-5ccd-4175-99f0-404f76f57c41.jpg",
            note: null,
            active: true,
            registerToken: "Ckp8R84MIoJbSW6bgOiPBv076lAu9g",
            timeRegisterToken: "2022-10-25T11:07:09",
            resetPasswordToken: null,
            type_account: null,
            role: {
              setting_id: 8,
              type: {
                type_id: 1,
                title: "User Role",
              },
              setting_title: "Expert",
              setting_value: "ROLE_EXPERT",
              display_order: "role of expert",
              status: true,
              desciption: "role of expert",
            },
          },
        },
        online: false,
      },
    },
  ],
  totalPages: 1,
  currentPage: 0,
};
export default Class;
