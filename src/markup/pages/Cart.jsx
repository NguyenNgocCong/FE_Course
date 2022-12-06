import React from "react";

// Layout
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeCartCombo, removeCartPackage } from "../../redux/reducers/order";
import { combieImg } from "../../utils/index";
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";

// Elements

// Images

function Cart(prop) {
  const { data } = useSelector((state) => state.order);
  const { packages, combos } = data;

  const dispatch = useDispatch();
  const totalPackage = [...packages].reduce((pre, x) => pre + x.salePrice, 0);
  const totalCombo = [...combos].reduce(
    (pre, x) => pre + x.comboPackages.reduce((pre, x) => pre + x.salePrice, 0),
    0
  );

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
                  {[...packages].map((x, index) => (
                    <tr key={index}>
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
                  {[...combos].map((x, index) => (
                    <tr key={index}>
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
                        $
                        {x.comboPackages.reduce(
                          (pre, x) => pre + x.salePrice,
                          0
                        )}
                      </td>
                      <td className="align-middle p-4">
                        $
                        {x.comboPackages.reduce(
                          (pre, x) => pre + x.salePrice,
                          0
                        )}
                      </td>
                      <td className="text-right font-weight-semibold align-middle p-4">
                        $
                        {x.comboPackages.reduce(
                          (pre, x) => pre + x.salePrice,
                          0
                        )}
                      </td>
                      <td className="text-center align-middle px-0">
                        <button
                          className="shop-tooltip close float-none text-danger"
                          title=""
                          data-original-title="Remove"
                          onClick={() => dispatch(removeCartCombo(x.id))}
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

export const BodyCartLocal = () => {
  const { data } = useSelector((state) => state.order);
  const { packages, combos } = data;

  const dispatch = useDispatch();

  return (
    <>
      {[...packages].map((x, index) => (
        <div key={x.id + " " + index} className="bg-white" style={{ margin: "15px 0px", borderRadius: "5px", boxShadow: "0px 5px 20px rgb(0 0 0 / 20%)" }}>
          <div className="row bg-orange2" style={{ margin: "0px", height: "40px" }}> <div className="col-md-12 col-lg-8 col-sm-12"></div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2" style={{ margin: "auto" }} >
              ${x.salePrice}
            </div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center align-middle" style={{ margin: "auto" }} >
              <span
                style={{ cursor: "pointer" }}
                className="badge badge-danger"
                onClick={() => dispatch(removeCartPackage(x.id))}
              >
                Remove
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-6 col-sm-12">
              <div className="media align-items-center font-weight-semibold align-middle p-2">
                <img
                  style={{ height: "50px", borderRadius: "5px", objectFit: "cover" }}
                  src={combieImg(x.image)}
                  className="d-block ui-w-40 ui-bordered mr-4"
                  alt=""
                  width={100}
                  onError={({ currentTarget }) => {
                    currentTarget.src =
                      "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                  }}
                />
                <div className="media-body">
                  {x.title}
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2">
              ${x.salePrice}
            </div>
          </div>
        </div>
      ))}
      {[...combos].map((x, index) => (
        <div key={x.id + " " + index} className="bg-white" style={{ margin: "15px 0px", borderRadius: "5px", boxShadow: "0px 5px 20px rgb(0 0 0 / 20%)" }}>
          <div className="row bg-orange2" style={{ margin: "0px", height: "40px" }}>
            <div style={{ margin: "auto" }} className="col-md-12 col-lg-8 col-sm-12 ">
              {x?.title}</div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold" style={{ margin: "auto" }} >
              $
              {x.comboPackages.reduce(
                (pre, x) => pre + x.salePrice,
                0
              )}
            </div>
            <div className="col-md-12 col-lg-2 col-sm-12 text-center" style={{ margin: "auto" }} >
              <span
                style={{ margin: "0 auto", cursor: "pointer" }}
                className="badge badge-danger"
                onClick={() => dispatch(removeCartCombo(x.id))}
              >
                Remove
              </span>
            </div>
          </div>
          {x.comboPackages.map((item, i) => {
            return (
              <div className="row" key={item.id}>
                <div className="col-md-12 col-lg-6 col-sm-12 ">
                  <div className="media align-items-center font-weight-semibold align-middle p-2">
                    <img
                      style={{ height: "50px", borderRadius: "5px", objectFit: "cover" }}
                      src={combieImg(item?._package?.image)}
                      className="d-block ui-w-40 ui-bordered mr-4"
                      alt=""
                      width={100}
                      onError={({ currentTarget }) => {
                        currentTarget.src =
                          "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                      }}
                    />
                    <div className="media-body ">
                      {item?._package?.title}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2">
                  ${item._package.salePrice}
                </div>
              </div>
            )
          }
          )}
        </div>
      ))}
    </>
  );
};

export default Cart;
