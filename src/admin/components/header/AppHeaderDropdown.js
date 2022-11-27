import React, { useState } from "react";
import {
    CAvatar,
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from "@coreui/react";

import avatarProfile from '../../../images/icon/avatar.svg'
import Cookies from "js-cookie";
import { Link, useHistory } from 'react-router-dom';
import { combieImg } from "../../../utils";

const AppHeaderDropdown = () => {
    // eslint-disable-next-line
    const [id, setId] = useState(Cookies.get("id"));
    const user = JSON.parse(Cookies.get("user"));
    const history = useHistory();

    const handleLogout = () => {
        Cookies.remove("id");
        Cookies.remove("username");
        Cookies.remove("access_token");
        Cookies.remove("roles");
        Cookies.remove("user");
        setId(undefined);
        history.push("/");
    }

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle
                placement="bottom-end"
                className="py-0"
                caret={false}
            >
                <CAvatar src={
                    (user?.avatar != null && user?.avatar) ? combieImg(user?.avatar) : avatarProfile}
                    size="md"
                />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end" >
                <CDropdownItem>
                    <Link to="/">
                        Home
                    </Link>
                </CDropdownItem>
                <CDropdownItem>
                    <Link to="/profile">User Profile</Link>
                </CDropdownItem>
                <CDropdownItem>
                    <Link to="/profile">Change Password</Link>
                </CDropdownItem>
                <CDropdownItem onClick={handleLogout} style={{ cursor: 'pointer  ' }}>
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default AppHeaderDropdown;
