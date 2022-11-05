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

function EditDetailSetting(props) {
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
      const res = await adminApi.updateSetting(id, data);
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
        style={{ border: "none", background: "#0275D8", color: "white" }}
        // className={Styles.btnCreate}
      >
        Edit
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
                defaultValue={detailSetting?.setting_value}
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
                defaultValue={detailSetting?.type_id}
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
                defaultValue={detailSetting?.display_order}
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
                defaultValue={detailSetting?.status}
                onClick={() => {
                  setData({ ...data, status: true });
                }}
              />
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Inactive"
                defaultValue={detailSetting?.status}
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
              defaultValue={detailSetting?.desciption}
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

export default EditDetailSetting;
