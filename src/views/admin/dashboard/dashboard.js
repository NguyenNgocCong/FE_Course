import React from "react";
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
} from "@coreui/react";
import { dashboardApi } from "../../../api/dashboardApi";
import toast from "react-hot-toast";
import WidgetsDropdown from "../widgets/widgets-dropdown";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { useEffect, useState } from "react";
import { data, options } from "./LatestSales/chart";
import { Bar } from "react-chartjs-2";



const Dashboard = () => {


    const [dataDashboard, setDataDashboard] = useState();
    const getDataDashboard = async () => {
        try {
            const response = await dashboardApi.getDataDashboard();
            setDataDashboard(response)
        } catch (responseError) {
            console.log(responseError)
            toast.error(responseError?.data.message, {
                duration: 2000,
            });
        }
    };
    useEffect(() => {
        getDataDashboard();
        // eslint-disable-next-line
    }, []);



    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <WidgetsDropdown />
                    <CRow>
                        <CCol xs={12} sm={6} lg={9}>
                            <Bar
                                data={data}
                                options={options}
                            />
                        </CCol>
                        <CCol xs={12} sm={6} lg={3}></CCol>
                    </CRow>
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default Dashboard;
