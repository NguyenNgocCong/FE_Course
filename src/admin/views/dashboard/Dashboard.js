import React from "react";

import {
   
    CCard,
    CCardBody,
   
    CCol,
   
    CRow,
    
} from "@coreui/react";
import { dashboardApi } from "../../../api/dashboardApi";
import { CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";




import toast, { Toaster } from "react-hot-toast";
import WidgetsBrand from "../widgets/WidgetsBrand";
import WidgetsDropdown from "../widgets/WidgetsDropdown";
import { AppFooter, AppHeader, AppSidebar } from "../../components";
import { useEffect, useState } from "react";



const Dashboard = () => {


    const [dataDashboard,setDataDashboard] = useState();
    const getDataDashboard = async () => {
        try {
            const response = await dashboardApi.getDataDashboard();
            setDataDashboard(response)
            console.log(response)
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
                    <CCard className="mb-4" data={dataDashboard}>
                        <CCardBody>
                            <CRow>
                                <CCol sm={5}>
                                    <h4
                                        id="traffic"
                                        className="card-title mb-0"
                                    >
                                        Doanh thu
                                    </h4>
                                </CCol>
                                
                            </CRow>
                            <CChartLine
                                style={{ height: "300px", marginTop: "40px" }}
                                data={{
                                    labels: dataDashboard?.turnovers?.map((item) => item[0]+"-"+item[1] ),
                                    datasets: [
                                        {
                                            label: "Income",
                                            backgroundColor: hexToRgba(
                                                getStyle("--cui-info"),
                                                10
                                            ),
                                            borderColor: getStyle("--cui-info"),
                                            pointHoverBackgroundColor:
                                                getStyle("--cui-info"),
                                            borderWidth: 2,
                                            data: dataDashboard?.turnovers?.map((item) => item[2]),
                                            fill: true,
                                            pointBorderWidth:4
                                        },
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                drawOnChartArea: false,
                                            },
                                        },
                                        y: {
                                            ticks: {
                                                beginAtZero: true,
                                                maxTicksLimit: 5,
                                                stepSize: Math.ceil(250 / 5),
                                                callback: (value) => value+"VND"
                                            },
                                        },
                                    },
                                    elements: {
                                        line: {
                                            tension: 0.4,
                                        },
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                            hoverBorderWidth: 3,
                                        },
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCard>

                    
                 
                </div>
                <AppFooter />
            </div>
        </>
    );
};

export default Dashboard;
