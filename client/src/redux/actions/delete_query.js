import { DELETING_QUERY } from './types';

export const deleteQuery = id => {
  return {
    type: DELETING_QUERY,
    payload: {
      request: {
        url: '/nlp/delete_query/' + id
      }
    }
  };
};
