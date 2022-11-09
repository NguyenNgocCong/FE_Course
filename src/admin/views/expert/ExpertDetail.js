import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CImage,
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

function ExpertDetail(props) {
    const [expert, setExpert] = useState();
        // eslint-disable-next-line
    const [status, setStatus] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [fullname, setFullname] = useState(0);
    const [phone, setPhone] = useState();
    const [company, setCompany] = useState();
    const [jobTitle , setJobTitle] = useState();
    const [description , setDescription ] = useState();
    const [thumbnailUrl, setThumbnailUrl] = useState();
    const [preview, setPreview] = React.useState();
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/experts/".length,
        location.pathname.length
    );
    const img = "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg";

    const getExpertById = async () => {
        try {
            const response = await adminApi.getExpertById(id);
            console.log(response)
            setExpert(response);
        } catch (responseError) {
            console.log(responseError)
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const handleUpdatePost = async (e) => {
        try {
            const params = {
                username: username,
                email: email,
                fullname: fullname,
                phone: phone,
                company: company,
                jobTitle: jobTitle,
                description: description,
                status: status
            };
            console.log(thumbnailUrl);
            const response = await adminApi.updatePost(id, params, thumbnailUrl)
            // setHasUpdate(!hasUpdate);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push("/admin/experts");
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const handleThumbnail = (e) => {
        const fileDropped = e.target.files[0];
        setThumbnailUrl(fileDropped)
        const previewUrl = URL.createObjectURL(fileDropped);
        setPreview(previewUrl);
    }

    useEffect(() => {
        getExpertById();
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
                                <strong>Expert Details</strong>
                            </CCardHeader>
                            <CCardBody>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={8}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                User Name (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="username"
                                                id="exampleFormControlInput1"
                                                placeholder="UserName"
                                                defaultValue={expert?.user?.usename}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Email (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="email"
                                                id="exampleFormControlInput1"
                                                placeholder="Email"
                                                defaultValue={expert?.user?.email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Full Name (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="fullname"
                                                id="exampleFormControlInput1"
                                                placeholder="FullName"
                                                defaultValue={expert?.user?.fullname}
                                                onChange={(e) =>
                                                    setFullname(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Phone (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="phone"
                                                id="exampleFormControlInput1"
                                                placeholder="Phone"
                                                defaultValue={expert?.user?.phone}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4}>
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            Change avatar (
                                            <span style={{ color: "red" }}>*</span>)
                                        </CFormLabel>
                                        <CImage
                                            rounded
                                            thumbnail
                                            src={!preview ? process.env.REACT_APP_BASE_URL + "/api/account/downloadFile/" + expert?.user.avatar ? process.env.REACT_APP_BASE_URL + "/api/account/downloadFile/" + expert?.user.avatar : img : preview}
                                            width={400}
                                            style={{ maxHeight: '240px' }}
                                            onLoad={() => URL.revokeObjectURL(preview)}
                                        />
                                        <CFormInput
                                            className="form-control"
                                            type="file"
                                            accept=".jpg, .png, .jpeg"
                                            onChange={(e) => handleThumbnail(e)}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={12}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Company (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="company"
                                                id="exampleFormControlInput1"
                                                placeholder="Company"
                                                defaultValue={expert?.user?.phone}
                                                onChange={(e) =>
                                                    setCompany(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Job title (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CFormInput
                                                type="jobTitle"
                                                id="exampleFormControlInput1"
                                                placeholder="Job title"
                                                defaultValue={expert?.user?.phone}
                                                onChange={(e) =>
                                                    setJobTitle(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Description (
                                                <span style={{ color: "red" }}>*</span>)
                                            </CFormLabel>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={expert?.body}
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
                                        onClick={(e) => handleUpdatePost(e)}
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

export default ExpertDetail;