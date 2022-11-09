import React, { useEffect, useState, } from "react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { adminApi } from "../../../api/adminApi";
import { Toaster } from "react-hot-toast";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import { AiOutlineDatabase } from "react-icons/ai";
import { FaDatabase } from "react-icons/fa";
import {
    CFormInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";

const Experts = () => {

    const columns = [
        {
            name: "ID",
            width: '50px',
            selector: (row) => row?.id,
            sortable: true,
        },
        {
            name: "Fullname",
            minWidth: '150px',
            width: '200px',
            maxWidth: '250px',
            selector: (row) => row?.user?.fullname,
            sortable: true,
        },
        {
            name: "Email",
            minWidth: '225px',
            width: '250px',
            maxWidth: '275px',
            selector: (row) => row?.user?.email,
            sortable: true,
        },
        {
            name: "Company",
            minWidth: '250px',
            width: '250px',
            maxWidth: '275px',
            selector: (row) => row?.company,
            sortable: true,
        },
        {
            name: "Job Title",
            left: true,
            minWidth: '150px',
            width: '200px',
            maxWidth: '250px',
            selector: (row) => row?.jobTitle,
            sortable: true,
        },
        {
            name: "Status",
            width: '120px',
            center: true,
            selector: (row) => (
                <div className="d-flex align-items-center justify-content-center">
                    <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
                        <strong>{row?.status ? "Active" : "Deactivate"}</strong>
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
                        onClick={() => { window.location.href = "/react/admin/experts/" + row?.id }}
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                    >
                        <CIcon icon={cilPen} />
                    </button>
                </div>
            ),
        },
    ];
    const [data, setDataTable] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const optionsPerPage = [10, 20, 50];
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    const getListExperts = async () => {
        try {
            const response = await adminApi.getListExperts(page, itemsPerPage, keyword);
            console.log(response);
            setDataTable(response.data);
            setTotalRows(response.totalItems)
        } catch (responseError) {
            console.log(responseError);
        } 
    };

    const onSearch = async (e) => {
        setKeyword(e.target.value);
    };
    useEffect(() => {
        getListExperts();
        // eslint-disable-next-line
    }, [itemsPerPage, page]);

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
                            <Col xs={12} lg={4}>
                                <CFormInput
                                    type="text"
                                    id="exampleInputPassword1"
                                    placeholder="Search..."
                                    onChange={onSearch}
                                />
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

export default Experts;
