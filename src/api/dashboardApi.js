import axiosApi from "./axiosApi";

export const dashboardApi = {

    getDataDashboard: ()=>{
        const url = "/api/dashboard/admin-manager";
        return axiosApi.get(url);
    }

};
