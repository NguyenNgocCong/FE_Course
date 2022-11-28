import React, { Component, useState, useEffect, useId } from "react";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils/index";
import PagingQuestion from "../PagingQuestion/PagingQuestion";
import { useSelector } from "react-redux";

function MyCourses() {
  const [res, setRes] = useState({
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
  });

  const [pageIndex, setPageIndex] = useState(1);
  const { totalPages } = res;

  useEffect(() => {
    userApi.getMyCourese({ page: pageIndex - 1 }).then((res) => setRes(res));
  }, [pageIndex]);

  return (
    <>
      <div className="profile-head">
        <h5>My Courses</h5>
      </div>

      <div className="courses-filter">
        <div className="table-responsive">
          <table className="table-bordered">
            <thead>
              <tr>
                <th
                  className="text-center py-3 px-4"
                  style={{ maxWidth: "400px" }}
                >
                  package Name &amp; Details
                </th>
                <th
                  className="text-center py-3 px-4"
                  style={{ minWidth: "100px" }}
                >
                  Price
                </th>
                <th
                  className="text-center align-middle py-3 px-0 px-4"
                  style={{ width: "40px" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {res.data.map((item, i) => (
                <React.Fragment key={i}>
                  <tr>
                    <td>
                      <div className="media align-items-center">
                        <img
                          style={{ maxHeight: "50px" }}
                          src={combieImg(item.apackage.image)}
                          className="d-block ui-w-40 ui-bordered mr-4"
                          alt=""
                          width={100}
                          onError={({ currentTarget }) => {
                            currentTarget.src =
                              "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                          }}
                        />
                        <div className="media-body">{item.apackage.title}</div>
                      </div>
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      ${item.apackage.salePrice}
                    </td>
                    <td className="text-center align-middle px-0"></td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
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

export default MyCourses;
