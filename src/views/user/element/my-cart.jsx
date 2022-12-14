import React, { Component, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { BodyCartLocal } from "./cart-local";
import { TYPE_CHECKOUT_PACKAGE } from "../../../constants/index";
import {
  removeCartCombo,
  removeCartPackage,
} from "../../../redux/reducers/order";
import { useHistory } from "react-router-dom";

function CartContent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLogin } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.order);

  const [res, setRes] = useState([]);
  const { packages, combos } = data;

  const totalPackage = [...packages].reduce((pre, x) => pre + x.salePrice, 0);
  const totalCombo = [...combos].reduce(
    (pre, x) => pre + x.comboPackages.reduce((pre, x) => pre + x.salePrice, 0),
    0
  );

  useEffect(() => {
    userApi.getCarts().then((ress) => setRes(ress));
  }, []);

  const handleDelete = (params) => {
    userApi
      .removeCart({ ...params })
      .then((res) => {
        if (params.packageId) dispatch(removeCartPackage(params.packageId));
        if (params.comboId) dispatch(removeCartCombo(params.comboId));
        toast.success(res.message);
        userApi.getCarts().then((res) => setRes(res));
      })
      .catch((e) => toast.error(e?.data?.message));
  };

  const handleCheckOut = () => {
     history.push("/checkout", { type: TYPE_CHECKOUT_PACKAGE });
  };

  return (
    <>
      {/* <div className="profile-head">

        <h5>My Cart</h5>
        <div className="feature-filters style1 ml-auto"> */}
      {/* <ul className="filters" data-toggle="buttons">
            <FilterList
              dataFilter="All"
              defaultTag={setTag}
              activeFilter={tag === "all" ? true : false}
            />
            <FilterList
              dataFilter="Combo"
              defaultTag={setTag}
              activeFilter={tag === "combo" ? true : false}
            />
            <FilterList
              dataFilter="Courses"
              defaultTag={setTag}
              activeFilter={tag === "courses" ? true : false}
            />
          </ul> */}
      {/* </div>
      </div> */}
      <div className="courses-filter bg-gray" style={{ padding: "5px" }}>
        <div className="row align-items-center bg-orange" style={{ margin: "0px", height: "50px" }}>
          <div className="col-md-12 col-lg-6 col-sm-12 text-center">
            <div>Sản Phẩm</div>
          </div>
          <div className="col-md-12 col-lg-2 col-sm-12 text-center">
            <div>Đơn giá</div>
          </div>
          <div className="col-md-12 col-lg-2 col-sm-12 text-center">
            <div>Thành tiền</div>
          </div>
          <div className="col-md-12 col-lg-2 col-sm-12 text-center">
            <div>Hành động</div>
          </div>
        </div>
        {<BodyCartLocal />}
        <div
          className="d-flex flex-wrap align-items-center"
          style={{ marginBottom: "15px" }}
        >
          <div className="d-flex" style={{ marginRight: "5px" }}>
            Tống tiền:
          </div>
          <div className="text-right " style={{ marginRight: "10px" }}>
            <div className="text-large">
              <strong>{totalPackage + totalCombo} ₫</strong>
            </div>
          </div>
          <button
            className="btn btn-ms btn-warning mt-2"
            onClick={handleCheckOut}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </>
  );
}

class Cart extends Component {
  render() {
    return (
      <>
        <CartContent />
      </>
    );
  }
}

export default Cart;
