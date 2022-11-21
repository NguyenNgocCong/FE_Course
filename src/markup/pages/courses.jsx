import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Layout
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";

// Images
import toast from "react-hot-toast";
import { adminApi } from "../../api/adminApi";
import adv from "../../images/adv/adv.jpg";
import bannerImg from "../../images/banner/banner3.jpg";
import blogRecentPic1 from "../../images/blog/recent-blog/pic1.jpg";
import blogRecentPic3 from "../../images/blog/recent-blog/pic3.jpg";
import PagingQuestion from "../elements/PagingQuestion/PagingQuestion";

function Products() {
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setDataTable] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const getListProduct = async () => {
    try {
      const response = await adminApi.getAllPackageView(pageIndex - 1, 10);
      setDataTable(response.data);
      setTotalPages(response.totalPages)
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };
  useEffect(() => {
    getListProduct();
    // eslint-disable-next-line
  }, [pageIndex]);


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
                      <div
                        className="col-md-6 col-lg-4 col-sm-6 m-b30"
                        key={item.id}
                      >
                        <div className="cours-bx">
                          <div className="action-box">
                            <img
                              src={
                                item.sucjectCode.image ||
                                "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"
                              }
                              alt=""
                              onError={({ currentTarget }) => {
                                currentTarget.src =
                                  "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                              }}
                            />
                            <Link
                              onClick={() => {
                                window.location.href =
                                  "/react/courses-details/" + item.id;
                              }}
                              className="btn btn-warning m-2"
                            >
                              Read More
                            </Link>
                          </div>
                          <div className="info-bx">
                            <span>{item?.subject?.name}</span>
                            <h6>
                              <Link
                                onClick={() => {
                                  window.location.href =
                                    "/react/courses-details/" + item.id;
                                }}
                              >
                                {item.title}
                              </Link>
                            </h6>
                          </div>
                          <div className="cours-more-info">
                            <div className="review">
                              {/* <span> expert</span> */}
                              {/* <ul className="cours-star">
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
															</ul> */}
                              <div className="text-center">
                                {item.sucjectCode.expert.fullname}
                              </div>
                            </div>
                            <div className="price">
                              <del>${item.listPrice}</del>
                              <h5 className="fs-6">${item.salePrice}</h5>
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
                          totalPage={totalPages}
                          pageIndex={pageIndex}
                          onChange={(e) => {
                            setPageIndex(e);
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

      <Footer />
    </>
  );
}

export default Products;
