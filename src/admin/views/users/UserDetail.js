import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import { AppFooter, AppHeader, AppSidebar } from "../../components";

function UserDetail(props) {
  const [listRole, setListRole] = useState([]);
  const [user, setUser] = useState({});
  const [fullname, setFullname] = useState();
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [note, setNote] = useState();
  const location = useLocation();
  const history = useHistory();
  const [option, setOption] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setPopupAlertType] = useState("primary");
  const [validated, setValidated] = useState(false);
  const id = location.pathname.substring(
    "/admin/users/".length,
    location.pathname.length
  );
  const regUsername = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  const regPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  const getListRole = async () => {
    try {
      const response = await adminApi.getListRole();
      setListRole(response);
    } catch (responseError) {
      console.log(responseError);
    }
  };

  const getUserById = async () => {
    try {
      const response = await adminApi.getUserById(id);
      setUser(response);
      setPhone(response.phoneNumber);
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
    }
  };

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget
      setValidated(true)
      event.preventDefault()
      event.stopPropagation()
      if (form.checkValidity() && !alertVisible) {
        const params = {
          username: user?.username,
          role: option,
        };
        const paramsProfile = {
          username: username,
          fullname: fullname,
          phoneNumber: phone,
          note: note,
        };
        if (option !== user.role && option !== undefined) {
          await adminApi.updateRoleUser(params);
        }
        const responseProfile = await adminApi.updateUserProfile(
          paramsProfile,
          user?.id
        );
        toast.success(responseProfile?.message, {
          duration: 2000,
        });
        history.push("/admin/users");
      } 
    } catch (responseError) {
      toast.error(responseError?.data.message, {
        duration: 2000,
      });
      console.log(responseError);
    }
  };
  useEffect(() => {
    getListRole();
    if (id !== undefined) {
      getUserById();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(phone)
    if (!regUsername.test(username)) {
      setAlertMessage("Username is Invalid");
      setAlertVisible(true);
      setPopupAlertType("danger");
    } else if (!regPhoneNumber.test(phone)) {
      setAlertMessage("Phone Number is Invalid");
      setAlertVisible(true);
      setPopupAlertType("danger");
    } else {
      setAlertVisible(false);
    }
    // eslint-disable-next-line
  }, [username, phone]);


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
                <strong>Change User Info</strong>
              </CCardHeader>
              <CCardBody>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CRow className="g-3 mb-3">
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormInput
                          disabled
                          label="Email"
                          type="email"
                          id="exampleFormControlInput1"
                          placeholder="name@example.com"
                          defaultValue={user?.email}
                        />
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormInput
                          type="text"
                          label="Username"
                          id="exampleFormControlInput1"
                          placeholder=""
                          defaultValue={user?.username}
                          onChange={(e) => setUsername(e.target.value)}
                          feedbackInvalid="Please enter username!"
                          required
                          tooltipFeedback
                        />
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormInput
                          type="text"
                          label="Fullname"
                          id="exampleFormControlInput1"
                          placeholder=""
                          defaultValue={user?.fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          feedbackInvalid="Please enter fullname!"
                          required
                          tooltipFeedback
                        />
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormInput
                          label="Phone Number"
                          id="exampleFormControlInput1"
                          placeholder=""
                          defaultValue={user?.phoneNumber}
                          onChange={(e) => setPhone(e.target.value)}
                          feedbackInvalid="Please enter phone number!"
                          required
                          tooltipFeedback
                        />
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="mb-3">
                        <CFormLabel htmlFor="formFile">
                          Set Roles. Click Ctrl to select multiple
                        </CFormLabel>
                        <CFormSelect
                          aria-label="Default select example"
                          onChange={(e) => setOption(e.target.value)}
                          defaultValue={user?.role}
                        >
                          {listRole?.map((item, index) => {
                            return user?.role === item?.setting_value ? (
                              <option
                                key={index}
                                value={item?.setting_value}
                                selected
                              >
                                {item?.setting_value?.replace("ROLE_", "")}
                              </option>
                            ) : (
                              <option key={index} value={item?.setting_value}>
                                {item?.setting_value?.replace("ROLE_", "")}
                              </option>
                            );
                          })}
                        </CFormSelect>
                      </div>
                    </CCol>
                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlInput1">
                        Note (<span style={{ color: "red" }}>*</span>)
                      </CFormLabel>
                      <CFormTextarea
                        type="text"
                        id="exampleFormControlInput1"
                        rows="3"
                        defaultValue={user?.note}
                        placeholder=""
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                  </CRow>
                  <div
                    className={`alert alert-${alertType} alert-dismissible fade show`}
                    role="alert"
                    style={{display: alertVisible ? "" : "none"}}
                  >
                    {alertMessage}
                  </div>
                  <div className="mb-3">
                    <CButton disabled={alertVisible} type="submit">
                      Save
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
        <AppFooter />
      </div>
    </div >
  );
}

export default UserDetail;