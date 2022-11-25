import { CCol, CListGroup, CListGroupItem, CRow } from "@coreui/react";
import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Slider1 from "./slider/slider1";
import { CContainer } from "@coreui/react";
import { userApi } from "../../api/userApi";
import { adminApi } from "../../api/adminApi";
import toast from "react-hot-toast";
import { comboApi } from "../../api/comboApi";

function OnlineCourses() {
  const history = useHistory();
  const [listCategory, setListCategory] = useState([]);
  const [listPackages, setListPackages] = useState([]);
  const [listPost, setListPost] = useState([]);
	const [resCombo, setResCombo] = useState([]);
	const [subject,setSubject]=useState([]);
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
  const getListPackage = async () => {
    try {
      const response = await adminApi.getAllProduct(0, 5, "", 0, "");
      setListPackages(response.data);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };
  const getListPost = async () => {
    try {
      const response = await userApi.getAllExpert({});

      setListPost(response.data);
    } catch (responseError) {
      console.log(responseError);
    }
  };
	const getListCombo = async () => {
    try {
      const response = await comboApi.getAllCombo(0)
			setResCombo(response.data);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };
  const getAllSubject = async () => {
		try {
				const response = await adminApi.getAllSubject(0, 5, "", 0, "");
				setSubject(response.data);
		} catch (responseError) {
				toast.error(responseError?.data.message, {
						duration: 2000,
				});
		}
};

  useEffect(() => {
    getListCategory();
    getListPackage();
    getListPost();
		getListCombo();
		getAllSubject();
  }, []);
  return (
    <>
      <CContainer xxl>
        <CRow>
          <CCol sm={3} style={{ padding: "0px" }}>
            <div
              className="menu-links navbar-collapse justify-content-start"
              id="menuDropdown"
            >
              <CListGroup className="nav navbar-nav d-flex justify-content-between float-none">
                <CListGroupItem className="ovbl-middle font-weight-bold list-homepage" style={{height:'70px'}}>
                  <span className="d-flex justify-content-between mt-3">
                    <span>Knowledge</span>
                    <span>
                      <i className="fa fa-chevron-right"></i>
                    </span>
                  </span>
                  <ul className="sub-menu right">
                    {listCategory.map((category) => {
                      return (
                        <li key={category?.setting_id}>
                          <Link
                            onClick={() => {
                              history.push("/blog", {
                                category: category.setting_id,
                              });
                            }}
                          >
                            {" "}
                            {category.setting_title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </CListGroupItem>
                <CListGroupItem className="ovbl-middle font-weight-bold list-homepage" style={{height:'70px'}}>
                  <span className="d-flex justify-content-between mt-3">
                    <span>Courses</span>
                    <span>
                      <i className="fa fa-chevron-right"></i>
                    </span>
                  </span>
                  <ul className="sub-menu right">
                    {listPackages.map((category) => {
                      return (
                        <li key={category?.id}>
                          <Link
                            onClick={() => {
                              window.location.href =
                                "/react/courses-details/" + category.id;
                            }}
                          >
                            {" "}
                            {category.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </CListGroupItem>
                <CListGroupItem className="ovbl-middle font-weight-bold list-homepage" style={{height:'70px'}}>
                  <span className="d-flex justify-content-between mt-3">
                    <span>Lecturers</span>
                    <span>
                      <i className="fa fa-chevron-right"></i>
                    </span>
                  </span>
                  <ul className="sub-menu right">
                    {listPost.map((category) => {
                      return (
                        <li key={category?.id}>
                          <Link to={`/lecturers/${category?.id}`}>
                            {" "}
                            {category?.user?.fullname}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </CListGroupItem>
                <CListGroupItem className="ovbl-middle font-weight-bold list-homepage" style={{height:'70px'}}>
								<span className="d-flex justify-content-between mt-3">
                    <span>Combo</span>
                    <span>
                      <i className="fa fa-chevron-right"></i>
                    </span>
                  </span>
                  <ul className="sub-menu right">
                    {resCombo.map((category) => {
                      return (
                        <li key={category?.id}>
                          <Link
                            to={`/combo/${category?.id}`}
                          >
                            {" "}
                            {category.title}
                          </Link>
                        </li>
                      );
                    })}
										</ul>
                </CListGroupItem>
                <CListGroupItem className="ovbl-middle font-weight-bold list-homepage" style={{height:'70px'}}>
								<span className="d-flex justify-content-between mt-3">
                    <span>Subject</span>
                    <span>
                      <i className="fa fa-chevron-right"></i>
                    </span>
                  </span>
                  <ul className="sub-menu right">
                    {subject.map((category) => {
                      return (
                        <li key={category?.id}>
                          <Link
                            to={`/combo/${category?.id}`}
                          >
                            {" "}
                            {category.name}
                          </Link>
                        </li>
                      );
                    })}
										</ul>
                </CListGroupItem>
              </CListGroup>
            </div>
          </CCol>
          <CCol sm={9} style={{ padding: "0px" }}>
            <Slider1 />
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
}

export default OnlineCourses;
