import { SETTING_JOBS } from './types';

export const getJobs = () => {
  return {
    type: SETTING_JOBS,
    payload: {
      request: {
        url: '/nlp/phenotype_jobs/ALL'
      }
    }
  };
};
