import axiosApi from "./axiosApi";

export const adminApi = {
  getListRole: () => {
    const url = "/api/role/roles";
    return axiosApi.get(url);
  },
  getListUser: (page, size, keyword, status, role) => {
    const url = `/api/admin/users?page=${page}&size=${size}&keyword=${keyword}&status=${status}&role=${role}`;
    return axiosApi.get(url);
  },
  updateActiveUser: (params) => {
    const url = "/api/admin/users/active";
    return axiosApi.post(url, params);
  },
  updateRoleUser: (params) => {
    const url = "/api/role/update";
    return axiosApi.post(url, params);
  },
  getUserById: (id) => {
    const url = `/api/admin/users/${id}`;
    return axiosApi.get(url);
  },
  updateUserProfile: (params, id) => {
    const url = `/api/admin/users/update-user?id=${id}`;
    return axiosApi.post(url, params);
  },

  getListManager: () => {
    const url = "/api/admin/users/manager-list";
    return axiosApi.get(url);
  },
  getListUserExpert: () => {
    const url = "/api/admin/users/expert-list";
    return axiosApi.get(url);
  },
  getListTrainer: () => {
    const url = `/api/admin/users/trainer-list`;
    return axiosApi.get(url);
  },

  // Web Contact
  getAllContact: (page, size, keyword, category, status) => {
    const url = `/api/admin/web-contact?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  updateStatusContact: (params, id) => {
    const url = `/api/admin/web-contact/update-status?id=${id}`;
    return axiosApi.put(url, params);
  },
  deleteContact: (id) => {
    const url = `/api/admin/web-contact/delete?id=${id}`;
    return axiosApi.delete(url);
  },
  updateContact: (params, id) => {
    const url = `/api/admin/web-contact/update?id=${id}`;
    return axiosApi.put(url, params);
  },
  // expert
  getListExperts: (page, size, kekword) => {
    const url = `/api/expert?page=${page}&size=${size}&kekword=${kekword}`;
    return axiosApi.get(url);
  },
  // expert
  getExpertById: (id) => {
    const url = `/api/expert/${id}`;
    return axiosApi.get(url);
  },
  // subject
  getAllSubject: (page, size, keyword, category, status) => {
    const url = `/api/subjects?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getSubjectDetail: (id) => {
    const url = `/api/subjects/${id}`;
    return axiosApi.get(url);
  },
  addSubject: (params) => {
    const url = `/api/subjects/create`;
    return axiosApi.post(url, params);
  },
  updateSubject: (params, id) => {
    const url = `/api/subjects/update?id=${id}`;
    return axiosApi.put(url, params);
  },
  managerUpdateSubject: (params) => {
    const url = "/api/subjects/manager-update";
    return axiosApi.put(url, params);
  },

  // class
  getAllClass:  (page, size, keyword, category, status) => {
    const url = `/api/class?page=${page}&size=${size}&category=${category}&keyword=${keyword}&status=${status}`;
    return axiosApi.get(url);
  },
  getClassDetail: (id) => {
    const url = `/api/class/${id}`;
    return axiosApi.get(url);
  },
  createClass: (params) => {
    const url = "/api/class/create";
    return axiosApi.post(url, params);
  },
  updateClass: (params, id) => {
    const url = `/api/class/update?id=${id}`;
    return axiosApi.post(url, params);
  },

  //post
  getAllPost: (title, status) => {
    const url = `/api/post?title=${title}&status=${status}`;
    return axiosApi.get(url);
  },
  getPostById: (id) => {
    const url = `/api/post/${id}`;
    return axiosApi.get(url);
  },
  createPost: (params, image) => {
    const url = `/api/post/create`;
    var formData = new FormData();
    formData.append("image", image);
    formData.append("data", JSON.stringify(params));
    return axiosApi.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  },
  updatePost: (id, params, image) => {
    const url = `/api/post/update`;
    var formData = new FormData();
    formData.append("id", id);
    formData.append("data", JSON.stringify(params));
    formData.append("image", image);
    return axiosApi.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  },

  //slide
  getAllSlider: (status) => {
    const url = `/api/slide/manage?status=${status}`;
    return axiosApi.get(url);
  },
  getSliderById: (id) => {
    const url = `/api/slide/${id}`;
    return axiosApi.get(url);
  },
  createSlider: (image, params) => {
    const url = `/api/slide/create`;
    var formData = new FormData();
    formData.append("image", image);
    console.log(image, params);
    formData.append("data", JSON.stringify(params));
    return axiosApi.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  },
  updateSlider: (id, image, params) => {
    const url = `/api/slide/update`;
    var formData = new FormData();
    formData.append("id", id);
    formData.append("image", image);
    formData.append("data", JSON.stringify(params));
    return axiosApi.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  },

  //product
  getAllProduct: () => {
    const url = `/api/package`;
    return axiosApi.get(url);
  },
  getProductById: (id) => {
    const url = `/api/package/${id}`;
    return axiosApi.get(url);
  },
  createProduct: (params) => {
    const url = "/api/package/create";
    return axiosApi.post(url, params);
  },
  updateProduct: (id, params) => {
    const url = `/api/package/update?id=${id}`;
    return axiosApi.put(url, params);
  },

  //combo
  getAllCombo: () => {
    const url = `/api/combo`;
    return axiosApi.get(url);
  },
  getComboById: (id) => {
    const url = `/api/combo/${id}`;
    return axiosApi.get(url);
  },
  createCombo: (params) => {
    const url = "/api/combo/create";
    return axiosApi.post(url, params);
  },
  updateCombo: (id, params) => {
    const url = `/api/combo/update?id=${id}`;
    return axiosApi.put(url, params);
  },

  getAllSetting: (page, size, type_id, keyword) => {
    const url = `/api/admin/setting/getListSetting?page=${page}&size=${size}&category=${type_id}&keyword=${keyword}`;
    return axiosApi.get(url);
  },
  getSettingById: (id) => {
    const url = `/api/admin/setting/getSetting/${id}`;
    return axiosApi.get(url);
  },
  createSetting: (params) => {
    const url = "/api/admin/setting/addSetting";
    return axiosApi.post(url, params);
  },
  updateSetting: (params) => {
    const url = `/api/admin/setting/updateSetting`;
    return axiosApi.put(url, params);
  },
  getListType: () => {
    const url = `/api/admin/setting/getListType`;
    return axiosApi.get(url);
  },

  //List Category
  getListCategoryPost: () => {
    const url = `/api/admin/setting/list-category-post`;
    return axiosApi.get(url);
  },
  getListCategorySubject: () => {
    const url = `/api/admin/setting/list-category-subject`;
    return axiosApi.get(url);
  },
  getListCategoryWebContact: () => {
    const url = `/api/admin/setting/list-category-WebContact`;
    return axiosApi.get(url);
  },
};
