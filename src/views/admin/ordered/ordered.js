import { CFormInput, CFormSelect } from "@coreui/react";
import Styles from "./style.module.scss";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilLibraryAdd } from "@coreui/icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Row, Col } from "react-bootstrap";

function Ordered() {
  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Người đặt",
      minWidth: "175px",
      width: "200px",
      maxWidth: "225px",
      selector: (row) => row.user ? row.user?.username : row.customer?.fullName,
      sortable: true,
    },
    {
      name: "Số lượng",
      width: "150px",
      center: true,
      selector: (row) => row.orderPackages?.length > 0 ? row.orderPackages?.length + " package" : 1 + " package",
      sortable: true,
    },
    {
      name: "Người hỗ trợ",
      minWidth: "175px",
      width: "200px",
      maxWidth: "225px",
      selector: (row) => row.supporter?.username,
      sortable: true,
    },
    {
      name: "Tổng tiền",
      width: "120px",
      center: "true",
      selector: (row) => row.totalCost + "VNĐ",
      sortable: true,
    },
    {
      name: "Chiết khấu",
      width: "130px",
      center: "true",
      selector: (row) => row.totalDiscount + "VNĐ",
      sortable: true,
    },
    {
      name: "Trạng thái",
      maxWidth: "150px",
      selector: (row) => (
        <div className={`${Number(row?.status) === 3 ? Styles.active : Styles.inactive}`}>
          <strong>{Number(row?.status) === 3 ? "Thanh toán" : "Hủy"}</strong>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Chức năng",
      center: true,
      selector: (row) => (
        <div className={Styles.inputSearch}>
          <button
            onClick={() => {
              window.location.href = row.classId ? "/lrs/admin/registration/" + row?.id : "/lrs/admin/orders/" + row?.id;
            }}
            color="primary"
            style={{
              backgroundColor: "#7367f0",
              height: "30px",
              width: "40px",
              border: "none",
              float: "right",
            }}
          >
            <i className="fa fa-eye"></i>
          </button>
          {Number(row?.status) === 4 ? <button
            style={{
              backgroundColor: "#7367f0",
              height: "30px",
              width: "80px",
              border: "none",
              float: "right",
            }}
            onClick={() => submit(row)}
          >
            Xác minh
          </button>
            : <></>}
        </div>
      ),
    },
  ];
  const [data, setDataTable] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [isModify, setIsModify] = useState(false);
   // eslint-disable-next-line
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const history = useHistory();

  const getAllOrdered = async () => {
    try {
      const response = await adminApi.getAllOrdered(page, itemsPerPage, keywordSearch, category, status);
      console.log(response.data)
      setDataTable(response.data);
      setTotalRows(response.totalItems);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const submit = (row) => {
    confirmAlert({
      title: "Xác nhận thay đổi trạng thái",
      message: "Bạn có chắc về điều này",
      buttons: [
        {
          label: "Có",
          onClick: () => handleUpdateActiveOrdered(row),
        },
        {
          label: "Không",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const handleUpdateActiveOrdered = async (row) => {
    try {
      const response = await adminApi.updateOrder(2, row?.id);
      toast.success(response?.message, {
        duration: 2000,
      });
      setIsModify(!isModify);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const getListCategory = async () => {
    try {
      // const response = await adminApi.getListCategoryOrdered();
      // setListCategory(response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const onSearch = async (e) => {
    setKeywordSearch(e.target.value);
  };

  useEffect(() => {
    getAllOrdered();
    // eslint-disable-next-line
  }, [isModify, keywordSearch, page, status, category]);

  useEffect(() => {
    getListCategory();
  }, []);

  const handlePerRowsChange = async (newPerPage) => {
    setItemsPerPage(newPerPage);
  }

  return (
    <div>
      <AppSidebar />
      <Toaster position="top-center" reverseOrdered={false} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow px-2">
          <div
            style={{
              backgroundColor: "white",
              padding: "5px 0px",
              margin: "0px 0px 15px 0px",
            }}
          >
            <Row className="text-nowrap w-100 my-75 g-0 permission-header">
              <Col xs={12} lg={2}  style={{ padding: "5px 10px" }}>
                <CFormSelect
                  aria-label="Default select example"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value={0}>Tất cả</option>
                  {listCategory.map((item, index) => {
                    return (
                      <option key={index} value={item?.setting_id}>
                        {item?.setting_title}
                      </option>
                    );
                  })}
                </CFormSelect>
              </Col>
              <Col xs={12} lg={2}  style={{ padding: "5px 10px" }}>
                <CFormSelect
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value={0}>Tất cả</option>
                  <option value={3}>Thanh toán</option>
                  <option value={4}>Hủy</option>
                </CFormSelect>
              </Col>
              <Col xs={12} lg={4}  style={{ padding: "5px 10px" }}>
                <CFormInput
                  type="text"
                  id="exampleInputPassword1"
                  
                  placeholder="Tìm kiếm..."
                  onChange={onSearch}
                />
              </Col>
              <Col xs={12} lg={4}  style={{ padding: "5px 10px" }}>
                <button
                  style={{
                    backgroundColor: "#7367f0",
                    border: "none",
                    float: "right",
                    height: "100%",
                    width: "100px",
                    color: "white",
                    borderRadius: "10px",
                    marginRight: "inherit",
                  }}
                  onClick={() => history.push("/admin/subjects/create")}
                >
                  <CIcon icon={cilLibraryAdd} />
                </button>
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
}

export default Ordered;
