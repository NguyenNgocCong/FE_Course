import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Layout
import Footer from "../layout/footer/footer1";
import Header from "../layout/header/header1";

// Elements

// Images

function CheckOut(prop) {
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

      <section class="component">
        <div class="total">
          <h3>TOTAL</h3>
          <p>${totalPackage + totalCombo}</p>
        </div>
        <div class="credit-card">
          <h2>Credit card</h2>
          <form>
            <input className="input__checkout" type="text" placeholder="NAME" />
            <input
              className="input__checkout"
              type="text"
              placeholder="EMAIL"
            />
            <input
              className="input__checkout"
              type="text"
              placeholder="PHONE"
            />
            <input
              className="input__checkout"
              type="text"
              placeholder="COUPON"
            />

            <button type="submit" class="valid-button">
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
