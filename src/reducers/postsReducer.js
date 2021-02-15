// posts reducer will receive current state as [] and action as { type, payload }
// and return new state object as [] based on the current value and action type and payload
//
const postsReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            // got array of fetched posts as payload
            return action.payload;
        default:
            // no type defined - just return the current state or [] as initial value
            return state;
    }
}

export default postsReducer;