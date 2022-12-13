import { CFormInput, CFormSelect } from "@coreui/react";
import Styles from "../style.module.scss";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { adminApi } from "../../../../api/adminApi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Row, Col } from "react-bootstrap";

const Registration = (props) => {
  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Tên tài khoản",
      minWidth: "175px",
      width: "200px",
      maxWidth: "225px",
      selector: (row) => row.user ? row.user?.username : row.customer?.fullName,
      sortable: true,
    },
    {
      name: "Email",
      minWidth: "175px",
      width: "200px",
      maxWidth: "225px",
      selector: (row) => row.user ? row.user?.username : row.customer?.fullName,
      sortable: true,
    },
    {
      name: "Số điện thoại",
      minWidth: "175px",
      width: "200px",
      maxWidth: "225px",
      selector: (row) => row.user ? row.user?.username : row.customer?.fullName,
      sortable: true,
    },
    {
      name: "Mã đơn hàng",
      width: "150px",
      center: true,
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Mã lớp học",
      minWidth: "125px",
      width: "150px",
      maxWidth: "175px",
      selector: (row) => row.aclass?.code,
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
      width: "110px",
      center: "true",
      selector: (row) => row.totalCost + "$",
      sortable: true,
    },
    {
      name: "Trạng thái",
      maxWidth: "140px",
      selector: (row) => (
        <div className={`${Number(row?.status) === 1 ? Styles.active : Styles.inactive}`}>
          <strong>{Number(row?.status) === 1 ? "Đã gửi" : "Đã xác minh"}</strong>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Hành động",
      center: true,
      selector: (row) => (
        <div className={Styles.inputSearch}>
          <button
            onClick={() => {
              window.location.href = "/admin/registration/" + row?.id;
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
          <button
            style={{
              backgroundColor: "#7367f0",
              height: "30px",
              width: "80px",
              border: "none",
              float: "right",
            }}
            onClick={() => submit(row)}
          >
            {Number(row?.status) === 1 ? "Xác minh" : "Thanh toán"}
          </button>
          <button
            style={{
              backgroundColor: "#7367f0",
              height: "30px",
              width: "80px",
              border: "none",
              float: "right",
            }}
            onClick={() => submit(row, 4)}
          >
            Hủy
          </button>
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

  const getAllRegistration = async () => {
    try {
      const response = await adminApi.getAllRegistration(page, itemsPerPage, keywordSearch, category, status);
      console.log(response.data)
      setDataTable(response.data);
      setTotalRows(response.totalItems);
    } catch (responseError) {
      toast.error(responseError?.data?.message, {
        duration: 2000,
      });
    }
  };

  const submit = (row, status) => {
    confirmAlert({
      title: "Xác nhận thay đổi trạng thái",
      message: "Bạn có chắc chắn về điều này",
      buttons: [
        {
          label: "Có",
          onClick: () => handleUpdateActiveRegistration(row, status),
        },
        {
          label: "Không",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const handleUpdateActiveRegistration = async (row, newStatus) => {
    try {
      if (!newStatus) {
        if (Number(row?.status) === 1) {
          newStatus = 2;
        } else {
          newStatus = 3;
        }
      }
      console.log(toast)
      const response = await adminApi.updateOrder(newStatus, row?.id);
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
      // const response = await adminApi.getListCategoryRegistration();
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
    getAllRegistration();
    // eslint-disable-next-line
  }, [isModify, keywordSearch, page, status, category]);

  useEffect(() => {
    getListCategory();
  }, []);

  const handlePerRowsChange = async (newPerPage) => {
    setItemsPerPage(newPerPage);
  }

  return (
    <div className="body flex-grow px-2">
      <div
        style={{
          backgroundColor: "white",
          padding: "5px 0px",
          margin: "0px 0px 15px 0px",
        }}
      >
        <Row className="text-nowrap w-100 my-75 g-0 permission-header">
          <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
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
          <Col xs={12} lg={2} style={{ padding: "5px 10px" }}>
            <CFormSelect
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value={0}>Tất cả</option>
              <option value={1}>Đã gửi</option>
              <option value={2}>Đã xác minh</option>
            </CFormSelect>
          </Col>
          <Col xs={12} lg={4} style={{ padding: "5px 10px" }}>
            <CFormInput
              type="text"
              id="exampleInputPassword1"

              placeholder="Tìm kiếm..."
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
  );
}

export default Registration;