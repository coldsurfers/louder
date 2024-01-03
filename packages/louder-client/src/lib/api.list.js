import axios from "axios";

export const getPostList = ({ page }) => axios.get(`/v1/post?page=${page}`);
