import React, { useState, useEffect } from "react";
import { userApi } from "../../../api/userApi";
import { combieImg } from "../../../utils/index";
import PagingQuestion from "../PagingQuestion/PagingQuestion";
import { Button, Form, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

function MyOrderProfile() {
  const [res, setRes] = useState({
    currentPage: 0,
    data: [],
    totalItems: 0,
    totalPages: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState("");

  const [pageIndex, setPageIndex] = useState(1);
  const { totalPages } = res;

  useEffect(() => {
    userApi.getMyOrder({ page: pageIndex - 1 }).then((res) => setRes(res));
  }, [pageIndex]);

  const handleStatus = (status) => {
    if (status === 1) return "Submitted";
    if (status === 2) return "Verified";
    if (status === 3) return "Active";
    if (status === 3) return "Cancelled";
  };

  const handleCheckOut = () => {
    userApi
      .ActiveMyCourese({
        code: code,
      })
      .then((res) => {
        toast.success(res);
        setShowModal(false);
      })
      .catch((e) => toast.error(e?.data?.message));
  };
  return (
    <>
      <ModalAcctiveCourses
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleCheckOut={handleCheckOut}
        setCode={setCode}
      />
      <ToastContainer />
      <div className="profile-head">
        <h5>My Order</h5>
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
                  {item.orderPackages.map((x, index) => {
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
                              {item.status === 3 ? (
                                <button
                                  className="btn btn-success"
                                  onClick={() => setShowModal(true)}
                                >
                                  Acctice
                                </button>
                              ) : (
                                <span className="badge badge-secondary">
                                  {handleStatus(item.status)}
                                </span>
                              )}
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
                              {item.status === 3 ? (
                                <button
                                  className="btn btn-success"
                                  onClick={() => setShowModal(true)}
                                >
                                  Acctice
                                </button>
                              ) : (
                                <span className="badge badge-secondary">
                                  {handleStatus(item.status)}
                                </span>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
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

const ModalAcctiveCourses = ({
  show,
  handleClose,
  handleCheckOut,
  setCode,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Active Order</Modal.Title>
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
          acctive
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyOrderProfile;
