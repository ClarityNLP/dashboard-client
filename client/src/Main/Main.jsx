import React, { Component } from "react";
import Navbar from "./Navbar";
import Card from "./Card";

export default class Main extends Component {
    componentDidMount() {
        this.props.setDocuments();
    }

    getDocumentsContent = () => {
        const docs = ["doc1", "doc2"];

        return (
            <ul>
                {docs.map((doc, index) => {
                    return <li key={"doc" + index}>{doc}</li>;
                })}
            </ul>
        );
    };

    getLibraryContent = () => {
        const queries = [];

        for (let i = 1; i < 11; i++) {
            queries.push("query" + i);
        }

        return (
            <ul>
                {queries.map((query, index) => {
                    return <li key={"query" + index}>{query}</li>;
                })}
            </ul>
        );
    };

    getResultsContent = () => {
        const jobs = [];

        for (let i = 1; i < 31; i++) {
            jobs.push("job" + i);
        }

        return (
            <ul>
                {jobs.map((job, index) => {
                    return <li key={"job" + index}>{job}</li>;
                })}
            </ul>
        );
    };

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="dashboard_container">
                    <div className="columns dashboard_columns">
                        <div className="column dashboard_column">
                            <Card
                                className="documents"
                                heading="Documents"
                                content={this.getDocumentsContent()}
                                cta_label="Add Documents"
                            />
                            <Card
                                className="library"
                                heading="Query Library"
                                content={this.getLibraryContent()}
                                cta_label="Build Library"
                            />
                        </div>
                        <div className="column dashboard_column">
                            <Card
                                className="results"
                                heading="Results"
                                content={this.getResultsContent()}
                                cta_label="See All Results"
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
