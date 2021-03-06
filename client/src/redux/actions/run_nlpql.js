import { RUNNING_NLPQL } from './types';

export const runNLPQL = nlpql => {
  return {
    type: RUNNING_NLPQL,
    payload: {
      request: {
        url: '/nlp/nlpql',
        method: 'post',
        data: nlpql,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }
  };
};
