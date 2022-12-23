import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../component";

function RegistrationDetail(props) {
  const [detailOrder, setDetailOrder] = useState();
  const [classId, setClassId] = useState();
  const [listClasses, setListClasses] = useState([]);
  const [codeCouponCheck, setCodeCouponCheck] = useState();
  const [codeCoupon, setCodeCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(1);
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [fullName, setFullName] = useState("");
  const [calander, setCalander] = useState("");
  const [packages, setPackage] = useState("");
  const [expert, setExpert] = useState("");
  const [supporter, setSupporter] = useState("");
  const [startDate, setStartDate] = useState("");
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.substring(
    "/admin/registration/".length,
    location.pathname.length,
  );
  const type = id !== "create" ? 1 : 0;

  useEffect(() => {
    const classDetail = listClasses[listClasses.findIndex(element => Number(element.id) === Number(classId ? classId : detailOrder?.aclass?.id))]
    if (classDetail) {
      setCalander(classDetail?.time && classDetail?.schedule ? classDetail?.time + " các ngày " + classDetail?.schedule : "Chưa được đặt");
      setPackage(classDetail?.packages?.title);
<<<<<<< HEAD
      setPrice(classDetail?.packages?.salePrice)
=======
>>>>>>> 816b9a2159b3521d6a3bf8c50aeebf0d2f8a7ec3
      setExpert(classDetail?.trainer?.user?.fullname);
      setSupporter(classDetail?.supporter?.fullname);
      setStartDate(moment(classDetail?.dateFrom).format('DD/mm/yyyy') + " - " + moment(classDetail?.dateTo).format('DD/mm/yyyy'));
    }
    // eslint-disable-next-line
<<<<<<< HEAD
  }, [classId, detailOrder, listClasses])
=======
  }, [detailOrder, listClasses])
>>>>>>> 816b9a2159b3521d6a3bf8c50aeebf0d2f8a7ec3

  useEffect(() => {
    if (detailOrder?.totalCost) {
      setPrice(detailOrder?.totalCost + detailOrder?.totalDiscount)
      setDiscount(detailOrder?.totalDiscount)
<<<<<<< HEAD
      setCodeCouponCheck(detailOrder?.coupon?.code)
=======
>>>>>>> 816b9a2159b3521d6a3bf8c50aeebf0d2f8a7ec3
    }
    // eslint-disable-next-line
  }, [detailOrder])

  useEffect(() => {
<<<<<<< HEAD
    handleCheckCoupon()
=======
    const classDetail = listClasses[listClasses.findIndex(element => Number(element.id) === Number(classId))]
    if (classDetail) {
      setCalander(classDetail?.time && classDetail?.schedule ? classDetail?.time + " các ngày " + classDetail?.schedule : "Chưa được đặt");
      setPackage(classDetail?.packages?.title);
      setExpert(classDetail?.trainer?.user?.fullname);
      setPrice(classDetail?.packages?.salePrice);
      setSupporter(classDetail?.supporter?.fullname);
      setStartDate(moment(classDetail?.dateFrom).format('DD/mm/yyyy') + " - " + moment(classDetail?.dateTo).format('DD/mm/yyyy'));
      handleCheckCoupon()
    }
>>>>>>> 816b9a2159b3521d6a3bf8c50aeebf0d2f8a7ec3
    // eslint-disable-next-line
  }, [classId])

  const getOrderDetailById = async () => {
    try {
      const response = await adminApi.getOrderDetail(id);
      setDetailOrder(response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const getListPackage = async () => {
    try {
      const response = await adminApi.getAllClass(0, 50, "", 0, true);
      setListClasses(response.data);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget
      setValidated(true)
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity()) {
        const params = {
          classId: classId,
          status: status,
          email: email,
          fullName: fullName,
          mobile: phone,
          note: note,
          codeCoupon: codeCoupon,
        };
        const response =
          type === 1
            ? await adminApi.updateOrderAdmin(params, id)
            : await adminApi.createOrderAdmin(params);
        toast.success(response?.message, {
          duration: 2000,
        });
        history.push("/admin/orders");
      }
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (type === 1) {
      getOrderDetailById();
    }
    getListPackage();
    // eslint-disable-next-line
  }, []);

  const handleCheckCoupon = () => {
<<<<<<< HEAD
    if (codeCouponCheck && classId) {
      adminApi.checkCoupon(codeCouponCheck).then((res) => {
=======
    if ((codeCouponCheck || detailOrder?.coupon?.code) && classId) {
      adminApi.checkCoupon(codeCouponCheck ? codeCouponCheck : detailOrder?.coupon?.code).then((res) => {
>>>>>>> 816b9a2159b3521d6a3bf8c50aeebf0d2f8a7ec3
        setCodeCoupon(res.code);
        setDiscount(res.discountRate ? price * res.discountRate / 100 : 0);
      })
        .catch((e) => toast.error(e?.data?.message));
    }
  }

  const optionStatus = [
    { value: 1, label: "Đăng ký" },
    { value: 2, label: "Đã xác nhận" },
    { value: 3, label: "Đã thanh toán" }
  ];

  return (
    <div>
      <AppSidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>
                  {type === 1 ? "Sửa thông tin đơn hàng" : "Thêm đơn hàng"}
                </strong>
              </CCardHeader>
              <CCardBody>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CRow className="g-2">
                    <h6>Thông tin lớp học</h6>
                    <hr></hr>
                    <CCol sm={3}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Lớp học (<span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormSelect
                          id="autoSizingSelect"
                          onChange={(e) => setClassId(e.target.value)}
                        >
                          {listClasses?.map((item, index) => {
                            if (type === 1) {
                              return detailOrder?.aclass?.id ? (
                                <option key={index} value={item?.id} selected>
                                  {item?.code}
                                </option>
                              ) : (
                                <option key={index} value={item?.id}>
                                  {item?.code}
                                </option>
                              );
                            } else {
                              return (
                                <option key={index} value={item?.id}>
                                  {item?.code}
                                </option>
                              );
                            }
                          })}
                        </CFormSelect>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Thời gian học
                        </CFormLabel>
                        <CFormInput
                          readOnly={true}
                          type="email"
                          id="exampleFormControlInput1"
                          value={startDate}
                        />
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Lịch học
                        </CFormLabel>
                        <CFormInput
                          readOnly={true}
                          type="email"
                          id="exampleFormControlInput1"
                          value={calander}
                        />
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Khóa học
                        </CFormLabel>
                        <CFormInput
                          readOnly={true}
                          type="email"
                          id="exampleFormControlInput1"
                          value={packages}
                        />
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Giảng viên
                        </CFormLabel>
                        <CFormInput
                          readOnly={true}
                          type="email"
                          id="exampleFormControlInput1"
                          value={expert}
                        />
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Người hỗ trợ
                        </CFormLabel>
                        <CFormInput
                          readOnly={true}
                          type="email"
                          id="exampleFormControlInput1"
                          value={supporter}
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow className="g-1">
                    <h6>Thông tin khách hàng</h6>
                    <hr></hr>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Email (<span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormInput
                          readOnly={type === 1}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          defaultValue={detailOrder?.user ? detailOrder?.user?.email : detailOrder?.customer?.email}
                        />
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="formFile">
                          Họ và tên(
                          <span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormInput
<<<<<<< HEAD
                          readOnly={type === 1}
=======
>>>>>>> 816b9a2159b3521d6a3bf8c50aeebf0d2f8a7ec3
                          type="text"
                          id="exampleFormControlInput1"
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder=""
                          defaultValue={detailOrder?.user ? detailOrder?.user?.fullname : detailOrder?.customer?.fullName}
                        />
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Số điện thoại (<span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormInput
<<<<<<< HEAD
                          readOnly={type === 1}
=======
>>>>>>> 816b9a2159b3521d6a3bf8c50aeebf0d2f8a7ec3
                          type="number"
                          id="exampleFormControlInput1"
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder=""
                          defaultValue={detailOrder?.user ? detailOrder?.user?.phoneNumber : detailOrder?.customer?.mobile}
                        />
                      </div>
                    </CCol>
                  </CRow>
                  <CRow className="g-1">
                    <h6>Thông tin đơn hàng</h6>
                    <hr></hr>
                    <CCol sm={6}>
                      <CRow className="g-1">
                        <CCol sm={6}>
                          <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">
                              Trạng thái (<span style={{ color: "red" }}>*</span>)
                            </CFormLabel>
                            <CFormSelect
                              aria-label="Default select example"
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              {optionStatus?.map((item, index) => {
                                if (type === 1) {
                                  return detailOrder?.status ? (
                                    <option key={index} value={item?.status} selected>
                                      {item?.label}
                                    </option>
                                  ) : (
                                    <option key={index} value={item?.status}>
                                      {item?.label}
                                    </option>
                                  );
                                } else {
                                  return (
                                    <option key={index} value={item?.status}>
                                      {item?.label}
                                    </option>
                                  );
                                }
                              })}
                            </CFormSelect>
                          </div>
                        </CCol>
                        <CCol sm={3}>
                          <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">
                              Mã giảm giá
                            </CFormLabel>
                            <CFormInput
<<<<<<< HEAD
                              readOnly={type === 1}
=======
>>>>>>> 816b9a2159b3521d6a3bf8c50aeebf0d2f8a7ec3
                              onChange={(e) => setCodeCouponCheck(e.target.value)}
                              type="text"
                              defaultValue={type === 1 ? detailOrder?.coupon?.code : ""}
                              id="exampleFormControlInput1"
                            />
                          </div>
                        </CCol>
                        <CCol sm={3}>
                          <div className="mb-3" style={{ float: "initial", margin: "32px 0px 10px 10px", }}>
                            <CButton type="button" onClick={() => handleCheckCoupon()}>Thêm</CButton>
                          </div>
                        </CCol>
                        <CCol sm={4}>
                          <CFormLabel htmlFor="exampleFormControlInput1">
                            Tạm tính:
                          </CFormLabel>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                        </CCol>
                        <CCol sm={4}>
                          <CFormLabel>
                            Giảm giá:
                          </CFormLabel>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount)}
                        </CCol>
                        <CCol sm={4}>
                          <CFormLabel htmlFor="exampleFormControlInput1">
                            Thành tiền:
                          </CFormLabel>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price - discount)}
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Note (
                          <span style={{ color: "red" }}>*</span>)
                        </CFormLabel>
                        <CFormTextarea
                          id="exampleFormControlTextarea1"
                          defaultValue={type === 1 ? detailOrder?.note : ""}
                          onChange={(e) =>
                            setNote(e.target.value)
                          }
                          rows="3"
                        >
                        </CFormTextarea>
                      </div>
                    </CCol>
                  </CRow>
                  <div className="mb-3">
                    <CButton type="submit">Lưu</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
        <AppFooter />
      </div>
    </div >
  );
}

export default RegistrationDetail;
