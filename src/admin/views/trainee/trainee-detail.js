import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from "@coreui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function TraineeDetail(props) {
  const [listTrainer, setListTrainer] = useState();
  const [listBranch, setListBranch] = useState();
  const [listSupporter, setListSupporter] = useState();
  const [detailClass, setDetailClass] = useState();
  const [classId, setClassId] = useState(0);
  const [listPackages, setListPackages] = useState([]);
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [dropOutDate, setDropOutDate] = useState();
  const [phone, setPhone] = useState();
  const [status, setStatus] = useState();
  const role = JSON.parse(Cookies.get("user"))?.role;
  const isNotAdmin = role !== "ROLE_ADMIN" ? true : false;
  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.substring(
    "/admin/trainee/".length,
    location.pathname.length,
  );
  const type = id !== "create" ? 1 : 0;

  const getTraineeDetailById = async () => {
    try {
      const response = await adminApi.getTraineeDetailById(id);
      setDetailClass(response);
      setEmail(response?.user?.email);
      setFullName(response?.user?.fullname);
      setPhone(response?.user?.phoneNumber);
      setClassId(response?.id);
      setStatus(response.status);
      setDropOutDate(response?.dropOutDate);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const getListTrainer = async () => {
    try {
      const response = await adminApi.getListExperts(0, 50, "");
      setListTrainer(response.data);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const getListBranch = async () => {
    try {
      const response = await adminApi.getListCategoryBranch();
      setListBranch(response);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const getListSupporter = async () => {
    try {
      const response = await adminApi.getListSupporter();
      setListSupporter(response.data);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const getListPackage = async () => {
    try {
      const response = await adminApi.getAllClass(0, 50, "", 0, "");
      setListPackages(response.data);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const handleUpdateTrainee = async () => {
    try {
      const params = {
        class: classId,
        email: email,
        phone: phone,
        fullname: fullName,
        status: status,
        dropOutDate: dropOutDate,
      };
      console.log(params);

      const response =
        type === 1
          ? await adminApi.updateTrainee(params, id)
          : await adminApi.createClass(params);
      toast.success(response?.message, {
        duration: 2000,
      });
      history.push("/admin/trainee");
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (type === 1) {
      getTraineeDetailById();
    }
    if (role === "ROLE_ADMIN" || role === "ROLE_MANAGER") getListTrainer();
    getListPackage();
    getListSupporter();
    getListBranch();
    // eslint-disable-next-line
  }, []);

  const optionStatus = [
    { status: false, label: "Deactivate" },
    { status: true, label: "Active" },
  ];

  return (
    <div>
      <AppSidebar />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>
                  {type === 1 ? "Change Trainee Info" : "Create New Trainee"}
                </strong>
              </CCardHeader>
              <CCardBody>
                <CRow className="g-3 mb-3">
                  <CCol sm={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        Class (<span style={{ color: "red" }}>*</span>)
                      </CFormLabel>
                      <CFormSelect
                        id="autoSizingSelect"
                        value={classId ? classId : ""}
                        onChange={(e) => setClassId(e.target.value)}
                      >
                        <option value="">Select Class</option>
                        {listPackages?.map((item, index) => {
                          return (
                            <option key={index} value={item?.id}>
                              {item?.code}
                            </option>
                          );
                        })}
                      </CFormSelect>
                    </div>
                  </CCol>
                  <CCol sm={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        Email (<span style={{ color: "red" }}>*</span>)
                      </CFormLabel>
                      <CFormInput
                        disabled
                        type="email"
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </CCol>

                  <CCol sm={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        Status (<span style={{ color: "red" }}>*</span>)
                      </CFormLabel>
                      <CFormSelect
                        aria-label="Default select example"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        {optionStatus?.map((item, index) => {
                          if (type === 1) {
                            return status ? (
                              <option key={index} value={item?.status} selected>
                                {item?.label}
                              </option>
                            ) : (
                              <option key={index} value={item?.status}>
                                {item?.label}
                              </option>
                            );
                          } else {
                            return (
                              <option key={index} value={item?.status}>
                                {item?.label}
                              </option>
                            );
                          }
                        })}
                      </CFormSelect>
                    </div>
                  </CCol>
                  <CCol sm={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="formFile">
                        FullName(
                        <span style={{ color: "red" }}>*</span>)
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="exampleFormControlInput1"
                        placeholder=""
                        defaultValue={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol sm={6}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        Drop-out Date(
                        <span style={{ color: "red" }}>*</span>)
                      </CFormLabel>
                      <CFormInput
                        type="date"
                        id="exampleFormControlInput1"
                        disabled={isNotAdmin}
                        placeholder=""
                        value={
                          dropOutDate
                            ? new Date(dropOutDate).toLocaleDateString("en-CA")
                            : new Date("").toLocaleDateString("en-CA")
                        }
                        onChange={(e) =>
                          setDropOutDate(new Date(e.target.value))
                        }
                      />
                    </div>
                  </CCol>
                  <CCol sm={4}>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        Phone (<span style={{ color: "red" }}>*</span>)
                      </CFormLabel>
                      <CFormInput
                        type="number"
                        id="exampleFormControlInput1"
                        placeholder=""
                        defaultValue={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </CCol>
                </CRow>
                <div className="mb-3">
                  <CButton onClick={() => handleUpdateTrainee()}>Save</CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
        <AppFooter />
      </div>
    </div>
  );
}

export default TraineeDetail;
