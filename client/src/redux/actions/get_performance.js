import { SETTING_PERFORMANCE } from './types';

export const getPerformance = IDs => {
  return {
    type: SETTING_PERFORMANCE,
    payload: {
      request: {
        url: `/nlp/performance/${IDs}`
      }
    }
  };
};
