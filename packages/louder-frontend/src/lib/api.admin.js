import axios from 'axios';

export const post = (formData, config) => axios.post(`/api/posts/`, formData, config);
export const getPostList = ({page}, config) => axios.get(`/api/posts/?page=${page}`, config);
export const uploadTracks = (formData, config) => axios.post(`/api/uploads/`, formData, config);
export const filterTracks = ({will_delete_tracks}, header) => axios.post(`/api/filter/`, {will_delete_tracks}, header);
export const filterCover = ({will_delete_cover}, header) => axios.post(`/api/filter/cover/`, {will_delete_cover}, header);
export const getPostDetail = ({id}, config) => axios.get(`/api/posts/${id}`, config);
export const updatePost = ({id}, formData, config) => axios.patch(`/api/posts/${id}/`, formData, config);
export const removePost = ({id}, config) => axios.delete(`/api/posts/${id}/`, config);
export const registerStaff = ({username, password, email}, config) => axios.post(`/api/auth/register/staff/`, {username, password, email}, config);
export const getUserList = ({page}, config) => axios.get(`/api/auth/user/list/?page=${page}`, config);
export const getStaffList = ({page}, config) => axios.get(`/api/auth/staff/list/?page=${page}`, config);
export const deleteUser = ({id}, config) => axios.delete(`/api/auth/user/list/${id}/`, config);
export const deleteStaff = ({id}, config) => axios.delete(`/api/auth/staff/list/${id}/`, config);