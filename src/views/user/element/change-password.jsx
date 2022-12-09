import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import { userApi } from "../../../api/userApi";

function ChangePassword(props) {
    const [password, setPassword] = useState();
    const [rePassword, setRePassword] = useState();
    const [alertMessage, setAlertMessage] = useState();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setPopupAlertType] = useState("primary");

    const handleChangeProfile = async () => {
        if ((password !== "") && (password !== rePassword)) {
            setAlertMessage("re input password wrong");
            setAlertVisible(true);
            setPopupAlertType("danger");
            return;
        }

        try {
            const param = {
                password: password,
            };
            const id = Cookies.get("id");
            const response = await userApi.updateInfo(param, id);
            setAlertMessage(response?.message);
            setAlertVisible(true);
            setPopupAlertType("success");
            toast.success(response?.message, {
                duration: 2000,
            });
        } catch (responseError) {
            setAlertMessage(responseError?.data.message);
            setAlertVisible(true);
            setPopupAlertType("danger");
        }
    };

    return (
        <>
            <div className="profile-head">
                <h5>Thay đổi mật khẩu</h5>
            </div>
            <form className="edit-profile">
                <div className="">
                    <div className="form-group row">
                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 ml-auto">
                            <h3>Mật khẩu</h3>
                        </div>
                    </div>
                    <Toaster position="top-right" reverseOrder={true} />
                    <div
                        className={`alert alert-${alertType} fade show`}
                        role="alert"
                        style={{ display: `${alertVisible ? "" : "none"}` }}
                    >
                        {alertMessage}
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Mật khẩu cũ:
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Mật khẩu mới:
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                            Nhập lại mật khẩu:
                        </label>
                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                            <input
                                className="form-control"
                                type="password"
                                onChange={(e) => setRePassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-3"></div>
                    <div className="col-12 col-sm-8 col-md-8 col-lg-7 d-flex align-items-center">
                        <button
                            className="btn btn-ms m-r10 btn-warning mt-2"
                            onClick={() => handleChangeProfile()}
                            >
                            Lưu thay đổi
                        </button>
                        <button
                            className="btn btn-ms btn-secondary mt-2"
                            type="reset"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default ChangePassword;
