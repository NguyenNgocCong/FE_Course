import React, { useEffect, useState } from "react";
import {
    CFormInput,
    CFormSelect,
} from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import Styles from "./style.module.scss";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import CIcon from '@coreui/icons-react';
import { cilLibraryAdd, cilPen } from "@coreui/icons";
import { Col, Row } from "react-bootstrap";

const Settings = () => {
    const [data, setData] = useState([]);
    const [listType, setListType] = useState([]);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [status, setStatus] = useState("");
    const [typeId, setTypeId] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [totalRows, setTotalRows] = useState(0);
    const history = useHistory();

    const columns = [
        {
            name: "STT",
            width: '50px',
            selector: (row, rowIndex) => rowIndex + 1,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row?.setting_title,
            sortable: true,
        },
        {
            name: "Display Order",
            selector: (row) => row?.display_order,
            sortable: true,
        },
        {
            name: "Value",
            selector: (row) => row?.setting_value,
            sortable: true,
        },
        {
            name: "Description",
            selector: (row) => row?.desciption,
            sortable: true,
        },
        {
            name: "Status",
            maxWidth: '160px',
            selector: (row) => (
                <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
                    {row.status ? "Active" : "Deactivate"}
                </div>
            ),
            sortable: true,
        },
        {
            name: "Action",
            center: true,
            maxWidth: '140px',
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    <button
                        onClick={() => { window.location.href = "/lrs/admin/settings/" + row?.setting_id }}
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                    >
                        <CIcon icon={cilPen} />
                    </button>
                </div>
            ),
        },
    ];

    const getListSetting = async () => {
        try {
            const response = await adminApi.getAllSetting(page, itemsPerPage, typeId, keyword, status ? status : "");
            setData(response.data);
            setTotalRows(response.totalItems)
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const onSearch = (e) => {
        setKeyword(e.target.value);
    }

    const getAllType = async () => {
        try {
            const response = await adminApi.getListType();
            setListType(response);
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        getListSetting();
        // eslint-disable-next-line
    }, [typeId, keyword, status, page]);

    useEffect(() => {
        getAllType();
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
                    <div style={{ backgroundColor: "white", padding: "15px 20px", margin: "0px 0px 15px 0px" }}>
                        <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
                            <Col xs={12} lg={2} >
                                <CFormSelect
                                    style={{ margin: "0px 0px" }}
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setTypeId(e.target.value);
                                    }}
                                >
                                    <option value={0}>All Type</option>
                                    {listType?.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item?.type_id}
                                            >
                                                {item?.title}
                                            </option>
                                        );
                                    })}
                                </CFormSelect>
                            </Col>
                            <Col xs={12} lg={2}>
                                <CFormSelect
                                    style={{ margin: "0px 5px", maxWidth: "180px" }}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                    }}
                                >
                                    <option value="">All Status</option>
                                    <option value={true}>Active</option>
                                    <option value={false}>Deactivate</option>
                                </CFormSelect>
                            </Col>
                            <Col xs={12} lg={4}>
                                <CFormInput
                                    type="text"
                                    id="exampleInputPassword1"
                                    placeholder="Search..."
                                    onChange={onSearch}
                                    style={{  margin: "0px 10px" }}
                                />
                            </Col>
                            <Col xs={12} lg={4} className='d-flex justify-content-end'>
                                <div className={Styles.inputSearch}>
                                    <button
                                        style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                                        onClick={() =>
                                            history.push(
                                                "/admin/settings/create"
                                            )
                                        }
                                    >
                                        <CIcon icon={cilLibraryAdd} />
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </div>

                </div>
                <div className="body flex-grow-1 px-3">
                    <DataTable
                        columns={columns}
                        data={data}
                        paginationTotalRows={totalRows}
                        onChangePage={(page) => setPage(page - 1)}
                        itemsPerPage={itemsPerPage}
                        onChangeRowsPerPage={handlePerRowsChange}
                        pagination
                        paginationServer></DataTable>
                </div>

                <AppFooter />
            </div>
        </div >
    );
};

export default Settings;
