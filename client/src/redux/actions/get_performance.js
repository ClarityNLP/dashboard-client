import { SETTING_PERFORMANCE } from './types';

export const getPerformance = IDs => {
  return {
    type: SETTING_PERFORMANCE,
    payload: {
      client: 'nlp',
      request: {
        url: `/nlp/performance/${IDs}`
      }
    }
  };
};
