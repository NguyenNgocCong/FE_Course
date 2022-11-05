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

function ModalDetailSetting(isShow, onCancel) {
  const [listType, setListType] = useState();
  const [data, setData] = useState({});
  useEffect(() => {
    const getListType = async () => {
      const res = await adminApi.getListType();
      setListType(res);
    };
    getListType();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async () => {
    try {
      const res = await adminApi.addSetting(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className={Styles.btnCreate}
      >
        Create New Setting
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
          <div className={Styles.rowFlex}>
            <div className={Styles.flexItem}>
              <label>Name</label>
              <CFormInput
                type="text"
                placeholder="Please choose"
                className={Styles.inputForm}
                onChange={(e) => {
                  setData({ ...data, setting_value: e.target.value });
                }}
              />
            </div>
            <div className={Styles.flexItem}>
              <label>Type</label>
              <CFormSelect
                aria-label="Default select example"
                onChange={(e) => {
                  setData({ ...data, type_id: e.target.value });
                }}
              >
                {listType?.map((item, index) => (
                  <option value={item.type_id} key={index}>
                    {item.title}
                  </option>
                ))}
              </CFormSelect>
            </div>
          </div>
          <div className={Styles.rowFlex}>
            <div className={Styles.flexItem}>
              <label>Display Order</label>
              <CFormInput
                type="text"
                placeholder="Please choose"
                className={Styles.inputForm}
                onChange={(e) => {
                  setData({ ...data, display_order: e.target.value });
                }}
              />
            </div>
            <div className={Styles.flexItem}>
              <label>Status</label>
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Active"
                onClick={() => {
                  setData({ ...data, status: true });
                }}
              />
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Inactive"
                onClick={() => {
                  setData({ ...data, status: false });
                }}
                defaultChecked
              />
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <CFormTextarea
              id="exampleFormControlTextarea1"
              label="Description"
              rows="3"
              text="Must be 8-20 words long."
              onChange={(e) => {
                setData({ ...data, desciption: e.target.value });
              }}
            ></CFormTextarea>
          </div>
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

export default ModalDetailSetting;
