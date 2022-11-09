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

const Products = () => {
    const [listProduct, setListProduct] = useState([]);
    const [isModify, setIsModify] = useState(false);
    const [status, setStatus] = useState("");
    const [title, setTitle] = useState("");
    const [name, setName] = useState('');
    const [listSubject, setListSubject] = useState([]);
    const history = useHistory();

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
            selector: (row) => (
              <>
                <div>
                  {listSubject.map((subject) => {
                    return subject?.setting_id === row.subjectId
                      ? subject.setting_title
                      : ""
                  })
                  }
                </div>
              </>
            ),
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
            selector: (row) => row.sale_price,
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
            const response = await adminApi.getAllSubject(name, status);
            setListSubject(response.data);
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };

    const getListProduct = async () => {
        try {
            const response = await adminApi.getAllProduct()
            setListProduct(Object.values(response.data));
            console.log(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 7000,
            });
        }
    };



    const onSearch = (e) => {
        setTitle(e.target.value);
        setName(e.target.value);
    }
    useEffect(() => {

        getAllSubject();
    }, [isModify, name, status]);


    useEffect(() => {
        getListProduct();
    }, [isModify, status, title]);



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
                            <Col xs={12} lg={6} className='d-flex justify-content-end'>  <div className={Styles.inputSearch}>
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
                    <DataTable columns={columns} data={listProduct} pagination />
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Products;
