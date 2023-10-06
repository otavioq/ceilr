import { configureStore } from "@reduxjs/toolkit"

export const INITIAL_STATE = {
    user: null,
    loading: false
};

function reducer(state = INITIAL_STATE, action) {
    const { type, user, loading } = action;
    if (type === 'user') {
        return { ...state, user };
    }

    if (type === 'loader') {
        return { ...state, loading };
    }

    return state;
}

const store = configureStore({reducer});
export default store;
