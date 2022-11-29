import { CFormInput, CFormSelect } from "@coreui/react";
import Styles from "./style.module.scss";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilLibraryAdd, cilPen } from "@coreui/icons";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Row, Col } from "react-bootstrap";

function Registration() {
  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Order By",
      minWidth: "175px",
      width: "200px",
      maxWidth: "225px",
      selector: (row) => row.user ? row.user?.username : row.customer?.fullName,
      sortable: true,
    },
    {
      name: "Class code",
      minWidth: "125px",
      width: "150px",
      maxWidth: "175px",
      selector: (row) => row.aclass?.code,
      sortable: true,
    },
    {
      name: "Supporter",
      minWidth: "175px",
      width: "200px",
      maxWidth: "225px",
      selector: (row) => row.supporter?.username,
      sortable: true,
    },
    {
      name: "Total Cost",
      width: "110px",
      center: "true",
      selector: (row) => row.totalCost + "$",
      sortable: true,
    },
    {
      name: "Discount",
      width: "100px",
      center: "true",
      selector: (row) => row.totalDiscount + "$",
      sortable: true,
    },
    {
      name: "Status",
      maxWidth: "110px",
      selector: (row) => (
        <div className={`${Number(row?.status) === 1 ? Styles.active : Styles.inactive}`}>
          <strong>{Number(row?.status) === 1 ? "Submitted" : "Verified"}</strong>
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
            onClick={() => {
              window.location.href = "/lrs/admin/registration/" + row?.id;
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
            {Number(row?.status) === 1 ? "Verification" : "Paid"}
          </button>
          {Number(row?.status) === 1 ? <button
            style={{
              backgroundColor: "#7367f0",
              height: "30px",
              width: "80px",
              border: "none",
              float: "right",
            }}
            onClick={() => submit(row, 4)}
          >
            Cancel
          </button>
            : <></>}
        </div>
      ),
    },
  ];
  const [data, setDataTable] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [isModify, setIsModify] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const history = useHistory();

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
      title: "Confirm to change status",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleUpdateActiveRegistration(row, status),
        },
        {
          label: "No",
          //onClick: () => alert('Click No')
        },
      ],
    });
  };

  const handleUpdateActiveRegistration = async (row, newStatus) => {
    try {
      if(!newStatus) {
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
    <div>
      <AppSidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow px-2">
          <div
            style={{
              backgroundColor: "white",
              padding: "15px 20px",
              margin: "0px 0px 15px 0px",
            }}
          >
            <Row className="text-nowrap w-100 my-75 g-0 permission-header">
              <Col xs={12} lg={2}>
                <CFormSelect
                  style={{ margin: "0px 0px", maxWidth: "180px" }}
                  aria-label="Default select example"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value={0}>All Category</option>
                  {listCategory?.map((item, index) => {
                    return (
                      <option key={index} value={item?.setting_id}>
                        {item?.setting_title}
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
                  style={{ margin: "0px 10px" }}
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
}

export default Registration;
