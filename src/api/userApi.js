import axiosApi from "./axiosApi";

export const userApi = {
  loginGoogle: (params) => {
    const url = "/api/oauth2/google";
    return axiosApi.post(url, params);
  },
  registerAccount: (params) => {
    const url = "/api/account/register";
    return axiosApi.post(url, params);
  },
  loginAccount: (params) => {
    const url = "/api/account/login";
    return axiosApi.post(url, params);
  },
  forgetPassword: (params) => {
    const url = "/api/account/forgot-password";
    return axiosApi.post(url, params);
  },
  resetPassword: (token, params) => {
    const url = "/api/account/reset-password/" + token;
    return axiosApi.post(url, params);
  },
  getUserDetail: () => {
    const url = "/api/account/info";
    return axiosApi.get(url);
  },
  updateInfo: (params, id) => {
    console.log(params);
    const url = `/api/account/update-info?id=${id}`;
    return axiosApi.put(url, params);
  },
  uploadAvatar: (params) => {
    const url = "/api/account/upload-avatar";
    return axiosApi.post(url, params);
  },
  getAvatar: (imageName) => {
    const url = "/api/account/downloadFile/" + imageName;
    return axiosApi.get(url);
  },

  // Web Contact
  sendContact: (params) => {
    const url = "/api/web-contact/add";
    return axiosApi.post(url, params);
  },

  //expert
  getAllExpert: (params) => {
    const url = `/api/expert/views`;
    return axiosApi.get(url, { params });
  },
  getAllExpertId: (id) => {
    const url = `/api/expert/views/${id}`;
    return axiosApi.get(url);
  },

  //Blog
  getAllPost: (params) => {
    const url = `/api/post/views`;
    return axiosApi.get(url, { params: params });
  },

  getPostById: (id) => {
    const url = `/api/post/views/${id}`;
    return axiosApi.get(url);
  },

  getAllSlider: () => {
    const url = `/api/slide/views`;
    return axiosApi.get(url);
  },

  getListCategoryWebContact: () => {
    const url = `/api/admin/setting/list-category-WebContact`;
    return axiosApi.get(url);
  },
  getListCategoryPost: () => {
    const url = `/api/admin/setting/list-category-post`;
    return axiosApi.get(url);
  },
  getListCategorySubject: () => {
    const url = `/api/subjects/viewsActive`;
    return axiosApi.get(url);
  },

  getListTopViewPost: () => {
    const url = `/api/post/top-views`;
    return axiosApi.get(url);
  },
  getListTopViewPackage: () => {
    const url = `/api/package/top-views`;
    return axiosApi.get(url);
  },
};
