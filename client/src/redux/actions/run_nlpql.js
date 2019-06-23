import { RUNNING_NLPQL } from './types';

export const runNLPQL = nlpql => {
  return {
    type: RUNNING_NLPQL,
    payload: {
      client: 'nlp',
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
