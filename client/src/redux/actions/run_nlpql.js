import { RUNNING_NLPQL } from "./types";

export const runNLPQL = nlpql => {
    console.log(nlpql);
    return {
        type: RUNNING_NLPQL,
        payload: {
            request: {
                url: "/api/nlp/nlpql",
                method: "post",
                data: nlpql,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }
    };
};
