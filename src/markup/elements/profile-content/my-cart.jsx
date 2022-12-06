import React, { Component, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { BodyCartLocal } from "../../pages/Cart";
import { TYPE_CHECKOUT_PACKAGE } from "../../../constrains/index";
import {
  removeCartCombo,
  removeCartPackage,
  resetState,
} from "../../../redux/reducers/order";
import { useHistory } from "react-router-dom";

function CartContent() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLogin } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.order);

  const [res, setRes] = useState([]);
  const [showCheckout, setShowCheckOut] = useState(false);
  const { packages, combos } = data;

  const totalPackage = [...packages].reduce((pre, x) => pre + x.salePrice, 0);
  const totalCombo = [...combos].reduce(
    (pre, x) => pre + x.comboPackages.reduce((pre, x) => pre + x.salePrice, 0),
    0
  );

  useEffect(() => {
    userApi.getCarts().then((res) => setRes(res));
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
    if (isLogin) setShowCheckOut(true);
    else history.push("/checkout", { type: TYPE_CHECKOUT_PACKAGE });
  };

  return (
    <>
      <ModalCheckOut
        show={showCheckout}
        handleClose={() => setShowCheckOut(false)}
        setRes={setRes}
      />
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
            <div>Product</div>
          </div>
          <div className="col-md-12 col-lg-2 col-sm-12 text-center">
            <div>Unit price</div>
          </div>
          <div className="col-md-12 col-lg-2 col-sm-12 text-center">
            <div>Total cost</div>
          </div>
          <div className="col-md-12 col-lg-2 col-sm-12 text-center">
            <div>Action</div>
          </div>
        </div>
        {isLogin ? (
          res.map((x, index) => {
            return (
              <React.Fragment key={x.id + " " + index}>
                {x._combo && (
                  <div key={x.id + " " + index} className="bg-white" style={{ margin: "15px 0px", borderRadius: "5px", boxShadow: "0px 5px 20px rgb(0 0 0 / 20%)" }}>
                    <div className="row bg-orange2" style={{ margin: "0px", height: "40px" }}>
                      <div style={{ margin: "auto" }} className="col-md-12 col-lg-8 col-sm-12 ">
                        {x._combo?.title}
                      </div>
                      <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold" style={{ margin: "auto" }} >
                        $
                        {x._combo.comboPackages.reduce(
                          (pre, x) => pre + x.salePrice,
                          0
                        )}
                      </div>
                      <div className="col-md-12 col-lg-2 col-sm-12 text-center" style={{ margin: "auto" }} >
                        <span
                          style={{ margin: "0 auto", cursor: "pointer" }}
                          className="badge badge-danger"
                          onClick={() => handleDelete({
                            id: x.id,
                            packageId: x._package.id,
                          })}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                    {x._combo.comboPackages.map((item, i) => {
                      return (
                        <div className="row" key={x.id} style={{ margin: "0px" }}>
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
                )}
                {x._package && (
                  <div key={x.id + " " + index} className="bg-white" style={{ margin: "15px 0px", borderRadius: "5px", boxShadow: "0px 5px 20px rgb(0 0 0 / 20%)" }}>
                    <div className="row bg-orange2" style={{ margin: "0px", height: "40px" }}> <div className="col-md-12 col-lg-8 col-sm-12"></div>
                      <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2" style={{ margin: "auto" }} >
                        ${x._package.salePrice}
                      </div>
                      <div className="col-md-12 col-lg-2 col-sm-12 text-center align-middle" style={{ margin: "auto" }} >
                        <span
                          style={{ cursor: "pointer" }}
                          className="badge badge-danger"
                          onClick={() => handleDelete({
                            id: x.id,
                            packageId: x._package.id,
                          })}
                        >
                          Remove
                        </span>
                      </div>
                    </div>
                    <div className="row" key={x.id} style={{ margin: "0px" }}>
                      <div className="col-md-12 col-lg-6 col-sm-12">
                        <div className="media align-items-center font-weight-semibold align-middle p-2">
                          <img
                            style={{ height: "50px", borderRadius: "5px", objectFit: "cover" }}
                            src={combieImg(x._package.image)}
                            className="d-block ui-w-40 ui-bordered mr-4"
                            alt=""
                            width={100}
                            onError={({ currentTarget }) => {
                              currentTarget.src =
                                "http://www.onlinecoursehow.com/wp-content/uploads/2019/05/4.jpg";
                            }}
                          />
                          <div className="media-body">
                            {x._package.title}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-2 col-sm-12 text-center font-weight-semibold align-middle p-2">
                        ${x._package.salePrice}
                      </div>
                    </div>
                  </div>
                )
                }
              </React.Fragment>
            );
          })) : <BodyCartLocal />}
        <div
          className="d-flex flex-wrap align-items-center"
          style={{ marginBottom: "15px" }}
        >
          <div className="d-flex" style={{ marginRight: "5px" }}>
            Total price:
          </div>
          <div className="text-right " style={{ marginRight: "10px" }}>
            <div className="text-large">
              <strong>${totalPackage + totalCombo}</strong>
            </div>
          </div>
          <button
            className="btn btn-ms btn-warning mt-2"
            onClick={handleCheckOut}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

const ModalCheckOut = ({ show, handleClose, setRes }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const handleCheckOut = () => {
    userApi
      .payCarts({ couponCode: code })
      .then((res) => {
        toast.success("checkout success");
        setRes((pre) => []);
        dispatch(resetState());
        handleClose();
      })
      .catch((e) => toast.error(e?.data?.message));
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="inputPassword5">coupon-Code</Form.Label>
        <Form.Control
          aria-describedby="passwordHelpBlock"
          onChange={(e) => setCode(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCheckOut}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

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
