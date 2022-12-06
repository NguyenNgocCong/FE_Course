import { CListGroup, CListGroupItem } from "@coreui/react";
import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Slider1 from "./slider/slider1";
import { userApi } from "../../api/userApi";
import toast from "react-hot-toast";
import bg1 from '../../images/background/bg1.jpg';

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
      setListSubject(response)
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };
  if (listCategory?.length === 0) {
    getListCategory();
  }
  if (listSubject?.length === 0) {
    getAllSubject();
  }

  let marginRoot = window.innerHeight - 80 - 445 - 60 >= 20 ? (window.innerHeight - 80 - 445 - 60)/2 : 10;

  

  return (
    <div className="section-area bg-fix ovbl-dark" style={{ backgroundImage: "url(" + bg1 + ")", padding:marginRoot+"px 0px" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-3" style={{ padding: "0px 0px 0px 12px" }} >
            <div
              className="menu-links navbar-collapse"
              id="menuDropdown"
            >
              <CListGroup className="nav navbar-nav d-flex element-home-left">
                <CListGroupItem className="font-weight-bold list-homepage" style={{ minWidth: "310px", height: "45px" }}>
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
                  style={{ minWidth: "250px", height: "45px" }}
                  onClick={() => {
                    window.location.href = "/lrs/products";
                  }}
                >
                  All Product
                </CListGroupItem>
                <CListGroupItem
                  className="font-weight-bold list-homepage"
                  style={{ minWidth: "250px", height: "45px" }}
                  onClick={() => {
                    window.location.href = "/lrs/combos";
                  }}
                >
                  Combos
                </CListGroupItem>
                <CListGroupItem
                  className="font-weight-bold list-homepage"
                  style={{ minWidth: "250px", height: "45px" }}
                  onClick={() => {
                    window.location.href = "/lrs/lecturers";
                  }}
                >
                  Lecturers
                </CListGroupItem>
                {listSubject.splice(0, 7).map((elment) => {
                  return (
                    <CListGroupItem
                      key={elment?.id}
                      className="font-weight-bold list-homepage"
                      style={{ minWidth: "250px", height: "45px" }}
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
          </div>
          <div className="col-md-9 " style={{ padding: "0px 12px" }}>
            <Slider1
            ></Slider1>
          </div>
        </div>
      </div >
    </div>
  );
}

export default OnlineCourses;
