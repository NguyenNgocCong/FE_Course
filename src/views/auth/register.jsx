import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Images
import logo from "../../images/logowhite.png";
import bannerImg from "../../images/background/bg2.jpg";
import { userApi } from "../../api/userApi";
import { CForm, CFormInput } from "@coreui/react";

function Register(props) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [fullName, setFullName] = useState();
  const [password, setPassword] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setPopupAlertType] = useState("primary");
  const [step, setStep] = useState(0);
  const history = useHistory();

  const handleRegister = async () => {
    const regUsername = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const regEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    // const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&_])[A-Za-z\\d@$!%*?&_]{8,20}$/;
    if (!regUsername.test(username)) {
      setAlertMessage("Định dạng Tên tài khoản không đúng!");
      setAlertVisible(true);
      setPopupAlertType("danger");
      return;
    } else if (!regEmail.test(email)) {
      setAlertMessage("Định dạng Email không đúng!");
      setAlertVisible(true);
      setPopupAlertType("danger");
      return;
    } 

    try {
      const param = {
        username: username,
        email: email,
        password: password,
        fullName: fullName,
      };

      const response = await userApi.registerAccount(param);
      console.log(response);
      setStep(1);
    } catch (responseError) {
      setAlertMessage(responseError?.data?.message);
      setAlertVisible(true);
      setPopupAlertType("danger");
    }
  };

  return (
    <>
      <div className="account-form">
        <div
          className="account-head"
          style={{ backgroundImage: "url(" + bannerImg + ")" }}
        >
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        {step === 0 ? (
          <div className="account-form-inner">
            <div
              className="account-container"
              style={{ maxWidth: "500px", width: "500px" }}
            >
              <div className="heading-bx left">
                <h2 className="title-head">
                  Đăng ký
                </h2>
                <p>
                  Bạn đã có tài khoản?<Link to="/login"> Đăng nhập</Link>
                </p>
              </div>
              <div
                className={`alert alert-${alertType} alert-dismissible fade show`}
                role="alert"
                style={{
                  display: `${alertVisible ? "" : "none"}`,
                }}
              >
                {alertMessage}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
              <CForm className="contact-bx">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="input-group form-group">
                      <CFormInput
                        name="username"
                        type="text"
                        placeholder="Nhập tên tài khoản"
                        required=""
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-group form-group">
                      <CFormInput
                        name="fullname"
                        type="text"
                        placeholder="Nhập họ và tên"
                        required=""
                        className="form-control"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-group form-group">
                      <CFormInput
                        name="email"
                        type="email"
                        placeholder="Nhập địa chỉ email"
                        required=""
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-group form-group">
                      <CFormInput
                        name="email"
                        type="email"
                        placeholder="Nhập số điện thoại"
                        required=""
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-group form-group">
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Nhập mật khẩu"
                        className="form-control"
                        required=""
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="input-group form-group">
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        className="form-control"
                        required=""
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 m-b30">
                    <p
                      className="btn button-md"
                      onClick={() => handleRegister()}
                    >
                      Đăng ký
                    </p>
                  </div>
                </div>
              </CForm>
            </div>
          </div>
        ) : (
          <div className="account-form-inner">
            <div className="account-container">
              <div className="heading-bx left">
                <h2 className="title-head">Thông tin tài khoản</h2>
                <p>
                  Thông tin tài khoản lf link kích hoạt đã được gửi đến email: {email}
                </p>
                <p className="pb-2">Kiểm tra hộp thư email của bạn và đăng nhập ngay!</p>
                <div className="col-lg-12 m-b30 p-0">
                  <p
                    className="btn button-md"
                    onClick={() => history.push("/login")}
                  >
                    Đăng nhập
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
