import { cilLibraryAdd, cilPen } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CFormInput, CFormSelect } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import Styles from "./style.module.scss";

const Products = () => {
    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            minWidth: '10px',
            width: "50px",
            maxWidth: '60px',
            sortable: true,
        },
        {
            name: "Title",
            minWidth: "100px",
            width: "200px",
            maxWidth: "300px",
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: "Excerpt",
            minWidth: "100px",
            width: "150px",
            maxWidth: "200px",
            selector: (row) => row.excerpt,
            sortable: true,
        },
        {
            name: "Duration",
            minWidth: "100px",
            width: "150px",
            maxWidth: "200px",
            selector: (row) => row.duration,
            sortable: true,
        },
        {
            name: "Subject",
            minWidth: "100px",
            width: "150px",
            maxWidth: "200px",
            selector: (row) => row.sucjectCode?.name,
            sortable: true,
        },
        {
            name: "Description",
            minWidth: "300px",
            width: "350px",
            maxWidth: "400px",
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: "Price",
            minWidth: "100px",
            width: "120px",
            maxWidth: "140px",
            selector: (row) => row.listPrice,
            sortable: true,
        },
        {
            name: "Sale Price",
            minWidth: "100px",
            width: "120px",
            maxWidth: "140px",
            selector: (row) => row.salePrice,
            sortable: true,
        },
        {
            name: "IsCombo",
            minWidth: "100px",
            width: "120px",
            maxWidth: "140px",
            selector: (row) => (
                <div className={`${row?.combo ? Styles.active : Styles.inactive}`}>
                    <strong>{row.combo ? "True" : "False"}</strong>
                </div>
            ),
            sortable: true,
        },
        {
            name: "Status",
            minWidth: "100px",
            width: "120px",
            maxWidth: "140px",
            selector: (row) => (
                <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
                    <strong>{row.status ? "Active" : "Deactivate"}</strong>
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
                        onClick={() => { window.location.href = "/react/admin/products/" + row?.id }}
                        color="primary"
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                    >
                        <CIcon icon={cilPen} />
                    </button>
                    <button
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "80px", border: "none", float: 'right' }}
                        onClick={() => submit(row)}
                    >
                        {row?.status ? "Deactivate" : "Active"}
                    </button>
                </div>
            ),
        },
    ];
    const [data, setDataTable] = useState([]);
    const [keywordSearch, setKeywordSearch] = useState("");
    const [isModify, setIsModify] = useState(false);
    const [listsubject, setListSubject] = useState([]);
    const [category, setCategory] = useState(0);
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const history = useHistory();
    const handleUpdateStatus = async (row) => {
        try {
            const params = {
                status: !row?.status,
            };
            const response = await adminApi.updateProduct(row?.id, params);
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
    const getAllSubject = async () => {
        try {
            const response = await adminApi.getAllSubject(0, 100, "", 0, "");
            setListSubject(response.data);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const getListProduct = async () => {
        try {
            const response = await adminApi.getAllProduct(page, itemsPerPage, keywordSearch, category, status);
            setDataTable(response.data);
            setTotalRows(response.totalItems);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };



    const onSearch = (e) => {
        setKeywordSearch(e.target.value);
    }
    useEffect(() => {
        getAllSubject();
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        getListProduct();
        // eslint-disable-next-line
    }, [isModify, keywordSearch, page, status, category]);

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
                            <Col xs={12} lg={2}>
                                <CFormSelect
                                    style={{ margin: "0px 0px", maxWidth: "180px" }}
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                    }}
                                >
                                    <option value={0}>All Subject</option>
                                    {listsubject?.map((item, index) => {
                                        return (
                                            <option key={index} value={item?.id}>
                                                {item?.name}
                                            </option>
                                        );
                                    })}
                                </CFormSelect>
                            </Col>
                            <Col xs={12} lg={2}>
                                <CFormSelect
                                    style={{ margin: "0px 0px", maxWidth: "180px" }}
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
                                />
                            </Col>
                            <Col xs={12} lg={4} className='d-flex justify-content-end'>  <div className={Styles.inputSearch}>
                                <button
                                    style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                                    onClick={() =>
                                        history.push(
                                            "/admin/products/create"
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
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    )
};

export default Products;
