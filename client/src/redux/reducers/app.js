import * as types from '../actions/types';

const initialState = {
  waitingForJobs: true,
  waitingForStats: true,
  waitingForPerformance: true,
  waitingForDocuments: true,
  waitingForLibrary: true,
  documents: [],
  jobs: [],
  stats: null,
  performance: null,
  library: [],
  running_nlpql: false,
  nlpql_run_results: {},
  nlpql_run_error: {},
  deleting_query: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    case types.DELETING_QUERY:
      return {
        ...state,
        deleting_query: true
      };
    case types.DELETING_QUERY_SUCCESS:
      return {
        ...state,
        deleting_query: false
      };
    case types.DELETING_QUERY_FAIL:
      return {
        ...state,
        deleting_query: false
      };
    case types.SETTING_JOBS:
      return {
        ...state,
        waitingForJobs: true
      };
    case types.SETTING_JOBS_SUCCESS:
      return {
        ...state,
        waitingForJobs: false,
        jobs: action.payload.data
      };
    case types.SETTING_JOBS_FAIL:
      return {
        ...state,
        waitingForJobs: false,
        jobs: action.payload.data
      };
    case types.SETTING_STATS:
      return {
        ...state,
        waitingForStats: true
      };
    case types.SETTING_STATS_SUCCESS:
      return {
        ...state,
        waitingForStats: false,
        stats: action.payload.data
      };
    case types.SETTING_STATS_FAIL:
      return {
        ...state,
        waitingForStats: false,
        stats: action.data
      };
    case types.SETTING_PERFORMANCE:
      return {
        ...state,
        waitingForPerformance: true
      };
    case types.SETTING_PERFORMANCE_SUCCESS:
      return {
        ...state,
        waitingForPerformance: false,
        performance: action.payload.data
      };
    case types.SETTING_PERFORMANCE_FAIL:
      return {
        ...state,
        waitingForPerformance: false,
        performance: action.data
      };
    case types.SETTING_DOCUMENTS:
      return {
        ...state,
        waitingForDocuments: true
      };
    case types.SETTING_DOCUMENTS_SUCCESS:
      return {
        ...state,
        waitingForDocuments: false,
        documents: action.payload.data.facet_counts.facet_fields.source
      };
    case types.SETTING_DOCUMENTS_FAIL:
      return {
        ...state,
        waitingForDocuments: false,
        documents: action.data
      };
    case types.SETTING_LIBRARY:
      return {
        ...state,
        waitingForLibrary: true
      };
    case types.SETTING_LIBRARY_SUCCESS:
      return {
        ...state,
        waitingForLibrary: false,
        library: action.payload.data
      };
    case types.SETTING_LIBRARY_FAIL:
      return {
        ...state,
        waitingForLibrary: false,
        library: action.data
      };
    default:
      return state;
  }
};

export { reducer };
