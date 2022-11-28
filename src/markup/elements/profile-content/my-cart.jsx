import React, { Component, useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Masonry from "react-masonry-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils";
import PagingQuestion from "../PagingQuestion/PagingQuestion";
import { useSelector } from "react-redux";
import { BodyCartLoacl } from "../../pages/Cart";

function CartContent() {
  const { isLogin } = useSelector((state) => state.auth);
  const [res, setRes] = useState([]);
  const [showCheckout, setShowCheckOut] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const { totalPages } = res;

  useEffect(() => {
    userApi.getCarts({ page: pageIndex - 1 }).then((res) => setRes(res));
  }, [pageIndex]);

  const totalPrice = 0;

  console.log(res);

  return (
    <>
      <div className="profile-head">
        <ModalCheckOut
          show={showCheckout}
          handleClose={() => setShowCheckOut(false)}
          setRes={setRes}
        />
        <h5>My Cart</h5>
        <div className="feature-filters style1 ml-auto">
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
        </div>
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
                {isLogin ? (
                  res.map((x) => {
                    return (
                      <React.Fragment key={x.id}>
                        {x._combo && (
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
                                <div className="media-body">
                                  {x._combo.title}
                                </div>
                              </div>
                            </td>
                            <td className="text-right font-weight-semibold align-middle p-4">
                              $
                              {x._combo.comboPackages.reduce(
                                (pre, x) => pre + x.salePrice,
                                0
                              )}
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
                        )}
                        {x._package && (
                          <tr>
                            <td>
                              <div className="media align-items-center">
                                <img
                                  style={{ maxHeight: "50px" }}
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
                            </td>
                            <td className="text-right font-weight-semibold align-middle p-4">
                              ${x._package.salePrice}
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
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <BodyCartLoacl />
                )}
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
              <button
                className="btn btn-ms btn-warning mt-2"
                onClick={() => setShowCheckOut(true)}
              >
                Checkout
              </button>
            </div>
          </div>
        </Masonry>
      </div>
    </>
  );
}

const ModalCheckOut = ({ show, handleClose, setRes }) => {
  const [code, setCode] = useState("");
  const handleCheckOut = () => {
    userApi
      .payCarts({ couponCode: code })
      .then((res) => {
        toast.success("checkout success");
        setRes((pre) => ({ ...pre, data: [] }));
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
