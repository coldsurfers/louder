import axios from 'axios';

export const getPostList = ({page}) => axios.get(`/api/list/?page=${page}`);