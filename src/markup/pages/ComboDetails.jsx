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

function CoursesDetails(props) {
  const params = useParams();

  const [res, setRes] = useState({
    id: 23,
    createdDate: "2022-11-08 17:04:22.472",
    updatedDate: "2022-11-08 17:04:22.472",
    title: "test1",
    description: "description test1",
    comboPackages: [
      {
        _package: {
          id: 8,
          createdDate: "2022-11-07 19:46:29.632",
          updatedDate: "2022-11-07 19:46:29.632",
          title: "new",
          excerpt: "new",
          duration: "new",
          description: "123",
          combo: true,
          status: true,
          listPrice: 1.23123213e8,
          sale_price: 123123.0,
        },
        salePrice: 3000000.0,
      },
    ],
  });

  const { id } = params;

  useEffect(() => {
    comboApi.getComboById(id).then((res) => {
      setRes(res);
    });
  }, [id]);

  const columns = [
    {
      name: "ID",
      width: "50px",
      selector: (row) => row?._package.id,
      sortable: true,
    },
    {
      name: "Title",
      minWidth: "140px",
      width: "160px",
      maxWidth: "180px",
      selector: (row) => row?._package.title,
      sortable: true,
    },
    {
      name: "Excerpt",
      minWidth: "225px",
      width: "250px",
      maxWidth: "275px",
      selector: (row) => row?._package.excerpt,
      sortable: true,
    },
    {
      name: "duration",
      minWidth: "150px",
      width: "200px",
      maxWidth: "250px",
      selector: (row) => row?._package.duration,
      sortable: true,
    },
    {
      name: "Price",
      left: true,
      minWidth: "80px",
      width: "110px",
      maxWidth: "120px",
      selector: (row) => row?.salePrice,
      sortable: true,
    },
  ];
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
                      <del>${3000}</del>
                      <h4 className="price">${20.0}</h4>
                    </div>
                    <div className="course-buy-now text-center">
                      <Link to="#" className="btn radius-xl">
                        Buy Now {res.title}
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
                        <h2 className="post-title">{res.title}</h2>
                      </div>
                      <div className="ttr-post-text">
                        <p>{res.description}</p>
                      </div>
                    </div>
                  </div>

                  <DataTable columns={columns} data={res.comboPackages} />

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

export default CoursesDetails;
