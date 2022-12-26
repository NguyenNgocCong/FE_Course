import React from "react";
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
} from "@coreui/react";
import { dashboardApi } from "../../../api/dashboardApi";
import { CChartBar, CChartDoughnut, CChartLine } from "@coreui/react-chartjs";
import { getStyle, hexToRgba } from "@coreui/utils";
import toast from "react-hot-toast";
import WidgetsDropdown from "../widgets/widgets-dropdown";
import { AppFooter, AppHeader, AppSidebar } from "../component";
import { useEffect, useState } from "react";
import palette from "./LatestSales/palette";



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



    const data = {
        datasets: [
            {
                data: [63, 15, 22],
                backgroundColor: [
                    palette.primary.main,
                    palette.error.main,
                    palette.warning.main
                ],
                borderWidth: 8,
                borderColor: palette.white,
                hoverBorderColor: palette.white
            }
        ],
        labels: ['Desktop', 'Tablet', 'Mobile']
    };

    const options = {
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: true,
        animation: true,
        cutoutPercentage: 80,
        layout: { padding: 0 },
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            borderWidth: 1,
            borderColor: palette.divider,
            backgroundColor: palette.white,
            titleFontColor: palette.text.primary,
            bodyFontColor: palette.text.secondary,
            footerFontColor: palette.text.secondary
        }
    };
    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <WidgetsDropdown />
                    <CRow>
                        <CCol sm={9}>
                            <CCard className="mb-4" data={data}>
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
                                        <CChartBar
                                            style={{ height: "300px", marginTop: "20px" }}
                                            data={{
                                                labels: data?.turnovers?.map((item) => item[0] + "-" + item[1]),
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
                                                        pointBorderWidth: 4
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
                                                            callback: (value) => value + "VND"
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
                                    </CRow>
                                </CCardBody>
                            </CCard>
                        </CCol>
                        <CCol sm={3}>
                            <CCard>
                                <CCardBody>
                                    <CChartDoughnut
                                        style={{ height: "330px", marginTop: "20px" }}
                                        data={data}
                                        options={options}
                                    />
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow >
                </div >
                <AppFooter />
            </div >
        </>
    );
};

export default Dashboard;
