import React, { Component } from "react";
import Moment from "react-moment";
import "moment-timezone";
import Card from "../Card";

export default class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.app.jobs !== this.props.app.jobs) {
            this.setContent();
        }
    }

    setContent = () => {
        const { jobs } = this.props.app;

        if (Array.isArray(jobs)) {
            if (jobs.length > 0) {
                let data = [];

                data = jobs.map((job, i) => {
                    return (
                        <tr
                            key={"job" + i}
                            className="job_row"
                            onClick={() => {
                                this.redirectToJob(job.nlp_job_id);
                            }}
                        >
                            <td>{job.name}</td>
                            <td>
                                <Moment
                                    format="D MMM YYYY HH:mm:ss"
                                    date={job.date_started}
                                />
                            </td>
                            <td>
                                {job.status === "COMPLETED" ? (
                                    <Moment
                                        duration={job.date_started}
                                        date={job.date_ended}
                                    />
                                ) : (
                                    job.status
                                )}
                            </td>
                            <td>[cohort size]</td>
                            <td>[accuracy %]</td>
                        </tr>
                    );
                });

                this.setState({
                    content: (
                        <table className="table is-hoverable is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Job</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>n</th>
                                    <th>Accuracy</th>
                                </tr>
                            </thead>
                            <tbody>{data}</tbody>
                        </table>
                    )
                });
            } else {
                this.setState({
                    content: <p>You have no results available.</p>
                });
            }
        } else {
            this.setState({
                content: (
                    <p className="has-text-weight-bold">
                        We ran into a problem while getting your results, please
                        try again later.
                    </p>
                )
            });
        }
    };

    redirectToJob = job_id => {
        window.location =
            process.env.REACT_APP_RESULT_VIEWER_URL + "?job=" + job_id;
    };

    render() {
        const { content } = this.state;

        return (
            <Card
                className="results"
                heading="Results"
                cta_label="See All Results"
                cta_href={process.env.REACT_APP_RESULT_VIEWER_URL}
            >
                <div className="results_container">{content}</div>
            </Card>
        );
    }
}
