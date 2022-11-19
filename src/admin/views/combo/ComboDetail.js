import { cilDelete } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
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
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import Styles from "./style.module.scss";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
} from "../../components";

function ComboDetail(props) {
    const [combo, setCombo] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const location = useLocation();
    const history = useHistory();
    const [listPackages, setListPackages] = useState([]);
    const [listPackagesSale, setListPackagesSale] = useState([]);
    const [salePrice, setSalePrice] = useState(0);
    const [packages, setPackages] = useState({});

    const columns = [
        {
            name: "STT",
            width: '50px',
            selector: (row, rowIndex) => rowIndex + 1,
            sortable: true,
        },
        {
            name: "Title",
            minWidth: '150px',
            width: '200px',
            maxWidth: '250px',
            selector: (row) => row?._package?.title,
            sortable: true,
        },
        {
            name: "Description",
            minWidth: '250px',
            width: '300px',
            maxWidth: '350px',
            selector: (row) => row?._package?.description,
            sortable: true,
        },
        {
            name: "Price",
            minWidth: '250px',
            width: '250px',
            maxWidth: '275px',
            selector: (row) => row?._package?.salePrice,
            sortable: true,
        },
        {
            name: "Sale Price",
            minWidth: '250px',
            width: '250px',
            maxWidth: '275px',
            selector: (row) => row?.salePrice,
            sortable: true,
        },
        {
            name: "Action",
            center: true,
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    <button
                        onClick={() => deletePackage(row)}
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                    >
                        <CIcon icon={cilDelete} />
                    </button>
                </div>
            ),
        },
    ];

    const id = location.pathname.substring(
        "/admin/combos/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;

    const getComboById = async () => {
        try {
            const response = await adminApi.getComboById(id);
            setCombo(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const deletePackage = async (row) => {
        const listData = listPackagesSale.filter(item => item !== row)
        setListPackagesSale(listData)
        const listpackage = listPackages.filter(item => item)
        listpackage.push(row?._package)
        setListPackages(listpackage)
    };
    const getListPackage = async () => {
        try {
            const response = await adminApi.getAllProduct(0, 50, "", 0, "");
            setListPackages(response.data);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };


    const handleUpdateSlider = async () => {
        try {
            if (listPackagesSale?.length > 0) {
                const params = {
                    title: title,
                    description: description,
                    packages: new Map()
                };
                listPackagesSale.map((element) => {
                    params.packages.set(element?._package?.id, Number(element?.salePrice))
                })
                console.log(params)
                const response =
                    type === 1
                        ? await adminApi.updateCombo(id, params)
                        : await adminApi.createCombo(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/combos");
            } else {
                toast.error("Please import package", {
                    duration: 2000,
                });
            }
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const handleAddPackage = async () => {
        if (!packages) {
            toast.error("Please select package", {
                duration: 1000,
            });
        } else if (parseInt(salePrice) === 0) {
            toast.error("Please enter sale price", {
                duration: 1000,
            });
        } else if (parseInt(salePrice) > parseInt(packages?.salePrice)) {
            toast.error("The sale price must be less than the original price", {
                duration: 1000,
            });
        } else {
            const listData = listPackagesSale.filter(item => item)
            listData.push({ _package: packages, salePrice: salePrice })
            const listpackage = listPackages.filter(item => item !== packages)
            setListPackagesSale(listData)
            setListPackages(listpackage)
            setPackages({})
            setSalePrice(0)
        }
    };

    useEffect(() => {
        if (type === 1) {
            getComboById(id);
        }
        getListPackage();
        // eslint-disable-next-line
    }, []);

    const handleSelectPackage = async (val) => {
        setPackages(listPackages.find(element => element?.id === parseInt(val)))
    };


    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Combo Details</strong>
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
                                                type === 1 ? combo?.title : ""
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
                                            Description
                                        </CFormLabel>
                                        <CFormInput
                                            type="text"
                                            id="exampleFormControlInput1"
                                            defaultValue={
                                                type === 1 ? combo?.description : ""
                                            }
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                            <h5>Packages information</h5>
                            <hr></hr>
                            <CRow className="g-3 mb-3">
                                <CCol sm={5}>
                                    <div className="d-flex form-row-inline label-medium">
                                        <CFormLabel style={{ marginRight: "10px" }}>
                                            Packages:
                                        </CFormLabel>
                                        <CFormSelect
                                            id="autoSizingSelect"
                                            value={packages?.id ? packages?.id : ""}
                                            onChange={(e) => handleSelectPackage(e.target.value)}
                                        >
                                            <option value="">Select package</option>
                                            {listPackages?.map((item, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item?.id}
                                                    >
                                                        {item?.title}
                                                    </option>
                                                );
                                            })}
                                        </CFormSelect>
                                    </div>
                                </CCol>
                                <CCol sm={3}>
                                    <CRow>
                                        <CCol sm={2}>
                                            <CFormLabel>
                                                Price:
                                            </CFormLabel>
                                        </CCol>
                                        <CCol sm={10}>
                                            <CFormInput
                                                type="number"
                                                disabled={true}
                                                id="exampleFormControlInput1"
                                                defaultValue={packages?.salePrice}
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>
                                <CCol sm={3}>
                                    <CRow>
                                        <CCol sm={4} className='d-flex justify-content-end'>
                                            <CFormLabel>
                                                Sale Price:
                                            </CFormLabel>
                                        </CCol>
                                        <CCol sm={8}>
                                            <CFormInput
                                                type="number"
                                                id="exampleFormControlInput1"
                                                value={salePrice}
                                                placeholder="Enter sale price"
                                                onChange={(e) =>
                                                    setSalePrice(e.target.value)
                                                }
                                            />
                                        </CCol>
                                    </CRow>
                                </CCol>
                                <CCol sm={1} >
                                    <CButton
                                        onClick={() => handleAddPackage()}
                                    >
                                        Import
                                    </CButton>
                                </CCol>
                                <CCol sm={12}>
                                    <DataTable
                                        columns={columns}
                                        data={listPackagesSale}
                                        paginationServer
                                    />
                                </CCol>
                            </CRow>
                            <div className="mb-3">
                                <CButton
                                    onClick={() => handleUpdateSlider()}
                                >
                                    {type === 1 ? "Update" : "Add"}
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default ComboDetail;
