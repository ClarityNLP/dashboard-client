import { SETTING_STATS } from './types';

export const getStats = IDs => {
  return {
    type: SETTING_STATS,
    payload: {
      request: {
        url: `/nlp/stats/${IDs}`
      }
    }
  };
};
