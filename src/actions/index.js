import jsonPlaceholder from '../apis/jsonPlaceholder'

// action creator for loading posts from api, using thunk middleware
//
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({ type: 'FETCH_POSTS', payload: response.data });
}