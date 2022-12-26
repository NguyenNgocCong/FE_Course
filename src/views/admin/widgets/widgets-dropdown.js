import React from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsB,
  CCardHeader,
  CCard,
  CCardBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { dashboardApi } from "../../../api/dashboardApi";
import { cilUser, cilRoom, cilBook, cilCart } from '@coreui/icons';
const WidgetsDropdown = () => {
  // const [dataDashboard, setDataDashboard] = useState();
  const [totalTraineeActive, setTotalTraineeActive] = useState();
  const [totalClass, setTotalClass] = useState();
  const [totalSubject, setTotalSubject] = useState();
  const [totalSoldOut, setTotalSoldOut] = useState();
  const getDataDashboard = async () => {
    try {
      const response = await dashboardApi.getDataDashboard();
      // setDataDashboard(response)
      setTotalTraineeActive(response?.totalTraineeActive);
      setTotalClass(response?.totalClass)
      setTotalSubject(response?.totalSubject)
      setTotalSoldOut(response?.totalSoldOut)
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
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsB
              className="mb-4"
              progress={{ color: 'success', value: 89.9 }}
              text="Lorem ipsum dolor sit amet enim."
              title="Widget title"
              value="89.9%"
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsB
              className="mb-4"
              value="12.124"
              title="Widget title"
              progress={{ color: 'info', value: 89.9 }}
              text="Lorem ipsum dolor sit amet enim."
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsB
              className="mb-4"
              value="$98.111,00"
              title="Widget title"
              progress={{ color: 'warning', value: 89.9 }}
              text="Lorem ipsum dolor sit amet enim."
            />
          </CCol>
          <CCol xs={12} sm={6} lg={3}>
            <CWidgetStatsB
              className="mb-4"
              value="2 TB"
              title="Widget title"
              progress={{ color: 'primary', value: 89.9 }}
              text="Lorem ipsum dolor sit amet enim."
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default WidgetsDropdown
