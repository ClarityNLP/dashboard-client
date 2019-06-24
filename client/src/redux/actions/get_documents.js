import { SETTING_DOCUMENTS } from './types';

export const getDocuments = () => {
  return {
    type: SETTING_DOCUMENTS,
    payload: {
      request: {
        url:
          '/solr/sample/select?facet.field=source&facet=on&fl=facet_counts&indent=on&q=*:*&rows=1&wt=json'
      }
    }
  };
};
