import * as types from "../actions/types";

const initialState = {
    documents: [],
    documents_loading: false,
    documents_error: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SETTING_DOCUMENTS:
            return {
                ...state,
                documents_loading: true
            };
        case types.SETTING_DOCUMENTS_SUCCESS:
            return {
                ...state,
                documents_loading: false,
                documents: action.payload.data.facet_counts.facet_fields.source
            };
        case types.SETTING_DOCUMENTS_FAIL:
            return {
                ...state,
                documents_loading: false,
                documents_error: action.payload.data
            };
        default:
            return state;
    }
};

export { reducer };
