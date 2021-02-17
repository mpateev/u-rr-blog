import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// * action creators for fetching posts and users lists
// * fetchPostsAndUsers(), fetchPosts() and fetchUser()
// Using Redux-Thunk as middleware for Redux store, we allowed to use  async requests to API using
// fetch() or axios(). Since a redux store was created using a thunk middleware, the action creator can
// return a function as well as action object.  The function will be automatically called with dispatch
// and getState functions as first and second arguments - it's up to the function to dispatch appropriate
// action to the redux store.
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  //*  "classic" version using lodash functions _.map() and _.uniq()
  //   const userIds = _.uniq(_.map(getState().posts, "userId"));
  //   userIds.forEach((id) => dispatch(fetchUser(id)));
  //
  //*  alternate version using _.chain() function from lodash
  _.chain(getState().posts) // chain posts list
    .map("userId") // as 1st argument to _.map() and 'userId' as 2nd
    .uniq() // call _.uniq() for resulting array and then
    .forEach((id) => dispatch(fetchUser(id))) // forEach() to resulting array
    .value(); // finally execute the whole chain with _.value()
};

// action creator for loading posts from api, with thunk middleware
// will return a function to be dispatch to redux-thunk
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// action creator for loading single user by id from api, with thunk middleware
// will return a function to be dispatch to redux-thunk
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};
