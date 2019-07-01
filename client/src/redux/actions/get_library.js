import { SETTING_LIBRARY } from './types';

export const getLibrary = () => {
  return {
    type: SETTING_LIBRARY,
    payload: {
      request: {
        url: '/nlp/library'
      }
    }
  };
};
