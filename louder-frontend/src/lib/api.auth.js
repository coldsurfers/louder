import axios from 'axios';

export const register = ({username, email, password}) => axios.post(`/api/auth/register/`, {username, email, password});
export const login = ({username, password}) => axios.post(`/api/auth/login/`, {username, password});
export const checkLogged = (config) => axios.get(`/api/auth/user/`, config);
export const logout = (config) => axios.post(`/api/auth/logout/`, {}, config);

export const changeEmail = ({category, email}, config) => axios.patch(`/api/auth/user/profile/`, {category, email}, config);
export const changePassword = ({category, password, passwordCheck}, config) => axios.patch(`/api/auth/user/profile/`, {category, password, passwordCheck}, config);
