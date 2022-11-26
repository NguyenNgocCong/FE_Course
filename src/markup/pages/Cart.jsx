import React, { useEffect } from "react";

// Layout
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCartReduce,
  removeCartPackage,
} from "../../redux/reducers/order";
import { combieImg } from "../../utils/index";
import { Link } from "react-router-dom";

// Elements

// Images

function Cart(prop) {
  const { data } = useSelector((state) => state.order);
  const { packages, combos } = data;

  const dispatch = useDispatch();
  const totalPackage = [...packages].reduce((pre, x) => pre + x.salePrice, 0);
  const totalCombo = [...combos].reduce((pre, x) => pre + x.salePrice, 0);

  return (
    <>
      <Header />
      <div className="container px-3 my-5 clearfix">
        <div className="card">
          <div className="card-header">
            <h2>Courses Cart</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered m-0">
                <thead>
                  <tr>
                    <th
                      className="text-center py-3 px-4"
                      style={{ maxWidth: "300px" }}
                    >
                      package Name &amp; Details
                    </th>
                    <th
                      className="text-right py-3 px-4"
                      style={{ minWidth: "100px" }}
                    >
                      listPrice
                    </th>
                    <th
                      className="text-center py-3 px-4"
                      style={{ minWidth: "120px" }}
                    >
                      Sale Price
                    </th>
                    <th
                      className="text-right py-3 px-4"
                      style={{ minWidth: "120px" }}
                    >
                      Total
                    </th>
                    <th
                      className="text-center align-middle py-3 px-0"
                      style={{ width: "40px" }}
                    >
                      <a
                        href="#/"
                        className="shop-tooltip float-none text-light"
                        title=""
                        data-original-title="Clear cart"
                      >
                        <i className="ino ion-md-trash"></i>
                      </a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[...packages].map((x) => (
                    <tr>
                      <td className="p-4">
                        <div className="media align-items-center">
                          <img
                            src={combieImg(x.image)}
                            className="d-block ui-w-40 ui-bordered mr-4"
                            alt=""
                            width={200}
                            onError={({ currentTarget }) => {
                              currentTarget.src =
                                "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                            }}
                          />
                          <div className="media-body">
                            <a href="#/" className="d-block text-dark">
                              {x.title}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="text-right font-weight-semibold align-middle p-4">
                        ${x.listPrice}
                      </td>
                      <td className="align-middle p-4">${x.salePrice}</td>
                      <td className="text-right font-weight-semibold align-middle p-4">
                        ${x.salePrice}
                      </td>
                      <td className="text-center align-middle px-0">
                        <button
                          className="shop-tooltip close float-none text-danger"
                          title=""
                          data-original-title="Remove"
                          onClick={() => dispatch(removeCartPackage(x.id))}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-wrap justify-content-between align-items-center pb-4">
              <div className="d-flex">
                <div className="text-right mt-4 mr-5"></div>
                <div className="text-right mt-4">
                  <label className="text-muted font-weight-normal m-0">
                    Total price
                  </label>
                  <div className="text-large">
                    <strong>${totalCombo + totalPackage}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="float-right">
              <Link
                to={"/"}
                type="button"
                className="btn btn-lg btn-default md-btn-flat mt-2 mr-3"
              >
                Back to shopping
              </Link>
              <Link
                role={"button"}
                to="checkout"
                type="button"
                className="btn btn-lg btn-primary mt-2"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cart;
