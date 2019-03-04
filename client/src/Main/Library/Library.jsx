import React, { Component } from "react";
import Card from "../Card";
import { FaPlay } from "react-icons/fa";

export default class Library extends Component {
    constructor(props) {
        super(props);

        this.state = {
            library_data: []
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.app.jobs !== this.props.app.jobs) {
            this.setContent();
        }
    }

    setContent = () => {
        const { jobs } = this.props.app;

        let data = [];

        data = jobs.map((job, i) => {
            return (
                <tr key={"query" + i} className="query_row">
                    <td>{job.phenotype_name}</td>
                    <td
                        className="run_button"
                        onClick={() => {
                            this.runNlPQL(job.nlpql);
                        }}
                    >
                        <FaPlay />
                    </td>
                </tr>
            );
        });

        this.setState({
            library_data: data
        });
    };

    runNlPQL = nlpql => {
        console.log(nlpql);
    };

    render() {
        const { library_data } = this.state;

        return (
            <Card
                className="library"
                heading="Query Library"
                cta_label="Add Query"
            >
                <div className="library_container">
                    <table className="table is-striped">
                        <thead>
                            <tr>
                                <th>Query Name</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>{library_data}</tbody>
                    </table>
                </div>
            </Card>
        );
    }
}
