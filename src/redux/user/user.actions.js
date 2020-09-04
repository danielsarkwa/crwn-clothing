// this is called by components to communicate with the reducer
export const setCurrentUser = user => ({
    type: 'SET_CURRENT_USER',
    payload: user
});
