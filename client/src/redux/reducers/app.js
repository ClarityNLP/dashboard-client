import * as types from "../actions/types";

const initialState = {
    connecting: false,
    socket: null,
    socket_error: {},
    documents: [],
    jobs: [],
    library: [],
    running_nlpql: false,
    nlpql_run_results: {},
    nlpql_run_error: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SETTING_SOCKET:
            return {
                ...state,
                connecting: true,
                socket: action.data
            };
        case types.SETTING_SOCKET_SUCCESS:
            return {
                ...state,
                connecting: false,
                socket_error: {},
                documents: JSON.parse(action.data.documents),
                library: JSON.parse(action.data.library),
                jobs: JSON.parse(action.data.jobs)
            };
        case types.SETTING_SOCKET_FAIL:
            return {
                ...state,
                socket_error: action.data
            };
        case types.RUNNING_NLPQL:
            return {
                ...state,
                running_nlpql: true
            };
        case types.RUNNING_NLPQL_SUCCESS:
            return {
                ...state,
                running_nlpql: false,
                nlpql_run_results: action.payload.data
            };
        case types.RUNNING_NLPQL_FAIL:
            return {
                ...state,
                running_nlpql: false,
                nlpql_run_error: action.payload
            };
        default:
            return state;
    }
};

export { reducer };
