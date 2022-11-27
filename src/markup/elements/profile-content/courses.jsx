import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils/index";
import PagingQuestion from "../PagingQuestion/PagingQuestion";

function CoursesContent() {
  const [res, setRes] = useState({
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
  });
  const [pageIndex, setPageIndex] = useState(1);
  const { totalPages } = res;

  useEffect(() => {
    userApi.getCarts({ page: pageIndex - 1 }).then((res) => setRes(res));
  }, [pageIndex]);

  console.log(res);
  return (
    <>
      <div className="profile-head">
        <h5>My Cart</h5>
      </div>

      <div className="courses-filter">
        <Masonry>
          <ul className="ttr-gallery-listing magnific-image row">
            {res.data.map((item, index) => (
              <li
                className="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6"
                key={index}
              >
                <div className="cours-bx">
                  <div className="action-box">
                    <img
                      src={
                        item?.image != null && item?.image
                          ? combieImg(item.image)
                          : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"
                      }
                      alt=""
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                      }}
                    />
                    <div
                      onClick={() => {
                        window.location.href =
                          "/react/courses-details/" + item.id;
                      }}
                      className="btn btn-warning m-2"
                    >
                      Read More
                    </div>
                  </div>
                  <div className="info-bx">
                    <h5>
                      <div
                        onClick={() => {
                          window.location.href =
                            "/react/courses-details/" + item.id;
                        }}
                      >
                        {item.title}
                      </div>
                    </h5>
                    <div>
                      <i className="fa fa-user"></i>{" "}
                      {item?.sucjectCode?.expert?.user?.fullname}
                    </div>
                    <div>
                      <i className="fa fa-eye"></i> {item?.views}
                    </div>
                  </div>
                  <div className="cours-more-info">
                    <div className="price">
                      <del>${item.listPrice}</del>
                      <h5 className="fs-6">${item.salePrice}</h5>
                    </div>
                    <div className="review">
                      {/* <span> expert</span> */}
                      {/* <ul className="cours-star">
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li className="active"><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
																<li><i className="fa fa-star"></i></li>
															</ul> */}
                      <div
                        className="btn btn-warning"
                        onClick={() => {
                          window.location.href =
                            "/react/courses-details/" + item.id;
                        }}
                      >
                        <i className="fa fa-eye"></i>Details
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="d-flex  justify-content-between align-items-center m-2">
            <PagingQuestion
              totalPage={totalPages}
              pageIndex={pageIndex}
              onChange={(e) => {
                setPageIndex(e);
              }}
            ></PagingQuestion>

            <button className="btn btn-primary">checkout</button>
          </div>
        </Masonry>
      </div>
    </>
  );
}

class Courses extends Component {
  render() {
    return (
      <>
        <CoursesContent />
      </>
    );
  }
}

export default Courses;
