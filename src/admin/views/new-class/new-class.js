import { cilLibraryAdd, cilPen } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CFormInput, CFormSelect } from "@coreui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import Styles from "./style.module.scss";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";

function Class() {
  const columns = [
    {
      name: "STT",
      width: '50px',
      selector: (row, rowIndex) => rowIndex + 1,
      sortable: true,
    },
    {
      name: "Class Code",
      minWidth: '225px',
      width: '250px',
      maxWidth: '275px',
      selector: (row) => row._class?.code,
      sortable: true,
    },
    {
      name: "Package",
      minWidth: '200px',
      width: '240px',
      maxWidth: '280px',
      selector: (row) => row._class?.packages?.title,
      sortable: true,
    },
    {
      name: "Opening day",
      minWidth: '140px',
      width: '160px',
      maxWidth: '180px',
      selector: (row) => new Date(row.startDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Supporter",
      minWidth: '150px',
      width: '200px',
      maxWidth: '250px',
      selector: (row) => row.supporter?.username,
      sortable: true,
    },
    {
      name: "Action",
      center: true,
      selector: (row) => (
        <div className={Styles.inputSearch}>
          <button
            onClick={() => { window.location.href = "/react/admin/new-class/" + row?.id }}
            style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
          >
            <CIcon icon={cilPen} />
          </button>
        </div>
      ),
    },
  ];
  const history = useHistory();
  const [data, setDataTable] = useState([]);
  const [keywordSearch, setKeywordSearch] = useState("");
  // eslint-disable-next-line
  const [isModify, setIsModify] = useState(false);
  const [listTraner, setListPackage] = useState([]);
  const [packages, setPackage] = useState(0);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const getAllClass = async () => {
    try {
      const response = await adminApi.getAllNewClass(page, itemsPerPage, keywordSearch, packages);
      console.log(response)
      setDataTable(response.data);
      setTotalRows(response.totalItems)
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const getListPackage = async () => {
    try {
      const response = await adminApi.getListPackage();
      setListPackage(response.data);
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
    getAllClass();
    // eslint-disable-next-line
  }, [isModify, keywordSearch, status, packages, itemsPerPage, page]);

  useEffect(() => {
    getListPackage();
    // eslint-disable-next-line
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
          <div style={{ backgroundColor: "white", padding: "15px 20px", margin: "0px 0px 15px 0px" }}>
            <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
              <Col xs={12} lg={2}>
                <CFormSelect
                  aria-label="Default select example"
                  style={{ margin: "0px 0px", maxWidth: "180px" }}
                  onChange={(e) => {
                    setPackage(e.target.value);
                  }}
                >
                  <option value={0}>All Package</option>
                  {listTraner?.map((item, index) => {
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
              </Col>
              <Col xs={12} lg={2}>
                <CFormSelect
                  aria-label="Default select example"
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
              <Col xs={12} lg={4} >
                <button
                  style={{ backgroundColor: "#7367f0", border: "none", float: 'right', height: '100%', width: '100px', color: 'white', borderRadius: '10px' }}
                  onClick={() =>
                    history.push(
                      "/admin/new-class/create"
                    )
                  }
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
          /> </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Class;
