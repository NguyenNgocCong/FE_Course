import React, { Component, useState, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils/index";
import PagingQuestion from "../PagingQuestion/PagingQuestion";
import { useSelector } from "react-redux";

function MyClass() {
  const [res, setRes] = useState({
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
  });

  const [pageIndex, setPageIndex] = useState(1);
  const { totalPages, data } = res;

  useEffect(() => {
    userApi.getMyClass({ page: pageIndex - 1 }).then((res) => setRes(res));
  }, [pageIndex]);

  return (
    <>
      <div className="profile-head">
        <h5>My Class</h5>
      </div>

      <div className="courses-filter">
        <ul className="ttr-gallery-listing magnific-image row">
          {data.map((item, index) => (
            <div className="col-md-6 col-lg-4 col-sm-6 m-b30" key={index}>
              <div className="cours-bx">
                <div className="action-box">
                  <img
                    src={
                      item?.packages?.image != null && item?.packages?.image
                        ? combieImg(item?.packages?.image)
                        : "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg"
                    }
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.src =
                        "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                    }}
                  />
                  <Link
                    to={`/class/${item.id}`}
                    className="btn m-3 btn-warning"
                  >
                    Read More
                  </Link>
                </div>
                <div className="info-bx">
                  <h5>{item.packages.title}</h5>
                  <div>
                    <i className="fa fa-calendar"></i>{" "}
                    {new Date(item?.dateStart).toLocaleDateString()}
                  </div>
                  <div>
                    <i className="fa fa-clock-o"></i>{" "}
                    {new Date(item?.dateFrom).toLocaleDateString()} -{" "}
                    {new Date(item?.dateTo).toLocaleDateString()}
                  </div>
                  <div>
                    <i className="fa fa-location-arrow"></i>{" "}
                    {item?.branch?.setting_title
                      ? item?.branch?.setting_title
                      : "Online"}
                  </div>
                  <div>
                    <i className="fa fa-user"></i>{" "}
                    {item?.trainer?.user?.fullname}
                  </div>
                </div>
              </div>
            </div>
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

export default MyClass;
