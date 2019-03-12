import { RUNNING_NLPQL } from "./types";

export const runNLPQL = nlpql => {
    return {
        type: RUNNING_NLPQL,
        payload: {
            request: {
                url: "nlpql",
                method: "post",
                data: {
                    data: nlpql
                },
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }
    };
};
