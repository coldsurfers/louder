import axios from "axios";

export const register = ({ username, email, password }) =>
  axios.post(`/v1/auth/register/`, { username, email, password });
export const login = ({ username, password }) =>
  axios.post(`/v1/auth/login/`, { username, password });
export const checkLogged = (config) => axios.get(`/v1/auth/user/`, config);
export const logout = (config) => axios.post(`/v1/auth/logout/`, {}, config);

export const changeEmail = ({ category, email }, config) =>
  axios.patch(`/v1/auth/user/profile/`, { category, email }, config);
export const changePassword = ({ category, password, passwordCheck }, config) =>
  axios.patch(
    `/v1/auth/user/profile/`,
    { category, password, passwordCheck },
    config
  );
