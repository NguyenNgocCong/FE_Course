import {
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function RegistrationDetail(props) {
    const [registration, setRegistration] = useState();
    const location = useLocation();
    const id = location.pathname.substring(
        "/admin/registration/".length,
        location.pathname.length
    );

    const getRegistrationById = async () => {
        try {
            const response = await adminApi.getOrderDetail(id);
            setRegistration(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        getRegistrationById();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardBody>
                                <strong>Thông tin lớp học</strong>
                                <hr></hr>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={4}>
                                        <div>
                                            <CFormLabel>
                                                Mã lớp học (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    registration?.aclass?.code
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Khóa học
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    registration?.aclass?.packages?.title
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={2}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Giá bán
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    "$" + registration?.aclass?.packages?.salePrice
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Khu vực
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    registration?.aclass?.branch != null ? registration?.aclass?.branch?.setting_title : "Online"
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Trainer
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    registration?.aclass?.trainer?.user?.fullname
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Ngày bắt đầu
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={registration?.aclass?.dateStart}
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                                <strong>thông tin khách hàng</strong>
                                <hr></hr>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={4}>
                                        <div>
                                            <CFormLabel>
                                                Họ và tên (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    registration?.user ? registration?.user?.fullname : registration?.customer?.fullName
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Email
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    registration?.user ? registration?.user?.email : registration?.customer?.email
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Phone
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    registration?.user ? registration?.user?.phoneNumber : registration?.customer?.mobile
                                                }
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                                <strong>Order info</strong>
                                <hr></hr>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={3}>
                                        <div>
                                            <CFormLabel>
                                                Tổng tiền (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    "$" + registration?.totalCost
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={3}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Mã giảm giá
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    registration?.coupon?.code
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={2}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Chiết khấu
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    "$" + registration?.totalDiscount
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={2}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Tổng tiền phải thanh toán
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    "$" + (registration?.totalCost - registration?.totalDiscount)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={2}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Status
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    Number(registration?.status) === 1 ? "Submitted" : "Verified"
                                                }
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default RegistrationDetail;
