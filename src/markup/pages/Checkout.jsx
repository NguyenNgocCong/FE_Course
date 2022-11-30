import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Layout
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";
import { useHistory, useLocation } from "react-router-dom";
import { userApi } from "../../api/userApi";
import {
  TYPE_CHECKOUT_CLASS,
  TYPE_CHECKOUT_PACKAGE,
} from "../../constrains/index";
import { toast } from "react-toastify";
import { resetState } from "../../redux/reducers/order";
function CheckOut(prop) {
  const { data } = useSelector((state) => state.order);

  const { packages, combos } = data;
 const location = useLocation();
  const history = useHistory();
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  const [codeCoupon, setCodeCoupon] = useState("");
  if (!location.state) {
    history.push("/");
  }

  const dispatch = useDispatch();
  const totalPackage = [...packages].reduce((pre, x) => pre + x.salePrice, 0);
  const totalCombo = [...combos].reduce(
    (pre, x) => pre + x.comboPackages.reduce((pre, x) => pre + x.salePrice, 0),
    0
  );

  const handleCheckout = (e) => {
    e.preventDefault();
    const { type } = location.state;

    if (Object.keys(info).some((x) => !info[x])) {
      toast.info("validate form");
    } else if (type === TYPE_CHECKOUT_PACKAGE)
      userApi
        .orderClass({
          ...info,
          packages: [...packages].map((x) => x.id),
          combos: [...combos].map((x) => x.id),
          codeCoupon,
        })
        .then((res) => {
          toast.success(res.message);
          dispatch(resetState());
          setTimeout(() => {
            history.replace("/");
          }, 1000);
        })
        .catch((e) => toast.error(e?.data?.message));
    else if (type === TYPE_CHECKOUT_CLASS) {
      userApi
        .orderClass({
          ...info,
          codeCoupon,
          classId: location.state.classId,
        })
        .then((res) => {
          toast.success(res.message);
          dispatch(resetState());
          setTimeout(() => {
            history.replace("/");
          }, 1000);
        })
        .catch((e) => toast.error(e?.data?.message));
    }
  };
  return (
    <>
      <Header />

      <section className="component">
        {location.state.type === TYPE_CHECKOUT_PACKAGE && (
          <div className="total">
            <h3>TOTAL</h3>
            <p>${totalPackage + totalCombo}</p>
          </div>
        )}
        <div className="credit-card">
          <h2>Checkout</h2>
          <form>
            <input
              className="input__checkout"
              type="text"
              placeholder="NAME"
              onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
            />
            <input
              className="input__checkout"
              type="text"
              placeholder="EMAIL"
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <input
              className="input__checkout"
              type="text"
              placeholder="PHONE"
              onChange={(e) => setInfo({ ...info, mobile: e.target.value })}
            />
            <input
              className="input__checkout"
              type="text"
              placeholder="COUPON"
              onChange={(e) => setCodeCoupon(e.target.value)}
            />

            <button
              type="submit"
              className="valid-button"
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CheckOut;
