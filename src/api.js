import axios from 'axios';

const API_URL = 'http://localhost:3000/posts';

export const fetchPosts = () => axios.get(API_URL);
export const deletePost = (postId) => axios.delete(`${API_URL}/${postId}`);
export const createPost = (newPost) => axios.post(API_URL, newPost);

