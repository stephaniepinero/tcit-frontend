import { fetchPosts as fetchPostsApi } from './api';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const DELETE_POST = 'DELETE_POST';

export const fetchPostsRequest = () => ({ type: FETCH_POSTS_REQUEST });
export const fetchPostsSuccess = (posts) => ({ type: FETCH_POSTS_SUCCESS, payload: posts });
export const fetchPostsFailure = (error) => ({ type: FETCH_POSTS_FAILURE, payload: error });
export const deletePost = (postId) => ({ type: DELETE_POST, payload: postId });

export const fetchPosts = () => {
    return async (dispatch) => {
      dispatch(fetchPostsRequest());
      try {
        const response = await fetchPostsApi();
        dispatch(fetchPostsSuccess(response.data.posts));
      } catch (error) {
        dispatch(fetchPostsFailure(error.message));
      }
    };
  };
  