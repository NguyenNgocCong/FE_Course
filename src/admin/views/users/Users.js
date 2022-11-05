import React, { useEffect, useState, useRef } from "react";
import { CButton } from "@coreui/react";
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
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Users = () => {
  const [active, setActive] = useState();
  const history = useHistory();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive("");
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const columns = [
    {
      name: "ID",
      selector: (row) => row?.id,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row?.username || row?.email,
      sortable: true,
    },
    {
      name: "Fullname",
      selector: (row) => row?.fullname,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row?.phoneNumber,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          {row?.role?.replace("ROLE_", "") === "ADMIN" && (
            <AiOutlineDatabase color="#EA5455" />
          )}
          {row?.role?.replace("ROLE_", "") === "MANAGER" ||
            row?.role?.replace("ROLE_", "") === "EXPERT" ? (
            <FaDatabase color="#28C76F" />
          ) : (
            <></>
          )}
          {row?.role?.replace("ROLE_", "") === "GUEST" && (
            <AiOutlineUser color="#7367F0" />
          )}
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
      selector: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          <div className={`${row?.active ? Styles.active : Styles.inactive}`}>
            <strong>{row?.active ? "Active" : "Inactive"}</strong>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row, index) => (
        <div className="my-2 d-flex justify-content-space-between">
          <CButton
            href={"/react/admin/users/" + row?.id}
            style={{ width: "100px" }}
            color="primary"
          >
            <CIcon icon={cilPen} />
          </CButton>
          <div className="p-1"></div>
          <CButton
            color="warning"
            style={{ width: "100px" }}
            onClick={() => submit(row)}
          >
            {row?.active ? "Deactive" : "Active"}
          </CButton>
        </div>
      ),
    },
  ];
  const [listRole, setListRole] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [isModify, setIsModify] = useState(false);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");

  const getListUser = async () => {
    try {
      const response = await adminApi.getListUser(name, status, role, 100);
      setListUser(response);
      console.log(response);
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
        duration: 7000,
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
  }, [isModify, name, status, role]);

  useEffect(() => {
    getListRole();
  }, [])

  return (
    <div>
      <AppSidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        {/* <div className={Styles.filters}>
          <div style={{ marginBottom: "10px" }}>Filters</div>
          <div className={Styles.listFilter}>
            <div className={Styles.filterItem}>
              <label>Role</label>
              <CFormSelect
                aria-label="Default select example"
                style={{ height: "50px" }}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="">All Role</option>
                <option value="ROLE_ADMIN">ADMIN</option>
                <option value="ROLE_GUEST">GUEST</option>
                <option value="ROLE_MANAGER">MANAGER</option>
              </CFormSelect>
            </div>
          </div>
        </div>
            */}
        <div className={Styles.searchParams}>
          <div className={Styles.showEntry}>
            <CFormSelect
              aria-label="Default select example"
              style={{ margin: "0px 0px", width: "140px" }}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value="">All Role</option>
              {listRole?.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item?.setting_value}
                  >
                    {item?.setting_value?.replace(
                      "ROLE_",
                      ""
                    )}
                  </option>
                );
              })}
            </CFormSelect>
            <CFormSelect
              aria-label="Default select example"
              style={{ margin: "0px 10px", width: "140px" }}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="">All Status</option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </CFormSelect>
            <CFormInput
              type="text"
              id="exampleInputPassword1"
              placeholder="Search..."
              onChange={onSearch}
              style={{ width: "350px" }}
            />
          </div>
          <div className={Styles.inputSearch}>
            <button
              style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
              onClick={() =>
                history.push(
                  "/admin/users/create"
                )
              }
            >
              Create New User
            </button>
          </div>
        </div>
        <div className="body flex-grow-1 px-3">
          <DataTable columns={columns} data={listUser} pagination />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default Users;
