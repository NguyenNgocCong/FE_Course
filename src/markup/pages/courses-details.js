import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollTo } from "react-scroll";
import { Markup } from "interweave";

// Layout 
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Images
import bannerImg from "../../images/banner/banner2.jpg";
import testiPic1 from "../../images/testimonials/pic1.jpg";
import testiPic2 from "../../images/testimonials/pic2.jpg";
import blogDefaultThum1 from "../../images/blog/default/thum1.jpg";
import { adminApi } from "../../api/adminApi";
import toast from "react-hot-toast";

function CoursesDetails(props) {
  const [product, setProduct] = useState(couresDetailExample);
  const location = useLocation();
  const id = location.pathname.substring(
    "/courses-details/".length,
    location.pathname.length
  );
  const type = id !== "create" ? 1 : 0;
  const getProductById = async () => {
    try {
      const response = await adminApi.getProductById(id);
      setProduct(response);
      console.log("res", response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };
  useEffect(() => {
    if (type === 1) {
      getProductById();
    }
    // eslint-disable-next-line
  }, []);
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
              <h1 className="text-white">{product.title}</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{product.title}</li>
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
                      <del>${product.listPrice}</del>
                      <h6 className="price">${product.salePrice}</h6>
                    </div>
                    <div className="course-buy-now text-center">
                      <Link to="#" className="btn radius-xl">
                        Buy Now {product.title}
                      </Link>
                    </div>
                    <div className="teacher-bx">
                      <div className="teacher-info">
                        <div className="teacher-thumb">
                          <img
                            src={product.sucjectCode.expert.avatar || testiPic1}
                            alt=""
                            onError={({ currentTarget }) => {
                              currentTarget.src = testiPic1;
                            }}
                          />
                        </div>
                        <div className="teacher-name">
                          <h5>{product.sucjectCode.expert.fullname}</h5>
                          <span>Expert</span>
                        </div>
                      </div>
                    </div>

                    <div className="course-info-list scroll-page">
                      <ul className="navbar">
                        <li>
                          <ScrollTo
                            smooth={true}
                            activeClass="active"
                            spy={true}
                            className="nav-link"
                            to={"overview"}
                          >
                            <i className="ti-zip"></i> Overview
                          </ScrollTo>
                        </li>
                      </ul>
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
                        <h2 className="post-title">{product.title}</h2>
                      </div>
                      <div className="ttr-post-text">
                        <p>{product.excerpt}</p>
                      </div>
                    </div>
                  </div>
                  <div className="courese-overview" id="overview">
                    <h4>Overview</h4>
                    <div className="row">
                      <div className="col-md-12 col-lg-4">
                        <ul className="course-features">
                          <li>
                            <i className="ti-book"></i>{" "}
                            <span className="label">manager</span>{" "}
                            <span className="value">
                              {product.sucjectCode.manager.username}
                            </span>
                          </li>
                          <li>
                            <i className="ti-help-alt"></i>{" "}
                            <span className="label">Manager Phone</span>{" "}
                            <span className="value">
                              {product.sucjectCode.manager.phoneNumber}
                            </span>
                          </li>
                          <li>
                            <i className="ti-time"></i>{" "}
                            <span className="label">Duration</span>{" "}
                            <span className="value">{product.duration}</span>
                          </li>
                          <li>
                            <i className="ti-stats-up"></i>{" "}
                            <span className="label">expert</span>{" "}
                            <span className="value">
                              {product.sucjectCode.expert.fullname}
                            </span>
                          </li>
                          <li>
                            <i className="ti-smallcap"></i>{" "}
                            <span className="label">Phone</span>{" "}
                            <span className="value">
                              {product.sucjectCode.expert.phoneNumber}
                            </span>
                          </li>
                          <li>
                            <i className="ti-user"></i>{" "}
                            <span className="label">CategoriId</span>{" "}
                            <span className="value">
                              {product.sucjectCode.categoryId}
                            </span>
                          </li>
                          <li>
                            <i className="ti-check-box"></i>{" "}
                            <span className="label">status</span>{" "}
                            <span className="value">
                              {product.status ? "yes" : "NO"}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-12 col-lg-8">
                        <div className="p-2">
                          <Markup content={product.description} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="m-b30" id="curriculum">
                    <h4>Curriculum</h4>
                    <ul className="curriculum-list">
                      <li>
                        <h5>First Level</h5>
                        <ul>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 1.</span> Introduction to UI Design
                            </div>
                            <span>120 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 2.</span> User Research and Design
                            </div>
                            <span>60 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 3.</span> Evaluating User Interfaces
                              Part 1
                            </div>
                            <span>85 minutes</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h5>Second Level</h5>
                        <ul>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 1.</span> Prototyping and Design
                            </div>
                            <span>110 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 2.</span> UI Design Capstone
                            </div>
                            <span>120 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Lesson 3.</span> Evaluating User Interfaces
                              Part 2
                            </div>
                            <span>120 minutes</span>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <h5>Final</h5>
                        <ul>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Part 1.</span> Final Test
                            </div>
                            <span>120 minutes</span>
                          </li>
                          <li>
                            <div className="curriculum-list-box">
                              <span>Part 2.</span> Online Test
                            </div>
                            <span>120 minutes</span>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div className="" id="instructor">
                    <h4>Instructor</h4>
                    <div className="instructor-bx">
                      <div className="instructor-author">
                        <img src={testiPic1} alt="" />
                      </div>
                      <div className="instructor-info">
                        <h6>Keny White </h6>
                        <span>Professor</span>
                        <ul className="list-inline m-tb10">
                          <li>
                            <Link to="#" className="btn sharp-sm facebook">
                              <i className="fa fa-facebook"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="btn sharp-sm twitter">
                              <i className="fa fa-twitter"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="btn sharp-sm linkedin">
                              <i className="fa fa-linkedin"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="btn sharp-sm google-plus">
                              <i className="fa fa-google-plus"></i>
                            </Link>
                          </li>
                        </ul>
                        <p className="m-b0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>
                      </div>
                    </div>
                    <div className="instructor-bx">
                      <div className="instructor-author">
                        <img src={testiPic2} alt="" />
                      </div>
                      <div className="instructor-info">
                        <h6>Keny White </h6>
                        <span>Professor</span>
                        <ul className="list-inline m-tb10">
                          <li>
                            <Link to="#" className="btn sharp-sm facebook">
                              <i className="fa fa-facebook"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="btn sharp-sm twitter">
                              <i className="fa fa-twitter"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="btn sharp-sm linkedin">
                              <i className="fa fa-linkedin"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="#" className="btn sharp-sm google-plus">
                              <i className="fa fa-google-plus"></i>
                            </Link>
                          </li>
                        </ul>
                        <p className="m-b0">
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book.
                        </p>
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

const couresDetailExample = {
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
      username: "manager1",
      email: "manage1@gmail.com",
      fullname: "Manager1",
      phoneNumber: "0358283749",
      avatar: "http://localhost:8080/api/account/downloadFile/null",
      role: "ROLE_MANAGER",
      active: true,
    },
    expert: {
      id: 10,
      username: "Hungnv",
      email: "expert4@gmail.com",
      fullname: "Nguyễn Việt Hùng",
      phoneNumber: "01238423753",
      avatar:
        "http://localhost:8080/api/account/downloadFile/d521c918-a7b5-4157-9a29-9b50f567256e.jpg",
      role: "ROLE_EXPERT",
      active: true,
    },
    image: null,
    categoryId: 12,
  },
};

export default CoursesDetails;
