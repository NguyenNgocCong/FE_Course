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

function Combos() {
  const [res, setRes] = useState(comboEx);

  const [page, setPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line
    comboApi.getAllCombo(page - 1).then((res) => {
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
                      <div
                        className="col-md-6 col-lg-4 col-sm-6 m-b30"
                        key={item.id}
                      >
                        <div className="cours-bx">
                          <div className="action-box">
                            <img
                              src={
                                "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"
                              }
                              alt=""
                            />
                            <Link
                              to={`/combo/${item.id}`}
                              className="btn btn-warning m-3"
                            >
                              Read More
                            </Link>
                          </div>
                          <div className="info-bx">
                            <span>{item.title}</span>
                            <h6></h6>
                          </div>
                          <div className="cours-more-info">
                            <div className="review">
                              <span> packages</span>
                              {/* <ul className="cours-star">
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
															</ul> */}
                              <div>{item.comboPackages.length}</div>
                            </div>
                            <div className="price">
                              <del>
                                $
                                {item.comboPackages.reduce(
                                  (total, x) => total + x._package.listPrice,
                                  0
                                )}
                              </del>
                              <h5>
                                $
                                {item.comboPackages.reduce(
                                  (total, x) => total + x._package.sale_price,
                                  0
                                )}
                              </h5>
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

const comboEx = {
  totalItems: 1,
  data: [
    {
      id: 1,
      createdDate: "2022-11-20 19:49:15.144",
      updatedDate: "2022-11-20 19:49:15.144",
      title: "Combo khóa học lập trình Java Spring và reactJS",
      description: "",
      comboPackages: [
        {
          id: 1,
          createdDate: "2022-11-20 19:49:15.163",
          updatedDate: "2022-11-20 19:49:15.163",
          _package: {
            id: 1,
            createdDate: "2022-11-20 19:16:55.948",
            updatedDate: "2022-11-20 19:16:55.948",
            title: "khóa học spring MVC cơ bản",
            excerpt: "",
            duration: "60",
            description: "",
            status: true,
            listPrice: 3000000.0,
            sale_price: 1800000.0,
          },
          salePrice: 1500000.0,
        },
        {
          id: 2,
          createdDate: "2022-11-20 19:49:15.17",
          updatedDate: "2022-11-20 19:49:15.17",
          _package: {
            id: 2,
            createdDate: "2022-11-20 19:35:50.669",
            updatedDate: "2022-11-20 19:35:50.669",
            title: "khóa học reactjs cơ bản",
            excerpt:
              "Khoá học sử dụng ReactJs căn bản cho các bạn mới bắt đầu làm nền tảng cho khoá học React Native từ FPT education",
            duration: "50",
            description: "",
            status: true,
            listPrice: 6000000.0,
            sale_price: 4500000.0,
          },
          salePrice: 4000000.0,
        },
      ],
    },
  ],
  totalPages: 1,
  currentPage: 0,
};

export default Combos;
