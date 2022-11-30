import { Markup } from "interweave";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollTo } from "react-scroll";

// Layout
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";

// Images
import { adminApi } from "../../api/adminApi";
import bannerImg from "../../images/banner/banner2.jpg";
import blogDefaultThum1 from "../../images/blog/default/thum1.jpg";
import testiPic1 from "../../images/testimonials/pic1.jpg";
import { combieImg } from "../../utils/index";
import Comments from "./Comments";
import Reviews from "./Reviews";
import { userApi } from "../../api/userApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function CoursesDetails(props) {
  const { isLogin } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({});
  const location = useLocation();
  const id = location.pathname.substring(
    "/courses-details/".length,
    location.pathname.length
  );
  const [commets, setComments] = useState({ data: [] });

  const type = id !== "create" ? 1 : 0;
  const getProductById = async () => {
    try {
      const response = await adminApi.getProductById(id);
      setProduct(response);
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
    userApi.getCommentPackage().then((x) => setComments(x));
    // eslint-disable-next-line
  }, []);

  const handleComment = (data) => {
    if (isLogin && type === 1) {
      userApi
        .createComment({ ...data, packageId: id })
        .then((res) => {
          toast.success(res.message);
          userApi.getCommentPackage().then((x) => setComments(x));
        })
        .catch((e) => toast.error(e?.data?.message));
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="page-content">
        <div
          className="page-banner ovbl-dark"
          style={{ height: "200px", backgroundImage: "url(" + bannerImg + ")" }}
        >
          <div className="container">
            <div className="page-banner-entry">
              <h1 className="text-white">{product?.title}</h1>
            </div>
          </div>
        </div>
        <div className="breadcrumb-row">
          <div className="container">
            <ul className="list-inline">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{product?.title}</li>
            </ul>
          </div>
        </div>
        <div className="content-block">
          <div className="section-area" style={{ marginTop: "20px" }}>
            <div className="container">
              <div className="row d-flex flex-row-reverse">
                <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 m-b30">
                  <div className="course-detail-bx">
                    <div className="course-price">
                      <del>${product?.listPrice}</del>
                      <h6 className="price">${product?.salePrice}</h6>
                    </div>
                    <div className="course-buy-now text-center">
                      <Link to="#" className="btn btn-primary radius-xl">
                        Buy Now
                      </Link>
                    </div>
                    <div className="teacher-bx">
                      <div className="teacher-info">
                        <div className="teacher-thumb">
                          <img
                            src={combieImg(
                              product?.sucjectCode?.expert?.user?.avatar
                            )}
                            alt=""
                            onError={({ currentTarget }) => {
                              currentTarget.src = testiPic1;
                            }}
                          />
                        </div>
                        <div className="teacher-name">
                          <h5>
                            {product?.sucjectCode?.expert?.user?.fullname}
                          </h5>
                          <span>{product?.sucjectCode?.expert?.company}</span>
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
                    <div className="ttr-post-info m-b30">
                      <div className="ttr-post-title ">
                        <h2 className="post-title">{product?.title}</h2>
                      </div>
                      <div className="ttr-post-text">
                        <p>{product?.excerpt}</p>
                      </div>
                    </div>
                  </div>
                  <div className="courese-overview" id="overview">
                    <h4>Overview</h4>
                    <div className="row">
                      <div className="col-md-12 col-lg-4">
                        <div className="ttr-post-media media-effect">
                          <Link to="#">
                            <img src={blogDefaultThum1} alt="" />
                          </Link>
                        </div>
                        <ul className="course-features">
                          <li>
                            <i className="ti-book"></i>{" "}
                            <span className="label">manager</span>{" "}
                            <span className="value">
                              {product?.sucjectCode?.manager?.username}
                            </span>
                          </li>
                          <li>
                            <i className="ti-help-alt"></i>{" "}
                            <span className="label">Manager Phone</span>{" "}
                            <span className="value">
                              {product?.sucjectCode?.manager?.phoneNumber}
                            </span>
                          </li>
                          <li>
                            <i className="ti-time"></i>{" "}
                            <span className="label">Duration</span>{" "}
                            <span className="value">{product?.duration}</span>
                          </li>
                          <li>
                            <i className="ti-stats-up"></i>{" "}
                            <span className="label">expert</span>{" "}
                            <span className="value">
                              {product?.sucjectCode?.expert?.user?.fullname}
                            </span>
                          </li>
                          <li>
                            <i className="ti-smallcap"></i>{" "}
                            <span className="label">Phone</span>{" "}
                            <span className="value">
                              {product?.sucjectCode?.expert?.user?.phoneNumber}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-12 col-lg-8">
                        <div className="p-3">
                          <Markup content={product?.description} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Comments
                    hanleComment={handleComment}
                    comments={commets.data}
                  />
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

export default CoursesDetails;
