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
import blogDefaultThum1 from "../../images/blog/default/thum1.jpg";
import { adminApi } from "../../api/adminApi";
import toast from "react-hot-toast";
import { combieImg } from "../../utils/index";
import testiPic2 from "../../images/testimonials/pic2.jpg";
import testiPic3 from "../../images/testimonials/pic3.jpg";

function CoursesDetails(props) {
  const [product, setProduct] = useState({});
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
                  <div className="clear" id="comment-list">
                    <div className="comments-area" id="comments">
                      <h4 className="comments-title">8 Comments</h4>
                      <div className="clearfix m-b20">
                        <ol className="comment-list">
                          <li className="comment">
                            <div className="comment-body">
                              <div className="comment-author vcard">
                                <img
                                  className="avatar photo"
                                  src={testiPic1}
                                  alt=""
                                />
                                <cite className="fn">John Doe</cite>
                                <span className="says">says:</span>
                              </div>
                              <div className="comment-meta">
                                <Link to="#">
                                  December 02, 2019 at 10:45 am
                                </Link>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nam vitae neque vitae sapien
                                malesuada aliquet. In viverra dictum justo in
                                vehicula. Fusce et massa eu ante ornare
                                molestie. Sed vestibulum sem felis, ac elementum
                                ligula blandit ac.
                              </p>
                              <div className="reply">
                                <Link to="#" className="comment-reply-link">
                                  Reply
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li className="comment">
                            <div className="comment-body">
                              <div className="comment-author vcard">
                                <img
                                  className="avatar photo"
                                  src={testiPic2}
                                  alt=""
                                />
                                <cite className="fn">John Doe</cite>
                                <span className="says">says:</span>
                              </div>
                              <div className="comment-meta">
                                <Link to="#">
                                  December 02, 2019 at 10:45 am
                                </Link>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nam vitae neque vitae sapien
                                malesuada aliquet. In viverra dictum justo in
                                vehicula. Fusce et massa eu ante ornare
                                molestie. Sed vestibulum sem felis, ac elementum
                                ligula blandit ac.
                              </p>
                              <div className="reply">
                                <Link to="#" className="comment-reply-link">
                                  Reply
                                </Link>
                              </div>
                            </div>
                          </li>
                          <li className="comment">
                            <div className="comment-body">
                              <div className="comment-author vcard">
                                <img
                                  className="avatar photo"
                                  src={testiPic3}
                                  alt=""
                                />
                                <cite className="fn">John Doe</cite>
                                <span className="says">says:</span>
                              </div>
                              <div className="comment-meta">
                                <Link to="#">
                                  December 02, 2019 at 10:45 am
                                </Link>
                              </div>
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nam vitae neque vitae sapien
                                malesuada aliquet. In viverra dictum justo in
                                vehicula. Fusce et massa eu ante ornare
                                molestie. Sed vestibulum sem felis ac elementum
                                ligula blandit ac.
                              </p>
                              <div className="reply">
                                <Link to="#" className="comment-reply-link">
                                  Reply
                                </Link>
                              </div>
                            </div>
                          </li>
                        </ol>
                        <div className="comment-respond" id="respond">
                          <h4 className="comment-reply-title" id="reply-title">
                            Leave a Reply{" "}
                            <small>
                              {" "}
                              <Link
                                style={{ display: "none" }}
                                to="#"
                                id="cancel-comment-reply-link"
                                rel="nofollow"
                              >
                                Cancel reply
                              </Link>{" "}
                            </small>{" "}
                          </h4>
                          <form className="comment-form">
                            <p className="comment-form-author">
                              <label htmlFor="author">
                                Name <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                value=""
                                name="Author"
                                placeholder="Author"
                                id="author"
                              />
                            </p>
                            <p className="comment-form-email">
                              <label htmlFor="email">
                                Email <span className="required">*</span>
                              </label>
                              <input
                                type="text"
                                value=""
                                placeholder="Email"
                                name="email"
                                id="email"
                              />
                            </p>
                            <p className="comment-form-url">
                              <label htmlFor="url">Website</label>
                              <input
                                type="text"
                                value=""
                                placeholder="Website"
                                name="url"
                                id="url"
                              />
                            </p>
                            <p className="comment-form-comment">
                              <label htmlFor="comment">Comment</label>
                              <textarea
                                rows="8"
                                name="comment"
                                placeholder="Comment"
                                id="comment"
                              ></textarea>
                            </p>
                            <p className="form-submit">
                              <input
                                type="submit"
                                value="Submit Comment"
                                className="submit"
                                name="submit"
                              />
                            </p>
                          </form>
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

export default CoursesDetails;
