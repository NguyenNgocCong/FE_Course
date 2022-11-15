import React, { useEffect, useState, } from "react";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { adminApi } from "../../../api/adminApi";
import { Toaster } from "react-hot-toast";
import Styles from "./style.module.scss";
import DataTable from "react-data-table-component";
import {
    CFormInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilPen, cilCircle, cilLibraryAdd } from "@coreui/icons";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import { useHistory } from "react-router-dom";

const vacancieTemplate = (props) => {
    return (props?.comboPackages?.map((element, index) => (
        <div key={index} style={{ margin: "2px" }} className="d-flex align-items-center">
            <div className={`${Styles.element}`}>
                <CIcon icon={cilCircle} height="7px" /> Title: {element?._package?.title}, Sale Price: {element?.salePrice}đ
            </div>
        </div>
    )))
}
const Combo = () => {

    const columns = [
        {
            name: "ID",
            width: '50px',
            selector: (row) => row?.id,
            sortable: true,
        },
        {
            name: "Title",
            minWidth: '150px',
            width: '200px',
            maxWidth: '250px',
            selector: (row) => row?.title,
            sortable: true,
        },
        {
            name: "description",
            minWidth: '250px',
            width: '250px',
            maxWidth: '275px',
            selector: (row) => row?.description,
            sortable: true,
        },
        {
            name: "Last update",
            minWidth: '175px',
            width: '200px',
            maxWidth: '225px',
            selector: (row) => row?.updatedDate,
            format: (row) => moment(row.lastLogin).format('hh:MM DD/mm/yyyy'),
            sortable: true,
        },
        {
            name: "Packages",
            left: true,
            minWidth: '350px',
            width: '300',
            maxWidth: '350px',
            selector: (row) => vacancieTemplate(row),
            sortable: true,
        },
        {
            name: "Action",
            center: true,
            selector: (row) => (
                <div className={Styles.inputSearch}>
                    <button
                        onClick={() => { window.location.href = "/react/admin/experts/" + row?.id }}
                        style={{ backgroundColor: "#7367f0", height: "30px", width: "40px", border: "none", float: 'right' }}
                    >
                        <CIcon icon={cilPen} />
                    </button>
                </div>
            ),
        },
    ];
    const [data, setDataTable] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(0);
    const [totalRows, setTotalRows] = useState(0);
    const optionsPerPage = [10, 20, 50];
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    const history = useHistory();

    const getListCombo = async () => {
        try {
            const response = await adminApi.getAllCombo(page, itemsPerPage, keyword);
            setDataTable(response.data);
            setTotalRows(response.totalItems)
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const onSearch = async (e) => {
        setKeyword(e.target.value);
    };
    useEffect(() => {
        getListCombo();
        // eslint-disable-next-line
    }, [itemsPerPage, page, keyword]);

    const handlePerRowsChange = async (newPerPage) => {
        setItemsPerPage(newPerPage);
    }
    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow px-2">
                    <div style={{ backgroundColor: "white", padding: "15px 20px", margin: "0px 0px 15px 0px" }} >
                        <Row className='text-nowrap w-100 my-75 g-0 permission-header'>
                            <Col xs={12} lg={4}>
                                <CFormInput
                                    type="text"
                                    id="exampleInputPassword1"
                                    placeholder="Search..."
                                    onChange={onSearch}
                                />
                            </Col>
                            <Col xs={12} lg={8} className='d-flex justify-content-end'>  <div className={Styles.inputSearch}>
                                <button
                                    style={{ backgroundColor: "#7367f0", border: "none", float: 'right' }}
                                    onClick={() =>
                                        history.push(
                                            "/admin/combos/create"
                                        )
                                    }
                                >
                                    <CIcon icon={cilLibraryAdd} />
                                </button>
                            </div></Col>
                        </Row>
                    </div>
                    <DataTable
                        columns={columns}
                        data={data}
                        paginationTotalRows={totalRows}
                        onChangePage={(page) => setPage(page - 1)}
                        itemsPerPage={itemsPerPage}
                        onChangeRowsPerPage={handlePerRowsChange}
                        pagination
                        paginationServer
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    );
};

export default Combo;
