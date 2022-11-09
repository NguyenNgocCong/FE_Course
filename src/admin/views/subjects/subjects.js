import {
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import Styles from "./style.module.scss";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { FaDatabase } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilLibraryAdd, cilPen } from "@coreui/icons";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Row, Col } from "react-bootstrap";


function Subjects() {
  const columns = [
    {
      name: "ID",
      width: '50px',
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Subject Code",
      minWidth: '180px',
      width: '200px',
      maxWidth: '220px',
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Name",
      minWidth: '225px',
      width: '250px',
      maxWidth: '275px',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Manager",
      minWidth: '180px',
      width: '200px',
      maxWidth: '220px',
      selector: (row) => (
        <>
          {" "}
          <FaDatabase color="#28C76F" style={{ marginRight: "5px" }} />
          {row.manager?.username}
        </>
      ),
      sortable: true,
    },
    {
      name: "Expert",
      minWidth: '180px',
      width: '200px',
      maxWidth: '220px',
      selector: (row) => row.expert?.username,
      sortable: true,
    },
    {
      name: "Category",
      minWidth: '160px',
      width: '180px',
      maxWidth: '200px',
      selector: (row) => (
        <>
          <div>
            {listCategory.map((category) => {
              return category?.setting_id === row.categoryId
                ? category.setting_title
                : ""
            })
            }
          </div>
        </>
      ),
      sortable: true,
    },
    {
      name: "Status",
      maxWidth: '120px',
      selector: (row) => (
        <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
          {row.status ? "Active" : "Deactivate"}
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
            onClick={() => { window.location.href = "/react/admin/subjects/" + row?.id }}
            color="primary"
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
  const [listSubject, setListSubject] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [isModify, setIsModify] = useState(false);
  const history = useHistory();

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

  const submit = (row) => {

    confirmAlert({
      title: 'Confirm to change status',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleUpdateActiveSubject(row)
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

  const handleUpdateActiveSubject = async (row) => {
    try {
      const params = {
        status: !row?.status,
      };
      const response = await adminApi.updateSubject(params, row?.id);
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

  const getListCategory = async () => {
    try {
      const response = await adminApi.getListCategorySubject();
      setListCategory(response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 7000,
      });
    }
  };

  const onSearch = async (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    getAllSubject();
    // eslint-disable-next-line
  }, [isModify, name, status, category]);

  useEffect(() => {
    getListCategory();
  }, []);

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
                  style={{ margin: "0px 0px", width: "180px" }}
                  aria-label="Default select example"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value={0}>All Category</option>
                  {listCategory?.map((item, index) => {
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
                  style={{ margin: "0px 0px", width: "180px" }}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="">All Status</option>
                  <option value={true}>Active</option>
                  <option value={false}>Deactivate</option>
                </CFormSelect>
              </Col>
              <Col xs={12} lg={4} >
                <CFormInput
                  type="text"
                  id="exampleInputPassword1"
                  placeholder="Search..."
                  onChange={onSearch}
                  style={{ width: "350px" }}
                />
              </Col>
              <Col xs={4} >
                <button
                  style={{ backgroundColor: "#7367f0", border: "none", float: 'right', height: '100%', width: '100px', color: 'white', borderRadius: '10px', marginRight: 'inherit' }}
                  onClick={() =>
                    history.push(
                      "/admin/subjects/create"
                    )
                  }
                >
                  <CIcon icon={cilLibraryAdd} />
                </button>
              </Col>
            </Row>
          </div>
          <DataTable columns={columns} data={listSubject} pagination />
        </div>

        <AppFooter />
      </div>
    </div >
  );
}

export default Subjects;
