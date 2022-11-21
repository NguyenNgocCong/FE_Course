import axiosApi from "./axiosApi";

export const classApi = {
  getAllClass: (page) => {
    return axiosApi.get(`/api/new-class/views/?page=${page}`);
  },
  getClassById: (id) => {
    return axiosApi.get(`/api/new-class/views/${id}`);
  },
};
