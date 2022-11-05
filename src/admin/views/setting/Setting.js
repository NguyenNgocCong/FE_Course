import React, { useEffect, useState, useRef } from "react";
import { CButton } from "@coreui/react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import ModalDetailSetting from "../../components/modalDetailSetting/ModalDetailSetting";
import EditDetailSetting from "../../components/modalDetailSetting/EditDetailSetting";
import DeleteDetailsSetting from "../../components/modalDetailSetting/DeleteDetailsSetting";
import { CFormInput, CFormSelect } from "@coreui/react";
import { adminApi } from "../../../api/adminApi";
import { useHistory } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilPen } from "@coreui/icons";

function Setting() {
  const [settingList, setSettingList] = useState([
    {
      setting_title: "test",
      display_order: "order",
      status: "active",
      action: "test",
    },
  ]);
  const [listType, setListType] = useState();
  const [showEdit, setShowEdit] = useState(false);
  const [type, setType] = useState();
  const [status, setStatus] = useState("");
  useEffect(() => {
    const getListType = async () => {
      const res = await adminApi.getListType();
      setListType(res);
    };
    getListType();
  }, []);
  useEffect(() => {
    const getListSetting = async () => {
      const res = await adminApi.getListSetting();
      setSettingList(res);
    };
    getListSetting();
  }, [status, type]);
  const columns = [
    {
      name: "Name",
      selector: (row) => row?.setting_title,
      sortable: true,
    },
    {
      name: "Order",
      selector: (row) => row?.display_order || row?.order,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => (
        <div className="d-flex align-items-center justify-content-center">
          <div className={`${row?.status ? Styles.active : Styles.inactive}`}>
            <strong>{row?.status ? "Active" : "Inactive"}</strong>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row, index) => (
        <div className="my-2 d-flex justify-content-space-between">
          {/* <CButton
            href={"/react/admin/users/" + row?.id}
            style={{ width: "100px" }}
            color="primary"
          >
            <CIcon icon={cilPen} />
          </CButton> */}
          <CButton
            onClick={() => {
              setShowEdit(true);
            }}
          >
            <EditDetailSetting
              isShow={showEdit}
              id={2 || row?.setting_id}
              onCancel={() => {
                setShowEdit(false);
              }}
            />
          </CButton>
          <div className="p-1"></div>
          <CButton color="warning" style={{ width: "100px" }}>
            <DeleteDetailsSetting />
          </CButton>
        </div>
      ),
    },
  ];
  const [isShow, setIsShow] = useState(false);
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />

        <div className={Styles.main}></div>
        <div className={Styles.flexCenter}>
          <div className={Styles.selectFilter}>
            <CFormSelect
              aria-label="Default select example"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="">All Status</option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </CFormSelect>
            <CFormSelect
              aria-label="Default select example"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              {listType?.map((item, index) => (
                <option value={item.type_id} key={index}>
                  {item.title}
                </option>
              ))}
            </CFormSelect>
            <CFormInput type="text" placeholder="Name" />
          </div>
          <div className={Styles.searchFilter}>
            {/* <button
              onClick={() => {
                setIsShow(true);
              }}
            >
              Create New Setting
            </button> */}
            <ModalDetailSetting
              isShow={isShow}
              onCancel={() => {
                setIsShow(false);
              }}
            />
          </div>
        </div>
        <div className="body flex-grow-1 px-3">
          <DataTable columns={columns} data={settingList} pagination />
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default Setting;
