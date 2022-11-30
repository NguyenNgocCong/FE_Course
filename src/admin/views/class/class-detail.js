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
    CRow,
} from "@coreui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function ClassDetail(props) {
    const [listTrainer, setListTrainer] = useState();
    const [listBranch, setListBranch] = useState();
    const [listSupporter, setListSupporter] = useState();
    const [detailClass, setDetailClass] = useState();
    const [packageId, setPackageId] = useState(0);
    const [listPackages, setListPackages] = useState([]);
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [dateStart, setDateStart] = useState();
    const [trainer, setTrainer] = useState(0);
    const [branch, setBranch] = useState(0);
    const [isOnline, setIsOnline] = useState(true);
    const [supporter, setSupporter] = useState();
    const [status, setStatus] = useState();
    const [validated,setValidated] = useState(false);
    const role = JSON.parse(Cookies.get("user"))?.role;
    const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/class/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getClassById = async () => {
        try {
            const response = await adminApi.getClassDetail(id);
            setDetailClass(response);
            setDateFrom(response?.dateFrom);
            setDateTo(response?.dateTo);
            setStatus(response?.status);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const getListTrainer = async () => {
        try {
            const response = await adminApi.getListExperts(0, 50, "");
            setListTrainer(response.data);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const getListBranch = async () => {
        try {
            const response = await adminApi.getListCategoryBranch();
            setListBranch(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const getListSupporter = async () => {
        try {
            const response = await adminApi.getListSupporter();
            setListSupporter(response.data);
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

    const handleSubmit = async (event) => {
        try {
            const form = event.currentTarget
            setValidated(true)
            event.preventDefault()
            event.stopPropagation()
            if (form.checkValidity()) {
                const params = {
                    packages: packageId,
                    dateFrom: dateFrom,
                    dateTo: dateTo,
                    status: status,
                    trainer: trainer,
                    online: isOnline,
                    supporterId: supporter,
                    branch: branch,
                    startDate: dateStart
                };
                console.log(params);

                const response =
                    type === 1
                        ? await adminApi.updateClass(params, id)
                        : await adminApi.createClass(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/class");
            }
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        if (type === 1) {
            getClassById();
        }
        if (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") getListTrainer();
        getListPackage();
        getListSupporter();
        getListBranch();
        // eslint-disable-next-line
    }, []);

    useEffect(() => { }, [dateFrom, dateTo]);

    const optionStatus = [
        { status: false, label: "Deactivate" },
        { status: true, label: "Active" },
    ];

    const optionIsOnline = [
        { status: true, label: "Online" },
        { status: false, label: "Offline" }
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
                                        : "Create New Class"}
                                </strong>
                            </CCardHeader>
                            <CCardBody>
                                <CForm
                                    className="row g-3 needs-validation"
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >
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
                                                    feedbackInvalid="Please select Package!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Select package</option>
                                                    {listPackages?.map((item, index) => {
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
                                                    Date From (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    disabled={isNotAdmin}
                                                    placeholder=""
                                                    value={
                                                        dateFrom
                                                            ? new Date(
                                                                dateFrom
                                                            ).toLocaleDateString("en-CA")
                                                            : new Date(
                                                                ""
                                                            ).toLocaleDateString("en-CA")
                                                    }
                                                    onChange={(e) =>
                                                        setDateFrom(
                                                            new Date(e.target.value)
                                                        )
                                                    }
                                                    feedbackInvalid="Please select Date From!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={3}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Date To (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    disabled={isNotAdmin}
                                                    placeholder=""
                                                    value={
                                                        dateTo
                                                            ? new Date(
                                                                dateTo
                                                            ).toLocaleDateString("en-CA")
                                                            : new Date(
                                                                ""
                                                            ).toLocaleDateString("en-CA")
                                                    }
                                                    onChange={(e) =>
                                                        setDateTo(new Date(e.target.value))
                                                    }
                                                    feedbackInvalid="Please select Date To!"
                                                    required
                                                    tooltipFeedback
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
                                                    {optionStatus?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailClass?.status ===
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
                                                    Trainer
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    disabled={isNotAdmin}
                                                    onChange={(e) =>
                                                        setTrainer(e.target.value)
                                                    }
                                                    feedbackInvalid="Please select Trainer!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Select trainer</option>
                                                    {listTrainer?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailClass?.trainer
                                                                ?.id ===
                                                                item?.id ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.user?.username}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                >
                                                                    {item?.user?.username}
                                                                </option>
                                                            );
                                                        } else {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                >
                                                                    {item?.user?.username}
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
                                                    Mode of learning (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    onChange={(e) =>
                                                        setIsOnline(e.target.value === "true")
                                                    }
                                                >
                                                    {optionIsOnline?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailClass?.isOnline ===
                                                                item?.isOnline ? (
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
                                        <CCol sm={3}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Opening day(
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormInput
                                                    type="date"
                                                    id="exampleFormControlInput1"
                                                    disabled={isNotAdmin}
                                                    placeholder=""
                                                    value={
                                                        dateStart
                                                            ? new Date(
                                                                dateStart
                                                            ).toLocaleDateString("en-CA")
                                                            : new Date(
                                                                ""
                                                            ).toLocaleDateString("en-CA")
                                                    }
                                                    onChange={(e) =>
                                                        setDateStart(
                                                            new Date(e.target.value)
                                                        )
                                                    }
                                                    feedbackInvalid="Please select Opening Day!"
                                                    required
                                                    tooltipFeedback
                                                />
                                            </div>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="formFile">
                                                    Supporter
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    disabled={isNotAdmin}
                                                    onChange={(e) =>
                                                        setSupporter(e.target.value)
                                                    }
                                                    feedbackInvalid="Please select Support!"
                                                    required
                                                    tooltipFeedback
                                                >
                                                    <option value="">Select Supporter</option>
                                                    {listSupporter?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailClass?.supporter
                                                                ?.id ===
                                                                item?.id ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.username}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }
                                                                >
                                                                    {item?.username}
                                                                </option>
                                                            );
                                                        } else {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.id
                                                                    }>
                                                                    {item?.username}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </CFormSelect>
                                            </div>
                                        </CCol>
                                        {isOnline === false ? <CCol sm={12}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="formFile">
                                                    Branch
                                                </CFormLabel>
                                                <CFormSelect
                                                    aria-label="Default select example"
                                                    disabled={isNotAdmin}
                                                    onChange={(e) =>
                                                        setBranch(e.target.value)
                                                    }
                                                >
                                                    <option>Select Branch</option>
                                                    {listBranch?.map((item, index) => {
                                                        if (type === 1) {
                                                            return detailClass?.branch
                                                                ?.id ===
                                                                item?.id ? (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.setting_value
                                                                    }
                                                                    selected
                                                                >
                                                                    {item?.setting_title}
                                                                </option>
                                                            ) : (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.setting_value
                                                                    }
                                                                >
                                                                    {item?.setting_title}
                                                                </option>
                                                            );
                                                        } else {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        item?.setting_value
                                                                    }>
                                                                    {item?.setting_title}
                                                                </option>
                                                            );
                                                        }
                                                    })}
                                                </CFormSelect>
                                            </div>
                                        </CCol> : <></>}
                                    </CRow>
                                    <div className="mb-3">
                                        <CButton
                                            type="submit"
                                        >
                                            Save
                                        </CButton>
                                    </div>
                                    </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default ClassDetail;
