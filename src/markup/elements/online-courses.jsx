import { CCol, CListGroup, CListGroupItem, CRow } from "@coreui/react";
import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Slider1 from "./slider/slider1";
import { userApi } from "../../api/userApi";
import toast, { Toaster } from "react-hot-toast";

function OnlineCourses() {
  const history = useHistory();
  const [listCategory, setListCategory] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const getListCategory = async () => {
    try {
      const response = await userApi.getListCategoryPost();
      setListCategory(response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const getAllSubject = async () => {
    try {
      const response = await userApi.getListAllSubject();
      setListSubject(response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    getListCategory();
    getAllSubject();
  }, []);
  return (
    <div>
      <CRow>
        <CCol sm={3} style={{ padding: "0px" }}>
          <div
            className="menu-links navbar-collapse justify-content-start"
            id="menuDropdown"
          >
            <CListGroup className="nav navbar-nav d-flex justify-content-end">
              <CListGroupItem className="font-weight-bold list-homepage float-none">
                <span className="d-flex justify-content-between">
                  <span>Knowledge</span>
                  <span>
                    <i className="fa fa-chevron-right"></i>
                  </span>
                </span>
                <ul className="sub-menu right">
                  {listCategory.map((category) => {
                    return (
                      <li key={category?.setting_id}>
                        <div
                          onClick={() => {
                            history.push("/blog", {
                              category: category.setting_id,
                            });
                          }}
                        >
                          {" "}
                          {category.setting_title}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </CListGroupItem>
              <CListGroupItem
                className="font-weight-bold list-homepage"
                onClick={() => {
                  window.location.href = "/lrs/products";
                }}
              >
                All Product
              </CListGroupItem>
              <CListGroupItem
                className="font-weight-bold list-homepage"
                onClick={() => {
                  window.location.href = "/lrs/combos";
                }}
              >
                Combos
              </CListGroupItem>
              <CListGroupItem
                className="font-weight-bold list-homepage"
                onClick={() => {
                  window.location.href = "/lrs/lecturers";
                }}
              >
                Lecturers
              </CListGroupItem>
              {listSubject.splice(0, 6).map((elment) => {
                return (
                  <CListGroupItem
                    key={elment?.id}
                    className="font-weight-bold list-homepage"
                    onClick={() => {
                      history.push("/products", {
                        category: elment?.id,
                      });
                    }}
                  >
                    {elment?.name}
                  </CListGroupItem>
                );
              })}
            </CListGroup>
          </div>
        </CCol>
        <CCol sm={9} style={{ padding: "0px" }}>
          <Slider1 />
        </CCol>
      </CRow>
    </div>
  );
}

export default OnlineCourses;
