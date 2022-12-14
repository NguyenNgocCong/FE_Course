import React, { useEffect, useState } from "react";
import {
    CFormSelect,
    CFormInput,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../component";
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
import { combieImg } from "../../../utils";

const Posts = () => {
    const columns = [
        {
            name: "STT",
            width: '50px',
            selector: (row, rowIndex) => rowIndex + 1,
            sortable: true,
        },
        {
            name: "Ảnh",
            maxWidth: '150px',
            selector: (row) => (
                <img
                    src={(row.thumnailUrl != null && row.thumnailUrl) ? combieImg(row.thumnailUrl) : ""}
                    width={120}
                    alt='thumbnail'
                />
            ),
            sortable: false,
        },
        {
            name: "Tiêu đề",
            maxWidth: '300px',
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Tóm tắt",
            maxWidth: '300px',
            selector: (row) => row.brefInfo,
            sortable: true,
        },
        {
            name: "Ngày tạo",
            maxWidth: '150px',
            selector: (row) => row.brefInfo,
            sortable: true,
        },
        {
            name: "Phân loại",
            maxWidth: '150px',
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
            name: "Trạng thái",
            maxWidth: '150px',
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
                </>
            ),
            sortable: true,
        },
        {
            name: "Hành động",
            maxWidth: '230px',
            center: true,
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    {(() => {
                        if (row?.status === 1) {
                            return (<button
                                onClick={() => submit(row, 0)}
                                style={{ backgroundColor: "#7367f0", height: "30px", width: "80px", border: "none", float: 'right' }}
                            >
                                Chấp thuận
                            </button>)
                        } else {
                            return (<button
                                onClick={() => { window.location.href = "/admin/posts/" + row?.id }}
                                style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                            >
                                <CIcon icon={cilPen} />
                            </button>)
                        }
                    })()}
                    <button
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "150px", border: "none", float: 'right' }}
                        onClick={() => submit(row)}
                    >
                        {(() => {
                            if (row?.status === 0) {
                                return ("Gửi")
                            } else if (row?.status === 1) {
                                return ("Từ chối")
                            } else if (row?.status === 2) {
                                return ("Hoàn thành")
                            } else if (row?.status === 3) {
                                return ("Được phát hành")
                            } else if (row?.status === 4) {
                                return ("Gửi")
                            }
                        })()}
                    </button>
                </div>
            ),
        },
    ];

    const [data, setDataTable] = useState([]);
    const [keywordSearch, setKeywordSearch] = useState("");
    const [isModify, setIsModify] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [category, setCategory] = useState(0);
    const [status, setStatus] = useState(-1);
    const [page, setPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const history = useHistory();


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
                duration: 2000,
            });
        }
    }

    const submit = (row, type) => {

        confirmAlert({
            title: 'Xác nhận thay đổi trạng thái',
            message: 'Bạn có chắc chắn điều này',
            buttons: [
                {
                    label: 'Có',
                    onClick: () => handleUpdateStatus(row, type)
                },
                {
                    label: 'Không',
                    //onClick: () => alert('Click No')
                }
            ]
        });
    }

    const getListPost = async () => {
        try {
            const response = await adminApi.getAllPost(page, itemsPerPage, keywordSearch, category, status);
            setDataTable(response.data);
            setTotalRows(response.totalItems);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const getListCategory = async () => {
        try {
            const response = await adminApi.getListCategoryPost();
            setListCategory(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const onSearch = (e) => {
        setKeywordSearch(e.target.value);
    }

    const optionStatus = [
        { status: 0, label: "Nháp" },
        { status: 1, label: "Gửi" },
        { status: 2, label: "Được phát hành" },
        { status: 3, label: "Hoàn thành" },
        { status: 4, label: "Từ chối" },
    ];

    useEffect(() => {
        getListPost();
        // eslint-disable-next-line
    }, [isModify, keywordSearch, page, status, category]);

    useEffect(() => {
        getListCategory();
    }, [])

    const handlePerRowsChange = async (newPerPage) => {
        setItemsPerPage(newPerPage);
    }

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow px-2">
                    <div style={{ backgroundColor: "white", padding: "5px 0px", margin: "0px 0px 15px 0px" }}>
                        <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
                            <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
                                <CFormSelect
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <option value="">Tất cả</option>
                                    {listCategory.map((item, index) => {
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
                            <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
                                <CFormSelect
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                    }}
                                >
                                    <option value={0}>Tất cả</option>
                                    {optionStatus.map((item, index) => {
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
                            <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
                                <CFormInput
                                    type="text"
                                    id="exampleInputPassword1"
                                    placeholder="Tìm kiếm..."
                                    onChange={onSearch}
                                />
                            </Col>
                            <Col lg={4} className='d-flex justify-content-end'>
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
                    <DataTable
                        columns={columns}
                        data={data}
                        paginationTotalRows={totalRows}
                        onChangePage={(page) => setPage(page - 1)}
                        itemsPerPage={itemsPerPage}
                        onChangeRowsPerPage={handlePerRowsChange}
                        pagination
                        paginationServer
                    /></div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Posts;
