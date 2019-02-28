import * as types from "../actions/types";

const initialState = {
    documents: {},
    documents_loading: false,
    documents_error: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SETTING_DOCUMENTS:
            return {
                documents_loading: true
            };
        case types.SETTING_DOCUMENTS_SUCCESS:
            return {
                documents_loading: false,
                documents: action.data
            };
        case types.SETTING_DOCUMENTS_FAIL:
            return {
                documents_loading: false,
                documents_error: action.data
            };
        default:
            return state;
    }
};

export { reducer };
