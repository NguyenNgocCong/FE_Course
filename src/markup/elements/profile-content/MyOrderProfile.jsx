import React, { Component, useState, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils/index";
import PagingQuestion from "../PagingQuestion/PagingQuestion";
import { useSelector } from "react-redux";

function MyOrderProfile() {
  const [res, setRes] = useState({
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
  });

  const [pageIndex, setPageIndex] = useState(1);
  const { totalPages } = res;

  useEffect(() => {
    userApi.getMyOrder({ page: pageIndex - 1 }).then((res) => setRes(res));
  }, [pageIndex]);

  return (
    <>
      <div className="profile-head">
        <h5>My Order</h5>
      </div>

      <div className="courses-filter">
        <ul className="ttr-gallery-listing magnific-image row">
          {res.data.map((item, i) => (
            <React.Fragment key={i}>
              {item.orderPackages.map((x, index) => (
                <li
                  className="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6"
                  key={index + i}
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
                              "/react/courses-details/" + x._package.id;
                          }}
                        >
                          {x._package.title}
                        </div>
                      </h5>
                    </div>
                    <div className="cours-more-info">
                      <div className="price">
                        <del>${x._package.listPrice}</del>
                        <h5 className="fs-6">${x._package.salePrice}</h5>
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
                        <div className="btn btn-success text-white">
                          status: {item.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </React.Fragment>
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
        </div>
      </div>
    </>
  );
}

export default MyOrderProfile;
