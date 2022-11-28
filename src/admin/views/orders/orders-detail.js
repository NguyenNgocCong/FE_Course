import {
    CCard,
    CCardBody,
    CCol,
    CFormInput,
    CFormLabel,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Styles from "./style.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function OrderDetail(props) {
    const [order, setOrder] = useState();
    const location = useLocation();
    const id = location.pathname.substring(
        "/admin/orders/".length,
        location.pathname.length
    );

    const getOrderById = async () => {
        try {
            const response = await adminApi.getOrderDetail(id);
            setOrder(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        getOrderById();
        // eslint-disable-next-line
    }, []);


    const columns = [
        {
            name: "STT",
            width: '50px',
            selector: (row, rowIndex) => rowIndex + 1,
            sortable: true,
        },
        {
            name: "Title",
            minWidth: '350px',
            width: '400px',
            maxWidth: '450px',
            selector: (row) => row?._package ? row?._package?.title : row?._combo?.title,
            sortable: true,
        },
        {
            name: "Price",
            minWidth: '250px',
            width: '250px',
            maxWidth: '275px',
            selector: (row) => "$" + row?.packageCost,
            sortable: true,
        },
        {
            name: "Discount",
            minWidth: '250px',
            width: '250px',
            maxWidth: '275px',
            selector: (row) => "$" + row?.discount,
            sortable: true,
        },
        {
            name: "Status",
            width: "120px",
            selector: (row) => (
                <div className={`${row?.activated ? Styles.active : Styles.inactive}`}>
                    {row.activated ? "Actived" : "Deactivated"}
                </div>
            ),
            sortable: true,
        }
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
                            <CCardBody>
                                <strong>Customer info</strong>
                                <hr></hr>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={4}>
                                        <div>
                                            <CFormLabel>
                                                Name (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    order?.user ? order?.user?.fullname : order?.customer?.fullName
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
                                                    order?.user ? order?.user?.email : order?.customer?.email
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Mobile
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    order?.user ? order?.user?.phoneNumber : order?.customer?.mobile
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
                                                Total Cost (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    "$" + order?.totalCost
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={3}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Coupon
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    order?.coupon?.code
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={2}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Total Discount
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    "$" + order?.totalDiscount
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={2}>
                                        <div>
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Total Money
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                disabled={true}
                                                value={
                                                    "$" + (order?.totalCost - order?.totalDiscount)
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
                                                    Number(order?.status) === 1 ? "Submitted" : "Verified"
                                                }
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                                <strong>Product info</strong>
                                <hr></hr>
                                <CRow className="g-3 mb-3">
                                    <DataTable
                                        columns={columns}
                                        data={order?.orderPackages}
                                        paginationServer
                                    />
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

export default OrderDetail;
