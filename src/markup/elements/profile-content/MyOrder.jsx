import React, { Component, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Masonry from "react-masonry-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils";
import PagingQuestion from "../PagingQuestion/PagingQuestion";

function MyOrder() {
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

  const totalPrice = res.data.reduce((pre, x) => pre + x.salePrice, 0);

  console.log(res);

  return (
    <>
      <div className="profile-head">
        <h5>My Order</h5>
        <div className="feature-filters style1 ml-auto"></div>
      </div>
      <div className="courses-filter">
        <Masonry>
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
                {res.data.map((x) => (
                  <tr>
                    <td>
                      <div className="media align-items-center">
                        <img
                          style={{ maxHeight: "50px" }}
                          src={combieImg(x.image)}
                          className="d-block ui-w-40 ui-bordered mr-4"
                          alt=""
                          width={100}
                          onError={({ currentTarget }) => {
                            currentTarget.src =
                              "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                          }}
                        />
                        <div className="media-body">{x.title}</div>
                      </div>
                    </td>
                    <td className="text-right font-weight-semibold align-middle p-4">
                      ${x.salePrice}
                    </td>
                    <td className="text-center align-middle px-0">
                      <button
                        className="shop-tooltip close float-none text-danger"
                        title=""
                        data-original-title="Remove"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="d-flex flex-wrap align-items-center float-right"
              style={{ marginBottom: "15px" }}
            >
              <div className="d-flex" style={{ marginRight: "5px" }}>
                Total price:
              </div>
              <div className="text-right " style={{ marginRight: "10px" }}>
                <div className="text-large">
                  <strong>${totalPrice}</strong>
                </div>
              </div>
              <button className="btn btn-ms btn-warning mt-2">Checkout</button>
            </div>
            <PagingQuestion
              totalPage={totalPages}
              pageIndex={pageIndex}
              onChange={(e) => {
                setPageIndex(e);
              }}
            ></PagingQuestion>
          </div>
        </Masonry>
      </div>
    </>
  );
}

export default MyOrder;
