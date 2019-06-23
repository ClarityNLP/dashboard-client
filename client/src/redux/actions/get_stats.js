import { SETTING_STATS } from './types';

export const getStats = IDs => {
  return {
    type: SETTING_STATS,
    payload: {
      client: 'nlp',
      request: {
        url: `/nlp/stats/${IDs}`
      }
    }
  };
};
