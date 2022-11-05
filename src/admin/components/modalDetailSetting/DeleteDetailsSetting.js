import React, { useState } from "react";
import { CModal, CButton } from "@coreui/react";
import Styles from "./style.module.scss";
import {
  CModalHeader,
  CModalFooter,
  CModalBody,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CFormCheck,
} from "@coreui/react";
import { adminApi } from "../../../api/adminApi";
import { useEffect } from "react";

function DeleteDetailsSetting(props) {
  const { id } = props;
  const [listType, setListType] = useState();
  const [detailSetting, setDetailSetting] = useState();
  const [data, setData] = useState({});
  useEffect(() => {
    const getListType = async () => {
      const res = await adminApi.getListType();
      const details = await adminApi.getDetailSetting(id);
      setDetailSetting(details);
      setListType(res);
    };
    getListType();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async () => {
    try {
      const res = await adminApi.deleteSetting(id);
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ detailSetting });
  return (
    <div>
      {" "}
      <button
        onClick={() => {
          setShowModal(true);
        }}
        style={{ border: "none", background: "#FFC107", color: "white" }}
        // className={Styles.btnCreate}
      >
        Delete
      </button>
      <CModal
        visible={showModal}
        onClose={() => {
          //   onCancel();
          setShowModal(false);
        }}
        className={Styles.modal}
        size="lg"
      >
        <CModalHeader closeButton>Setting details</CModalHeader>
        <CModalBody style={{ width: "100%" }}>
          <div>Bạn có muốn xóa setting này không ?</div>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleSubmit}>
            Ok
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => {
              //   onCancel();
              setShowModal(false);
            }}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
}

export default DeleteDetailsSetting;
