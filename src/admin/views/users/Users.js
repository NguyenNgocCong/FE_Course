import React, { useEffect, useState, } from "react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { adminApi } from "../../../api/adminApi";
import toast, { Toaster } from "react-hot-toast";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import { AiOutlineUser, AiOutlineDatabase } from "react-icons/ai";
import { FaDatabase } from "react-icons/fa";
import {
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";

const Users = () => {

  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "User",
      minWidth: '140px',
      width: '160px',
      maxWidth: '180px',
      selector: (row) => row?.username,
      sortable: true,
    },
    {
      name: "Email",
      minWidth: '225px',
      width: '250px',
      maxWidth: '275px',
      selector: (row) => row?.email,
      sortable: true,
    },
    {
      name: "Fullname",
      minWidth: '150px',
      width: '200px',
      maxWidth: '250px',
      selector: (row) => row?.fullname,
      sortable: true,
    },
    {
      name: "Phone",
      left: true,
      minWidth: '80px',
      width: '110px',
      maxWidth: '120px',
      selector: (row) => row?.phoneNumber,
      sortable: true,
    },
    {
      name: "Role",
      width: '130px',
      center: true,
      selector: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          {row?.role?.replace("ROLE_", "") === "ADMIN"
            ? <AiOutlineDatabase color="#EA5455" />
            : (row?.role?.replace("ROLE_", "") === "GUEST"
              ? <AiOutlineUser color="#7367F0" />
              : <FaDatabase color="#28C76F" />)
          }
          <div style={{ marginLeft: "5px" }}>
            {" "}
            {row?.role?.replace("ROLE_", "")}
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      width: '120px',
      center: true,
      selector: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          <div className={`${row?.active ? Styles.active : Styles.inactive}`}>
            <strong>{row?.active ? "Active" : "Deactivate"}</strong>
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
            onClick={() => { window.location.href = "/lrs/admin/users/" + row?.id }}
            style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
          >
            <CIcon icon={cilPen} />
          </button>
          <button
            style={{ backgroundColor: "#7367f0", height: "30px", width: "80px", border: "none", float: 'right' }}
            onClick={() => submit(row)}
          >
            {row?.active ? "Deactivate" : "Active"}
          </button>
        </div>
      ),
    },
  ];
  const [listRole, setListRole] = useState([]);
  const [data, setDataTable] = useState([]);
  const [isModify, setIsModify] = useState(false);
  const [role, setRole] = useState(0);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const optionsPerPage = [10, 20, 50];
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  const getListUser = async () => {
    try {
      const response = await adminApi.getListUser(page, itemsPerPage, name, status, role);
      setDataTable(response.data);
      setTotalRows(response.totalItems)
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const getListRole = async () => {
    try {
      const response = await adminApi.getListRole();
      setListRole(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const handleUpdateActiveUser = async (row) => {
    try {
      const params = {
        username: row?.username,
        status: row?.active,
      };
      const response = await adminApi.updateActiveUser(params);
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

  const submit = (row) => {

    confirmAlert({
      title: 'Confirm to change status',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleUpdateActiveUser(row)
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

  const onSearch = async (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    getListUser();
    // eslint-disable-next-line
  }, [isModify, name, status, role, itemsPerPage, page]);

  useEffect(() => {
    getListRole();
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
          <div style={{ backgroundColor: "white", padding: "15px 20px", margin: "0px 0px 15px 0px" }} >
            <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
              <Col xs={12} lg={2}>
                <CFormSelect
                  style={{ margin: "0px 0px", maxWidth: "180px" }}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option value={0}>All Role</option>
                  {listRole?.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item?.setting_id}
                      >
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
                  placeholder="Search..."
                  style={{ margin: "0px 10px" }}
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

export default Users;
