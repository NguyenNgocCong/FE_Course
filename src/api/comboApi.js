import axiosApi from "./axiosApi";

export const comboApi = {
  getAllCombo: (page) => {
    return axiosApi.get(`/api/combo/views?page=${page}`);
  },
  getComboById: (id) => {
    return axiosApi.get(`/api/combo/views/${id}`);
  },
};
