import axiosApi from "./axiosApi";

export const classApi = {
  getAllClass: (page) => {
    return axiosApi.get(`/api/new-class/?page=${page}`);
  },
};
