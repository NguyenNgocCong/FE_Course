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

const Combos = () => {
    const [listSetting, setListSetting] = useState([]);
    const [listType, setListType] = useState([]);
    // eslint-disable-next-line
    const [skip, setSkip] = useState(0);
    // eslint-disable-next-line
    const [top, setTop] = useState(50);
    const [typeId, setTypeId] = useState(0);
    const [keyword, setKeyword] = useState("");
    const history = useHistory();

    const columns = [
        {
            name: "ID",
            selector: (row) => row?.setting_id,
            minWidth: '10px',
            maxWidth: '40px',
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
            maxWidth: '140px',
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    <button
                        onClick={() => { window.location.href = "/react/admin/settings/" + row?.id }}
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
            const response = await adminApi.getAllSetting(skip, top, typeId, keyword);
            setListSetting(response);
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
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
                duration: 7000,
            });
        }
    };

    useEffect(() => {
        getListSetting();
        // eslint-disable-next-line
    }, [typeId, keyword]);

    useEffect(() => {
        getAllType();
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
                            <Col xs={12} lg={2} >
                                <CFormSelect
                                    aria-label="Default select example"
                                    style={{ margin: "0px 10px", width: "140px" }}
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
                                <CFormInput
                                    type="text"
                                    id="exampleInputPassword1"
                                    placeholder="Search..."
                                    onChange={onSearch}
                                    style={{ width: "350px" }}
                                />
                            </Col>
                            <Col xs={12} lg={8} className='d-flex justify-content-end'>
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
                    <DataTable columns={columns} data={listSetting} pagination />
                </div>

                <AppFooter />
            </div>
        </div >
    );
};

export default Combos;
