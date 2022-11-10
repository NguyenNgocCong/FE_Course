import React, { useEffect, useState } from "react";
import {
    CFormSelect,
    CFormInput,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import CIcon from '@coreui/icons-react';
import { cilLibraryAdd, cilPen } from "@coreui/icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";

const Posts = () => {
    const [listPost, setListPost] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [category, setCategory] = useState("");
    const [isModify, setIsModify] = useState(false);
    const [status, setStatus] = useState("");
    const [title, setTitle] = useState("");
    const history = useHistory();

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            minWidth: '10px',
            maxWidth: '40px',
            sortable: true,
        },
        {
            name: "Thumbnail",
            maxWidth: '150px',
            selector: (row) => (
                <img
                    src={process.env.REACT_APP_BASE_URL + "/api/account/downloadFile/" + row.thumnailUrl}
                    width={120}
                    alt='thumbnail'
                />
            ),
            sortable: false,
        },
        {
            name: "Title",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Brief info",
            selector: (row) => row.brefInfo,
            sortable: true,
        },
        {
            name: "Category",
            maxWidth: '200px',
            selector: (row) => (
                <>
                    <div>
                        {listCategory.map((category) => {
                            return category?.setting_id === row.categoryId
                                ? category.setting_title
                                : ""
                        })
                        }
                    </div>
                </>
            ),
            sortable: true,
        },
        {
            name: "Status",
            maxWidth: '140px',
            selector: (row) => (
                <>
                    <div className={` ${row?.status !== 4 ? Styles.active : Styles.inactive}`} style={{ textAlign: 'center' }}>
                        {(() => {
                            if (row?.status === 0) {
                                return (<>Draft</>)
                            } else if (row?.status === 1) {
                                return (<>Submitted</>)
                            } else if (row?.status === 2) {
                                return (<>Published</>)
                            } else if (row?.status === 3) {
                                return (<>Achieved</>)
                            } else if (row?.status === 4) {
                                return (<>Rejected</>)
                            }
                        })()}
                    </div>
                    <br />
                    <div>{row?.createDate}</div>
                </>
            ),
            sortable: true,
        },
        {
            name: "Action",
            maxWidth: '180px',
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    {(() => {
                        if (row?.status === 1) {
                            return (<button
                                onClick={() => { window.location.href = "/react/admin/posts/" + row?.id }}
                                style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                            >
                                Approve
                            </button>)
                        } else {
                            return (<button
                                onClick={() => { window.location.href = "/react/admin/posts/" + row?.id }}
                                style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                            >
                                <CIcon icon={cilPen} />
                            </button>)
                        }
                    })()}
                    <button
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "80px", border: "none", float: 'right' }}
                        onClick={() => submit(row)}
                    >
                        {(() => {
                            if (row?.status === 0) {
                                return ("Submit")
                            } else if (row?.status === 1) {
                                return ("Reject")
                            } else if (row?.status === 2) {
                                return ("Achieve")
                            } else if (row?.status === 3) {
                                return ("Publish")
                            } else if (row?.status === 4) {
                                return ("Submit")
                            }
                        })()}
                    </button>
                </div>
            ),
        },
    ];

    const handleUpdateStatus = async (row, type) => {
        let id = row.id;
        let status = row.status;
        let statusChange = -1;
        if (status === 0) {
            statusChange = 1;
        } else if (status === 1) {
            if (type === 0) {
                statusChange = 2;
            } else {
                statusChange = 4;
            }
        } else if (status === 2) {
            statusChange = 3;
        } else if (status === 3) {
            statusChange = 2;
        } else if (status === 4) {
            statusChange = 1;
        }
        console.log(id, status);
        try {
            const params = {
                status: statusChange,
            };

            const response = await adminApi.updatePost(id, params, null);
            setIsModify(!isModify);
            toast.success(response?.message, {
                duration: 2000,
            });
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    }

    const submit = (row, type) => {

        confirmAlert({
            title: 'Confirm to change status',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleUpdateStatus(row, type)
                },
                {
                    label: 'No',
                    //onClick: () => alert('Click No')
                }
            ]
        });
    }

    const getListPost = async () => {
        try {
            const response = await adminApi.getAllPost(title, status);
            setListPost(Object.values(response.data));
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const getListCategory = async () => {
        try {
            const response = await adminApi.getListCategoryPost();
            setListCategory(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const onSearch = (e) => {
        setTitle(e.target.value);
    }

    const optionStatus = [
        { status: 0, label: "Draft" },
        { status: 1, label: "Submitted" },
        { status: 2, label: "Published" },
        { status: 3, label: "Achieved" },
        { status: 4, label: "Rejected" },
    ];

    useEffect(() => {
        getListPost();
        // eslint-disable-next-line
    }, [isModify, status, title, category]);

    useEffect(() => {
        getListCategory();
    }, [])

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow px-2">
                    <div style={{ backgroundColor: "white", padding: "15px 20px", margin: "0px 0px 15px 0px" }}>
                        <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
                            <Col lg={2}>
                                <CFormSelect
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <option value="">All Category</option>
                                    {listCategory?.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item?.setting_id}
                                            >
                                                {item?.setting_title}
                                            </option>
                                        );
                                    })}
                                </CFormSelect>
                            </Col>
                            <Col lg={2}>
                                <CFormSelect
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                    }}
                                >
                                    <option value="">All Status</option>
                                    {optionStatus?.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item?.status}
                                            >
                                                {item?.label}
                                            </option>
                                        );
                                    })}
                                </CFormSelect>
                            </Col>
                            <Col lg={4}>
                                <CFormInput
                                    type="text"
                                    id="exampleInputPassword1"
                                    placeholder="Search..."
                                    onChange={onSearch}
                                />
                            </Col>
                            <Col  lg={4} className='d-flex justify-content-end'>  
                            <div className={Styles.inputSearch}>
                                <button
                                    style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                                    onClick={() =>
                                        history.push(
                                            "/admin/posts/create"
                                        )
                                    }
                                >
                                    <CIcon icon={cilLibraryAdd} />
                                </button>
                            </div></Col>

                            
                        </Row>
                    </div>
                    <DataTable columns={columns} data={listPost} pagination />
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Posts;
