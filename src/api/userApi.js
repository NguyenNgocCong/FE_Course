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
  getListAllSubject: () => {
    const url = `/api/subjects/viewsActive`;
    return axiosApi.get(url);
  },

  getListTopViewPost: (top) => {
    const url = `/api/post/top-views?top=${top}`;
    return axiosApi.get(url);
  },

  getListRecentPost: (top) => {
    const url = `/api/post/top-recent?top=${top}`;
    return axiosApi.get(url);
  },

  getInfo: () => {
    const url = `/api/account/info`;
    return axiosApi.get(url);
  },

  getListTopViewPackage: (top) => {
    const url = `/api/package/top-views?top=${top}`;
    return axiosApi.get(url);
  },

  // cart

  addToCard: (ProductToOrderRequest) => {
    const url = `/api/order/add-to-cart`;
    return axiosApi.post(url, ProductToOrderRequest);
  },
  getCarts: (params) => {
    const url = `/api/order/cart`;
    return axiosApi.get(url, { params });
  },
  payCarts: (params) => {
    const url = `/api/order/pay`;
    return axiosApi.post(url, { params });
  },
  orderClass: (body) => {
    const url = `/api/order/create`;
    return axiosApi.post(url, body);
  },
  getMyOrder: (params) => {
    const url = `/api/order/list-detail/`;
    return axiosApi.get(url, { params });
  },
  getMyClass: (params) => {
    const url = `/api/account/list-my-class/`;
    return axiosApi.get(url, { params });
  },
  getMyCourese: (params) => {
    const url = `/api/account/my-courses/`;
    return axiosApi.get(url, { params });
  },
  ActiveMyCourese: (params) => {
    const url = `/api/account/active-course/`;
    return axiosApi.post(url, {}, { params });
  },

  createComment: (body) => {
    const url = `/api/feedback/create/`;
    return axiosApi.post(url, body);
  },
  getCommentPackage: (params) => {
    const url = `/api/feedback/list-package`;
    return axiosApi.get(url, { params });
  },
};
