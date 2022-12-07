import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CWidgetStatsC,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { dashboardApi } from "../../../api/dashboardApi";
import {cilUser,cilRoom,cilBook,cilCart} from '@coreui/icons';
const WidgetsDropdown = () => {


  const [dataDashboard, setDataDashboard] = useState();
  const [totalTraineeActive, setTotalTraineeActive] = useState();
  const [totalClass, setTotalClass] = useState();
  const [totalSubject, setTotalSubject] = useState();
  const [totalSoldOut, setTotalSoldOut] = useState();
  const getDataDashboard = async () => {
    try {
      const response = await dashboardApi.getDataDashboard();
      setDataDashboard(response)
      setTotalTraineeActive(response?.totalTraineeActive);
      setTotalClass(response?.totalClass)
      setTotalSubject(response?.totalSubject)
      setTotalSoldOut(response?.totalSoldOut)
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
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsC
          className="mb-4"
          color=""
          icon={<CIcon icon={cilUser} height={36} />}
          value={totalTraineeActive}
          progress={{ value: 100 }}
          title="Trainee Active"/>
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsC
          className="mb-4"
          color=""
          value={totalClass}
          title="Classes"
          progress={{color:"success", value: 100 }}
          icon={<CIcon icon={cilRoom} height={36} />}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsC
          className="mb-4"
          color=""
          value={totalSubject}
          title="Subjects"
          progress={{color:"warning", value: 100 }}
          icon={<CIcon icon={cilBook} height={36} />}
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsC
          className="mb-4"
          icon={<CIcon icon={cilCart} height={36} />}
          progress={{color:"danger", value: 100 }}
          value={totalSoldOut}
          title="Sold Out"
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
