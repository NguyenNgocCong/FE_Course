import React, { useEffect, useState } from "react";
import {
    CFormInput,
    CFormSelect,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Styles from "./style.module.scss";
import { Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";
import moment from "moment/moment";

const Contact = () => {
    const [data, setDataTable] = useState([]);
    const [keywordSearch, setKeywordSearch] = useState("");
    const [isModify, setIsModify] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [category, setCategory] = useState(0);
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);

    const getListContact = async () => {
        try {
            const response = await adminApi.getAllContact(page, itemsPerPage, keywordSearch, category, status);
            setDataTable(Object.values(response.data));
            setTotalRows(response.totalItems);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const getListCategory = async () => {
        try {
            const response = await adminApi.getListCategoryWebContact();
            setListCategory(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };


    const handleUpdateStatus = async (e) => {
        try {
            const params = {
                status: e.status,
            };
            const response = await adminApi.updateStatusContact(params, e?.id);
            console.log(response)
            toast.success(response?.message, {
                duration: 2000,
            });
            setIsModify(!isModify);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const submit = (row) => {
        confirmAlert({
            title: 'Confirm to change status',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleUpdateStatus(row)
                },
                {
                    label: 'No',
                    //onClick: () => alert('Click No')
                }
            ]
        });
    }

    useEffect(() => {
        getListContact();
        // eslint-disable-next-line
    }, [isModify, keywordSearch, category, status]);

    useEffect(() => {
        getListCategory();
    }, [])

    const columns = [
        {
            name: "ID",
            width: '50px',
            selector: (row) => row?.id,
            sortable: true,
        },
        {
            name: "Email",
            minWidth: '225px',
            width: '250px',
            maxWidth: '275px',
            selector: (row) => row?.email,
            sortable: true,
        },
        {
            name: "Fullname",
            minWidth: '100px',
            width: '150px',
            maxWidth: '200px',
            selector: (row) => row?.fullName,
            sortable: true,
        },
        {
            name: "Phone number",
            left: true,
            minWidth: '100px',
            width: '130px',
            maxWidth: '140px',
            selector: (row) => row?.phoneNumber,
            sortable: true,
        },
        {
            name: "Category",
            left: true,
            minWidth: '100px',
            width: '130px',
            maxWidth: '140px',
            selector: (row) => row?.category.setting_title,
            sortable: true,
        },
        {
            name: "Date created",
            center: true,
            minWidth: '140px',
            width: '160px',
            maxWidth: '180px',
            selector: (row) => row?.createdDate,
            format: (row) => moment(row.lastLogin).format('hh:MM DD/mm/yyyy'),
            sortable: true,
        },
        // {
        //     name: "Date updated",
        //     center: true,
        //     minWidth: '140px',
        //     width: '160px',
        //     maxWidth: '180px',
        //     selector: (row) => row?.updatedDate,
        //     format: (row) => moment(row.lastLogin).format('hh:MM DD/mm/yyyy'),
        //     sortable: true,
        // },
        {
            name: "Status",
            width: '120px',
            center: true,
            selector: (row) => (
                <div className="d-flex align-items-center justify-content-center">
                    <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
                        <strong>{row?.status ? "Done" : "Not yet"}</strong>
                    </div>
                </div>
            ),
            sortable: true,
        },
        {
            name: "Action",
            center: true,
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    <button
                        onClick={() => { window.location.href = "/admin/contact/" + row?.id }}
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                    >
                        <CIcon icon={cilPen} />
                    </button>
                    <button
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "80px", border: "none", float: 'right' }}
                        onClick={() => submit(row)}
                    >
                        {row?.status ? "Not yet" : "Done"}
                    </button>
                </div>
            ),
        },
    ];
    const onSearch = async (e) => {
        setKeywordSearch(e.target.value);
    };

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
                    <div style={{ backgroundColor: "white", padding: "15px 20px", margin: "0px 0px 15px 0px" }} >
                        <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
                            <Col xs={12} lg={2}>
                                <CFormSelect
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <option value={0}>All Category</option>
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
                            <Col xs={12} lg={2}>
                                <div className='mt-50 width-270 mt-sm-0 mt-1'>
                                    <CFormSelect
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                            setStatus(e.target.value);
                                        }}
                                    >
                                        <option value="">All Status</option>
                                        <option value={true}>Done</option>
                                        <option value={false}>Not yet</option>
                                    </CFormSelect>
                                </div>
                            </Col>
                            <Col xs={12} lg={4}>
                                <div className='mt-50 width-270 mt-sm-0 mt-1'>
                                    <CFormInput
                                        type="text"
                                        id="exampleInputPassword1"
                                        placeholder="Search..."
                                        onChange={onSearch}
                                    />
                                </div>
                            </Col>
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
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Contact;
