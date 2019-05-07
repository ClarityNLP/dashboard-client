import * as types from '../actions/types';

const initialState = {
  waitingForData: true,
  documents: [],
  jobs: [],
  stats: [],
  performance: [],
  library: [],
  running_nlpql: false,
  nlpql_run_results: {},
  nlpql_run_error: {},
  deleting_query: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_STATS':
      const data = JSON.parse(action.data);
      const {
        documents,
        library,
        jobs,
        stats,
        performance
      } = data;
      return {
        ...state,
        waitingForData: false,
        documents: JSON.parse(documents),
        library: JSON.parse(library),
        jobs: JSON.parse(jobs),
        stats: JSON.parse(stats),
        performance: JSON.parse(performance)
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
    default:
      return state;
  }
};

export { reducer };
