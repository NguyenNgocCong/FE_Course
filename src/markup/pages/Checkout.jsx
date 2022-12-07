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
import { CForm, CFormInput } from "@coreui/react";
function CheckOut(prop) {
  const { data } = useSelector((state) => state.order);
  const { isLogin } = useSelector((state) => state.auth);
  const { packages, combos } = data;
  const location = useLocation();
  const history = useHistory();
  const [codeCoupon, setCodeCoupon] = useState("");
  const [codeCouponCheck, setCodeCouponCheck] = useState("");
  const [validated, setValidated] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });
  if (!location.state) {
    history.push("/");
  }
  const dispatch = useDispatch();
  const totalPackage = [...packages].reduce((pre, x) => pre + x.salePrice, 0);
  const totalCombo = [...combos].reduce(
    (pre, x) => pre + x.comboPackages.reduce((pre, x) => pre + x.salePrice, 0),
    0
  );

  const handleAddCoupon = (e) => {
    if (codeCouponCheck) {
      userApi.checkCoupon(codeCouponCheck).then((res) => {
        setCodeCoupon(res.code);
        const totalCost = location.state.type === TYPE_CHECKOUT_PACKAGE ? (location.state.type === TYPE_CHECKOUT_PACKAGE) : location.state.class.packages.salePrice
        setDiscount(res.discountRate ? totalCost * res.discountRate / 100 : 0);
      })
        .catch((e) => toast.error(e?.data?.message));
    }
  }

  const handleCheckout = async (event) => {
    try {
      const form = event.currentTarget
      setValidated(true)
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity() || isLogin) {
        const { type } = location.state;
        if (type === TYPE_CHECKOUT_PACKAGE)
          if (isLogin) {
            userApi
              .payCarts({ couponCode: codeCoupon })
              .then((res) => {
                toast.success("checkout success");
                dispatch(resetState());
                setTimeout(() => {
                  history.replace("/");
                }, 1000);
              })
              .catch((e) => toast.error(e?.data?.message));
          } else {
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
          }
        else if (type === TYPE_CHECKOUT_CLASS) {
          userApi
            .orderClass({
              ...info,
              codeCoupon,
              classId: location.state.class.id,
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
      }
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };
  return (
    <>
      <Header />

      <div className="container p-4">
        <CForm
          onSubmit={handleCheckout}
          className="row g-3 needs-validation"
          noValidate
          validated={validated}
        >
          <h5 style={{ fontWeight: "bold", margin: "20px 0px" }}>Pay (* is required)</h5>
          <div className="row">
            <div className="col-md-8">
              {isLogin ? <></> : <>
                <h6 style={{ fontWeight: "bold", margin: "20px 0px" }}>1. Personal information</h6>
                <div className="border_checkout">
                  <div className="row">
                    <div className="col-md-4" >
                      <CFormInput
                        className="input__checkout "
                        type="text"
                        placeholder="Full name *"
                        required
                        onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
                        feedbackInvalid="Please enter full name!"
                        />
                    </div>
                    <div className="col-md-4">
                      <CFormInput
                        className="input__checkout"
                        type="text"
                        placeholder="Email *"
                        feedbackInvalid="Please enter email!"
                        required
                        onChange={(e) => setInfo({ ...info, email: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4">
                      <CFormInput
                        className="input__checkout"
                        type="text"
                        required
                        placeholder="phone *"
                        feedbackInvalid="Please enter phone number!"
                        onChange={(e) => setInfo({ ...info, mobile: e.target.value })}
                      />
                    </div>
                  </div>
                </div></>
              }
              <h6 style={{ fontWeight: "bold", margin: "20px 0px" }}>{isLogin ? "1." : "2."} Billing information</h6>
              <div className="border_checkout">
                <div style={{fontWeight: "bold" }}>
                  <i className="fa fa-user"></i> Account holder: Nguyen Van Hung
                </div>
                <div style={{fontWeight: "bold" }}>
                  <i className="fa fa-address-card"></i> Account holder: 0586986918888
                </div>
                <div style={{fontWeight: "bold" }}>
                  <i className="fa fa-bank"></i> Bank: Ngân hàng quân đội MBbank
                </div>
                <div>
                  {"Transfer content: Tuition payment - <Course> - <Full name> - <Phone number>"}
                </div>
                <div>
                  Course information will be sent to your wrong email when LRS Education checks your account and confirms payment successfully. Thank you!
                </div>
                <div>
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    Note: You can pay by direct payment at LRS Education facilities
                  </div>
                  <div className="border_checkout">
                    <div>
                      <i className="ti-location-pin"></i> Facility 1: Keangnam Building - Pham Hung - Tu Liem - Hanoi.
                    </div>
                    <div>
                      <i className="ti-location-pin"></i> Facility 2: Intracom Building, lane 82, Dich Vong Hau - Duy Tan - Cau Giay - Hanoi.
                    </div>
                    <div>
                      Working time is from 9:00 to 18:00 from Monday to Friday every week.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border_checkout" style={{ marginTop: "60px" }}>
                <h6>Product</h6>
                {location.state.type === TYPE_CHECKOUT_PACKAGE && (
                  [...packages].map((item) => {
                    return (
                      <div className="row product_checkout">
                        <div className="col-md-9" style={{ fontWeight: "bold" }}>
                          {item.title}
                        </div>
                        <div className="col-md-3 d-flex justify-content-end" >
                          <div>${item.salePrice}</div>
                        </div>
                      </div>)
                  })
                )}
                {location.state.type === TYPE_CHECKOUT_PACKAGE && (
                  [...combos].map((item) => {
                    return (
                      <div className="row product_checkout">
                        <div className="col-md-9" style={{ fontWeight: "bold" }}>
                          {item.title}
                        </div>
                        <div className="col-md-3 d-flex justify-content-end" >
                          $
                          {item.comboPackages.reduce(
                            (total, x) => total + x.salePrice,
                            0
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
                {location.state.type !== TYPE_CHECKOUT_PACKAGE && (
                  <div className="row product_checkout" style={{ fontWeight: "bold" }}>
                    <div className="col-md-9" >
                      <div>{location.state.class.packages.title}</div>
                    </div>
                    <div className="col-md-3 d-flex justify-content-end" >
                      <div>${location.state.class.packages.salePrice}</div>
                    </div>
                  </div>
                )}
                <div className="row product_checkout">
                  <div className="col-md-9">
                    <h6>Provisional</h6>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    {location.state.type === TYPE_CHECKOUT_PACKAGE ? (
                      <p>${totalPackage + totalCombo}</p>
                    ) : (<p>${location.state.class.packages.salePrice}</p>)}
                  </div>
                </div>
                <div className="row product_checkout">
                  <div className="col-md-9">
                    <input
                      className="input__checkout"
                      type="text"
                      placeholder="Coupon code"
                      onChange={(e) => setCodeCouponCheck(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <button
                      className="btn btn-ms btn-warning"
                      type="button"
                      style={{ height: "25px", padding: "0px 15px", fontSize: "14px", margin: "auto 0" }}
                      onClick={() => handleAddCoupon()}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="row product_checkout">
                  <div className="col-md-9">
                    <h6>Discount</h6>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end">
                    <p>${discount}</p>
                  </div>
                </div>
                <div className="row product_checkout">
                  <div className="col-md-9">
                    <h6>Provisional</h6>
                  </div>
                  <div className="col-md-3 d-flex justify-content-end" style={{ color: "red", fontWeight:"bold" }} >
                    {location.state.type === TYPE_CHECKOUT_PACKAGE ? (
                      <p>${totalPackage + totalCombo - discount}</p>
                    ) : (<p>${location.state.class.packages.salePrice - discount}</p>)}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-ms btn-warning mt-2"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </CForm>
      </div>
      <Footer />
    </>
  );
}

export default CheckOut;
