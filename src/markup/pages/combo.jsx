import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Layout
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";

// Images
import { comboApi } from "../../api/comboApi";
import bannerImg from "../../images/banner/banner3.jpg";
import PagingQuestion from "../elements/PagingQuestion/PagingQuestion";
import { combieImg } from "../../utils";
import ProductAside from "../elements/product-aside";

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
                  <ProductAside></ProductAside>
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
                              src={(item.comboPackages[0]?._package.image != null && item.comboPackages[0]?._package.image) ? combieImg(item.comboPackages[0]?._package.image) : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"}
                              alt={item.title}
                              onError={({ currentTarget }) => {
                                currentTarget.src =
                                  "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                              }}
                            />
                            <Link
                              to={`/combo/${item.id}`}
                              className="btn btn-warning m-3"
                            >
                              Read More
                            </Link>
                          </div>
                          <div className="info-bx">
                            <h5>{item.title}</h5>
                            <div>
                              <i className="fa fa-dropbox"></i>{" "}
                              {item?.comboPackages?.length}
                            </div>
                          </div>
                          <div className="cours-more-info">
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
                                  (total, x) => total + x._package.salePrice,
                                  0
                                )}
                              </h5>
                            </div>
                            <div className="review">
                              {/* <ul className="cours-star">
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
															</ul> */}
                              <div className="btn btn-warning">
                                <i className="fa fa-cart-plus"></i> Add to cart
                              </div>
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
            salePrice: 1800000.0,
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
            salePrice: 4500000.0,
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
