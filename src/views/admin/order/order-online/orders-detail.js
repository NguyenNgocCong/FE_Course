import { Nav, Tab } from "react-bootstrap";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../component";
import DataTable from "react-data-table-component";
import CIcon from "@coreui/icons-react";
import { cilDelete } from "@coreui/icons";
import Styles from "./../style.module.scss";


const priceTemplate = (props) => {
    let price = 0
    console.log(props)
    if (props?.product?.comboPackages) {
        props?.product?.comboPackages.map((element) => (
            price += element?.salePrice
        ))
    } else {
        price = props?.product?.salePrice
    }
    return (<div>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</div>)
}

function OrderDetail(props) {

    const columns = [
        {
            name: "STT",
            width: "50px",
            selector: (row, rowIndex) => rowIndex + 1,
            sortable: true,
        },
        {
            name: "Tiêu đề",
            minWidth: "250px",
            maxWidth: "450px",
            selector: (row) => row?.product?.title,
            sortable: true,
        },
        {
            name: "Giá bán",
            minWidth: "150px",
            maxWidth: "200px",
            selector: (row) => priceTemplate(row),
            sortable: true,
        },
        {
            name: "Hành động",
            center: true,
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    <CButton onClick={() => deleteProduct(row)}
                        style={{
                            height: "35px",
                            width: "50px",
                        }}
                    >
                        <CIcon icon={cilDelete} />
                    </CButton>
                </div >
            ),
        }
    ];
    // eslint-disable-next-line
    const [listPackage, setListPackage] = useState([]);
    // eslint-disable-next-line
    const [listCombo, setListCombo] = useState([]);
    const [listCBXPackage, setListCBXPackage] = useState([]);
    const [packages, setPackages] = useState({});
    const [listProduct, setListProduct] = useState([]);
    const [listCBXCombo, setListCBXCombo] = useState([]);
    const [combo, setCombo] = useState({});
    const [detailOrder, setDetailOrder] = useState();
    const [listSubject, setListSubject] = useState([]);
    const [codeCouponCheck, setCodeCouponCheck] = useState();
    const [codeCoupon, setCodeCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState(0);
    const [status, setStatus] = useState(1);
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [fullName, setFullName] = useState("");
    const location = useLocation();
    const history = useHistory();

    const id = location.pathname.substring(
        "/admin/orders/".length,
        location.pathname.length,
    );
    const type = id !== "create" ? 1 : 0;

    useEffect(() => {

        // eslint-disable-next-line
    }, [listSubject])

    useEffect(() => {
        if (detailOrder?.totalCost) {
            setPrice(detailOrder?.totalCost + detailOrder?.totalDiscount)
            setDiscount(detailOrder?.totalDiscount)
            setCodeCouponCheck(detailOrder?.coupon?.code)
        }
        // eslint-disable-next-line
    }, [detailOrder])

    const deleteProduct = async (row) => {
        const listData = listProduct.filter((item) => item !== row);
        setListProduct(listData);
    };

    const handleSelectPackage = (val) => {
        setPackages(listCBXPackage.find((element) => element?.id === parseInt(val)));
    };

    const handleAddPackage = async () => {
        if (!packages?.id || packages?.id === 0) {
            toast.error("Hãy chọn khóa học", {
                duration: 1000,
            });
        } else {
            const listData = listProduct.filter((item) => item);
            listData.push({ id: listData.length, product: packages });
            listPackage.push(packages?.id);
            setListProduct(listData);
            setPackages({ id: 0 });
        }
    };

    const handleSelectCombo = (val) => {
        setCombo(listCBXCombo.find((element) => element?.id === parseInt(val)));
    };

    const handleAddCombo = async () => {
        if (!combo?.id || Number(combo?.id) === 0) {
            toast.error("Hãy chọn combo", {
                duration: 1000,
            });
        } else {
            const listData = listProduct.filter((item) => item);
            listData.push({ id: listData.length, product: combo });
            listCombo.push(combo?.id);
            setListProduct(listData);
            setCombo({ id: 0 });
        }
    };

    const getOrderDetailById = async () => {
        try {
            const response = await adminApi.getOrderDetail(id);
            setDetailOrder(response);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const handleChangeSubject = async (value) => {
        try {
            const response = await adminApi.getListPackage(0, 50, "", value, true);
            setListCBXPackage(response.data);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const getListSubject = async () => {
        try {
            const response = await adminApi.getAllSubject(0, 50, "", 0, true);
            setListSubject(response.data);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const getListCombo = async () => {
        try {
            const response = await adminApi.getAllCombo(0, 50, "", 0, true);
            setListCBXCombo(response.data);
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    const handleSubmit = async (event) => {
        try {
            const form = event.currentTarget
            setValidated(true)
            event.preventDefault()
            event.stopPropagation()
            console.log(listCombo)
            console.log(listPackage)
            if (form.checkValidity()) {
                const params = {
                    status: status,
                    email: email,
                    fullName: fullName,
                    mobile: phone,
                    note: note,
                    codeCoupon: codeCoupon,
                    packages: listPackage,
                    combos: listCombo,
                };
                const response =
                    type === 1
                        ? await adminApi.updateOrderAdmin(params, id)
                        : await adminApi.createOrderAdmin(params);
                toast.success(response?.message, {
                    duration: 2000,
                });
                history.push("/admin/orders");
            }
        } catch (responseError) {
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };

    useEffect(() => {
        if (type === 1) {
            getOrderDetailById();
        }
        getListSubject();
        getListCombo();
        // eslint-disable-next-line
    }, []);

    const handleCheckCoupon = () => {
        if (codeCouponCheck) {
            adminApi.checkCoupon(codeCouponCheck).then((res) => {
                setCodeCoupon(res.code);
                setDiscount(res.discountRate ? price * res.discountRate / 100 : 0);
            })
                .catch((e) => toast.error(e?.data?.message));
        }
    }

    const optionStatus = [
        { status: 1, label: "Đăng ký" },
        { status: 2, label: "Đã xác nhận" },
        { status: 3, label: "Đã thanh toán" }
    ];

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
                                <strong>
                                    {type === 1 ? "Sửa thông tin học viên" : "Thêm học viên"}
                                </strong>
                            </CCardHeader>
                            <CCardBody>
                                <CForm
                                    className="row g-3 needs-validation"
                                    noValidate
                                    validated={validated}
                                    onSubmit={handleSubmit}
                                >
                                    <CRow className="g-2">
                                        <h6>Thông tin sản phẩm</h6>
                                        <hr></hr>
                                        <Tab.Container defaultActiveKey={1}>
                                            <Tab.Content>
                                                <div className="row">
                                                    <div className="profile-tabnav-sub">
                                                        <Nav className="nav-tabs">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="1">
                                                                    Khóa học
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="2">
                                                                    Combo
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    </div>
                                                    <div className="tab-content">
                                                        <Tab.Pane eventKey="1">
                                                            <CRow className="g-2">
                                                                <CCol sm={3}>
                                                                    <div className="mb-3">
                                                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                                                            Môn học (<span style={{ color: "red" }}>*</span>)
                                                                        </CFormLabel>
                                                                        <CFormSelect
                                                                            id="autoSizingSelect"
                                                                            onChange={(e) => handleChangeSubject(e.target.value)}
                                                                        >
                                                                            <option value={0}>
                                                                                Chọn Môn học
                                                                            </option>
                                                                            {listSubject?.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item?.id}>
                                                                                        {item?.code}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </CFormSelect>
                                                                    </div>
                                                                </CCol>
                                                                <CCol sm={5}>
                                                                    <div className="mb-3">
                                                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                                                            Khóa học (<span style={{ color: "red" }}>*</span>)
                                                                        </CFormLabel>
                                                                        <CFormSelect
                                                                            id="autoSizingSelect"
                                                                            onChange={(e) => handleSelectPackage(e.target.value)}
                                                                            value={packages ? packages?.id : 0}
                                                                        >
                                                                            <option value={0}>
                                                                                Chọn khóa học
                                                                            </option>
                                                                            {listCBXPackage?.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item?.id}>
                                                                                        {item?.title}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </CFormSelect>
                                                                    </div>
                                                                </CCol>
                                                                <CCol sm={2}>
                                                                    <div className="mb-3">
                                                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                                                            Price (<span style={{ color: "red" }}>*</span>)
                                                                        </CFormLabel>
                                                                        <CFormInput
                                                                            readOnly
                                                                            type="text"
                                                                            value={packages?.salePrice ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(packages?.salePrice) : ""}
                                                                        />
                                                                    </div>
                                                                </CCol>
                                                                <CCol sm={2}>
                                                                    <div className="mb-3" style={{ float: "initial", margin: "32px 0px 10px 10px", }}>
                                                                        <CButton onClick={() => handleAddPackage()}>Thêm</CButton>
                                                                    </div>
                                                                </CCol>
                                                            </CRow>
                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey="2">
                                                            <CRow className="g-2">
                                                                <CCol sm={6}>
                                                                    <div className="mb-3">
                                                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                                                            Khóa học (<span style={{ color: "red" }}>*</span>)
                                                                        </CFormLabel>
                                                                        <CFormSelect
                                                                            id="autoSizingSelect"
                                                                            onChange={(e) => handleSelectCombo(e.target.value)}
                                                                            value={combo ? combo?.id : 0}
                                                                        >
                                                                            <option value={0}>
                                                                                Chọn Combo
                                                                            </option>
                                                                            {listCBXCombo?.map((item, index) => {
                                                                                return (
                                                                                    <option key={index} value={item?.id}>
                                                                                        {item?.title}
                                                                                    </option>
                                                                                );
                                                                            })}
                                                                        </CFormSelect>
                                                                    </div>
                                                                </CCol>
                                                                <CCol sm={2}>
                                                                    <div className="mb-3">
                                                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                                                            Giá (<span style={{ color: "red" }}>*</span>)
                                                                        </CFormLabel>
                                                                        <CFormInput
                                                                            readOnly
                                                                            type="text"
                                                                            value={combo.comboPackages ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(combo.comboPackages.reduce(
                                                                                (pre, x) => pre + x.salePrice,
                                                                                0
                                                                            )) : ""}
                                                                        />
                                                                    </div>
                                                                </CCol>
                                                                <CCol sm={2}>
                                                                    <div className="mb-3" style={{ float: "initial", margin: "32px 0px 10px 10px", }}>
                                                                        <CButton onClick={() => handleAddCombo()}>Thêm</CButton>
                                                                    </div>
                                                                </CCol>
                                                            </CRow>
                                                        </Tab.Pane>

                                                    </div>
                                                </div>
                                            </Tab.Content>
                                        </Tab.Container>
                                        <CCol sm={12}>
                                            <DataTable
                                                columns={columns}
                                                data={listProduct}
                                                paginationServer
                                            />
                                        </CCol>
                                        <CRow className="g-1">
                                            <h6>Thông tin khách hàng</h6>
                                            <hr></hr>
                                            <CCol sm={6}>
                                                <div className="mb-3">
                                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                                        Email (<span style={{ color: "red" }}>*</span>)
                                                    </CFormLabel>
                                                    <CFormInput
                                                        readOnly={type === 1}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        type="email"
                                                        id="exampleFormControlInput1"
                                                        placeholder="name@example.com"
                                                        defaultValue={detailOrder?.user ? detailOrder?.user?.email : detailOrder?.customer?.email}
                                                    />
                                                </div>
                                            </CCol>
                                            <CCol sm={3}>
                                                <div className="mb-3">
                                                    <CFormLabel htmlFor="formFile">
                                                        Họ và tên(
                                                        <span style={{ color: "red" }}>*</span>)
                                                    </CFormLabel>
                                                    <CFormInput
                                                        readOnly={type === 1}
                                                        type="text"
                                                        id="exampleFormControlInput1"
                                                        onChange={(e) => setFullName(e.target.value)}
                                                        placeholder=""
                                                        defaultValue={detailOrder?.user ? detailOrder?.user?.fullname : detailOrder?.customer?.fullName}
                                                    />
                                                </div>
                                            </CCol>
                                            <CCol sm={3}>
                                                <div className="mb-3">
                                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                                        Số điện thoại (<span style={{ color: "red" }}>*</span>)
                                                    </CFormLabel>
                                                    <CFormInput
                                                        readOnly={type === 1}
                                                        type="number"
                                                        id="exampleFormControlInput1"
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder=""
                                                        defaultValue={detailOrder?.user ? detailOrder?.user?.phoneNumber : detailOrder?.customer?.mobile}
                                                    />
                                                </div>
                                            </CCol>
                                        </CRow>
                                        <h6>Thông tin đơn hàng</h6>
                                        <hr></hr>
                                        <CCol sm={6}>
                                            <CRow className="g-2">
                                                <CCol sm={6}>
                                                    <div className="mb-3">
                                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                                            Trạng thái (<span style={{ color: "red" }}>*</span>)
                                                        </CFormLabel>
                                                        <CFormSelect
                                                            aria-label="Default select example"
                                                            onChange={(e) => setStatus(e.target.value)}
                                                        >
                                                            {optionStatus?.map((item, index) => {
                                                                if (type === 1) {
                                                                    return detailOrder?.status ? (
                                                                        <option key={index} value={item?.status} selected>
                                                                            {item?.label}
                                                                        </option>
                                                                    ) : (
                                                                        <option key={index} value={item?.status}>
                                                                            {item?.label}
                                                                        </option>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <option key={index} value={item?.status}>
                                                                            {item?.label}
                                                                        </option>
                                                                    );
                                                                }
                                                            })}
                                                        </CFormSelect>
                                                    </div>
                                                </CCol>
                                                <CCol sm={3}>
                                                    <div className="mb-3">
                                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                                            Mã giảm giá
                                                        </CFormLabel>
                                                        <CFormInput
                                                            readOnly={type === 1}
                                                            onChange={(e) => setCodeCouponCheck(e.target.value)}
                                                            type="text"
                                                            defaultValue={type === 1 ? detailOrder?.coupon?.code : ""}
                                                            id="exampleFormControlInput1"
                                                        />
                                                    </div>
                                                </CCol>
                                                <CCol sm={3}>
                                                    <div className="mb-3" style={{ float: "initial", margin: "32px 0px 10px 10px", }}>
                                                        <CButton type="button" onClick={() => handleCheckCoupon()}>Thêm</CButton>
                                                    </div>
                                                </CCol>
                                                <CCol sm={4}>
                                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                                        Tạm tính:
                                                    </CFormLabel>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                                                </CCol>
                                                <CCol sm={4}>
                                                    <CFormLabel>
                                                        Giảm giá:
                                                    </CFormLabel>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount)}
                                                </CCol>
                                                <CCol sm={4}>
                                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                                        Thành tiền:
                                                    </CFormLabel>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price - discount)}
                                                </CCol>
                                            </CRow>
                                        </CCol>
                                        <CCol sm={6}>
                                            <div className="mb-3">
                                                <CFormLabel htmlFor="exampleFormControlInput1">
                                                    Note (
                                                    <span style={{ color: "red" }}>*</span>)
                                                </CFormLabel>
                                                <CFormTextarea
                                                    id="exampleFormControlTextarea1"
                                                    defaultValue={type === 1 ? detailOrder?.note : ""}
                                                    onChange={(e) =>
                                                        setNote(e.target.value)
                                                    }
                                                    rows="3"
                                                >
                                                </CFormTextarea>
                                            </div>
                                        </CCol>
                                    </CRow>
                                    <div className="mb-3">
                                        <CButton type="submit">Lưu</CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </div>
                <AppFooter />
            </div>
        </div >
    );
}

export default OrderDetail;
