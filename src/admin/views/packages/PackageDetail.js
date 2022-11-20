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
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
} from "../../components";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function PackagesDetail(props) {
    const [packages, setPackage] = useState();
    const [listSubject, setListSubject] = useState();
    const [status, setStatus] = useState(0);
    const [title, setTitle] = useState();
    const [excerpt, setExcerpt] = useState();
    const [duration, setDuration] = useState();
    const [description, setDescription] = useState();
    const [listPrice, setListPrice] = useState();
    const [salePrice, setSalePrice] = useState();
    const [subjectId, setSubjectId] = useState();
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/packages/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getPackageById = async () => {
        try {
            console.log(id)
            const response = await adminApi.getPackageById(id);
            setPackage(response);
            setStatus(response.status);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const getAllSubject = async () => {
        try {
            const response = await adminApi.getAllSubject(0, 100, "", 0, true);
            setListSubject(response.data);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const handleUpdateSlider = async () => {
        try {
            const params = {
                status: status,
                title: title,
                excerpt: excerpt,
                duration: duration,
                description: description,
                listPrice: listPrice,
                salePrice: salePrice,
                subjectId: subjectId,
            };
            const response =
                type === 1
                    ? await adminApi.updatePackage(id, params)
                    : await adminApi.createPackage(params);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push("/admin/packages");
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const optionIsCombo = [
        { combo: false, label: "False" },
        { combo: true, label: "True" },
    ];

    const optionStatus = [
        { status: false, label: "Deactivate" },
        { status: true, label: "Active" },
    ];

    useEffect(() => {
        if (type === 1) {
            getPackageById(id);
        }
        getAllSubject();
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
                            <CCardHeader>
                                <strong>Package Details</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Title (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? packages?.title : ""
                                                }
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Excerpt (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? packages?.excerpt : ""
                                                }
                                                onChange={(e) =>
                                                    setExcerpt(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Duration (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="number"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? packages?.duration : ""
                                                }
                                                onChange={(e) =>
                                                    setDuration(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                List Price (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? packages?.listPrice : ""
                                                }
                                                onChange={(e) =>
                                                    setListPrice(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={6}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Sale Price (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="text"
                                                id="exampleFormControlInput1"
                                                defaultValue={
                                                    type === 1 ? packages?.sale_price : ""
                                                }
                                                onChange={(e) =>
                                                    setSalePrice(e.target.value)
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
                                                {optionStatus?.map((item, index) => {
                                                    if (type === 1) {
                                                        return packages?.status ===
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
                                                Subject (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormSelect
                                                aria-label="Default select example"
                                                onChange={(e) =>
                                                    setSubjectId(e.target.value)
                                                }
                                            >
                                                <option>Select subject</option>
                                                {listSubject?.map((item, index) => {
                                                    if (type === 1) {
                                                        return packages?.subjectId === item?.id ? (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.id
                                                                }
                                                                selected
                                                            >
                                                                {item?.name}
                                                            </option>
                                                        ) : (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    item?.id
                                                                }
                                                            >
                                                                {item?.name}
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
                                                                {item?.name}
                                                            </option>
                                                        );
                                                    }
                                                })}
                                            </CFormSelect>
                                        </div>
                                    </CCol>
                                    <CCol sm={12}>
                                        <div className="mb-3">
                                            <CFormLabel>
                                                Description (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={packages?.description}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setDescription(data);
                                                }}
                                            />
                                        </div>
                                    </CCol>
                                </CRow>
                                <div className="mb-3">
                                    <CButton
                                        onClick={() => handleUpdateSlider()}
                                    >
                                        Submit
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

export default PackagesDetail;
