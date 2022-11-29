import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CRow,
} from "@coreui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function CouponDetail(props) {

    const [detailCoupon, setDetailCoupon] = useState();
    const [packageId, setPackageId] = useState();
    const [validFrom, setValidFrom] = useState();
    const [validTo, setValidTo] = useState();
    const [code, setCode] = useState();
    const [listPackages, setListPackages] = useState([]);
    const [minRevenue, setMinRevenue] = useState();
    const [minQuantity, setMinQuantity] = useState();
    const [maxQuantity, setMaxQuantity] = useState();
    const [discountRate, setDiscountRate] = useState();
    const [status, setStatus] = useState();
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/coupon/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getCouponById = async () => {
        try {
            const response = await adminApi.getCouponDetail(id);
            setDetailCoupon(response);
            setValidFrom(response?.validFrom);
            setValidTo(response?.validTo);
            setStatus(response.status);
            setCode(response?.code);
            setMinRevenue(response?.minRevenue);
            setMinQuantity(response?.minQuantity);
            setMaxQuantity(response?.maxQuantity);
            setDiscountRate(response?.discountRate);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const getListPackage = async () => {
        try {
            const response = await adminApi.getAllProduct(0, 50, "", 0, "");
            setListPackages(response.data);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };


    const handleUpdateCoupon = async () => {
        try {
            const params = {
                minRevenue: minRevenue,
                minQuantity: minQuantity,
                maxQuantity: maxQuantity,
                discountRate: discountRate,
                status: status,
                validFrom: validFrom,
                validTo: validTo,
                packageId: packageId,
            };
            console.log(params);

            const response =
                type === 1
                    ? await adminApi.updateCoupon(params, id)
                    : await adminApi.createCoupon(params);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push("/admin/coupon");
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        if (type === 1) {
            getCouponById();
        }
        if (role === "ROLE_ADMIN" || role === "ROLE_MANAGER")
            getListPackage();
        // eslint-disable-next-line
    }, []);

    useEffect(() => { }, [validFrom, validTo]);

    const optionStatus = [
        { status: false, label: "Deactivate" },
        { status: true, label: "Active" },
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
                                    {type === 1
                                        ? "Change Class Info"
                                        : "Create New Coupon"}
                                </strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Package (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormSelect
                                                id="autoSizingSelect"
                                                value={packageId ? packageId : ""}
                                                onChange={(e) => setPackageId(e.target.value)}
                                            >
                                                <option value="">Select package</option>
                                                {listPackages.map((item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item?.id}
                                                        >
                                                            {item?.title}
                                                        </option>
                                                    );
                                                })}
                                            </CFormSelect>
                                        </div>
                                    </CCol>
                                    <CCol sm={3}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Valid From (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="date"
                                                id="exampleFormControlInput1"
                                                disabled={isNotAdmin}
                                                placeholder=""
                                                value={
                                                    validFrom
                                                        ? new Date(
                                                            validFrom
                                                        ).toLocaleDateString("en-CA")
                                                        : new Date(
                                                            ""
                                                        ).toLocaleDateString("en-CA")
                                                }
                                                onChange={(e) =>
                                                    setValidFrom(
                                                        new Date(e.target.value)
                                                    )
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={3}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Valid To (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="date"
                                                id="exampleFormControlInput1"
                                                disabled={isNotAdmin}
                                                placeholder=""
                                                value={
                                                    validTo
                                                        ? new Date(
                                                            validTo
                                                        ).toLocaleDateString("en-CA")
                                                        : new Date(
                                                            ""
                                                        ).toLocaleDateString("en-CA")
                                                }
                                                onChange={(e) =>
                                                    setValidTo(new Date(e.target.value))
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Status (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                onChange={(e) =>
                                                    setStatus(e.target.value)
                                                }
                                            >
                                                {optionStatus.map((item, index) => {
                                                    if (type === 1) {
                                                        return detailCoupon?.status ===
                                                            item?.status ? (
                                                            <option
                                                                key={index}
                                                                value={item?.status}
                                                                selected
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        ) : (
                                                            <option
                                                                key={index}
                                                                value={item?.status}
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item?.status}
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        );
                                                    }
                                                })}
                                            </CFormSelect>
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="formFile">
                                                Min Revenue(
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="minRevenue"
                                                id="exampleFormControlInput1"
                                                placeholder="Min Revenue"
                                                defaultValue={minRevenue}
                                                onChange={(e) =>
                                                    setMinRevenue(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={3}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Min Quantity (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="number"
                                                id="exampleFormControlInput1"
                                                placeholder="Min Quantity"
                                                defaultValue={minQuantity}
                                                onChange={(e) =>
                                                    setMinQuantity(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={3}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Max Quantity(
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="number"
                                                id="exampleFormControlInput1"
                                                placeholder="Max Quantity"
                                                defaultValue={maxQuantity}
                                                onChange={(e) =>
                                                    setMaxQuantity(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Discount Rate(
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="number"
                                                id="exampleFormControlInput1"
                                                placeholder="Discount Rate"
                                                defaultValue={discountRate}
                                                onChange={(e) =>
                                                    setDiscountRate(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    {type === 1 ? <CCol sm={12}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Code(
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="code"
                                                readOnly={true}
                                                id="exampleFormControlInput1"
                                                placeholder="Code"
                                                defaultValue={code}
                                                onChange={(e) =>
                                                    setCode(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                        : <></>
                                    }
                                </CRow>
                                <div className="mb-3">
                                    <CButton
                                        onClick={() => handleUpdateCoupon()}
                                    >
                                        Save
                                    </CButton>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default CouponDetail;
