import axiosApi from "./axiosApi";

export const comboApi = {
  getAllCombo: (page) => {
    return axiosApi.get(`/api/combo/?page=${page}`);
  },
  getComboById: (id) => {
    return axiosApi.get(`/api/combo/${id}`);
  },
};
