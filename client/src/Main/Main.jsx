import React, { Component } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import PieChart from "./PieChart";

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            document_content: []
        };
    }

    componentDidMount() {
        this.props.setDocuments();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.app.documents !== this.props.app.documents) {
            this.setDocumentsContent();
        }
    }

    setDocumentsContent = () => {
        const { documents } = this.props.app;
        const data = [];

        console.log(documents.length);

        if (documents.length > 0) {
            for (let i = 0; i < documents.length; i += 2) {
                let name = documents[i];
                let count = documents[i + 1];

                data.push({
                    title: name,
                    value: count,
                    color:
                        "#" + Math.floor(Math.random() * 16777215).toString(16)
                });
            }
        }

        this.setState({
            document_content: data
        });
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
        const { document_content } = this.state;

        return (
            <React.Fragment>
                <Navbar />
                <div className="dashboard_container">
                    <div className="columns dashboard_columns">
                        <div className="column dashboard_column">
                            <Card
                                className="documents"
                                heading="Documents"
                                cta_label="Add Documents"
                            >
                                <div className="document_pie_chart">
                                    <PieChart
                                        data={[5, 12, 8, 3, 10]}
                                        radius={100}
                                        hole={0}
                                        labels={true}
                                        percent={true}
                                        colors={[
                                            "#43A19E",
                                            "#7B43A1",
                                            "#F2317A",
                                            "#FF9824",
                                            "#58CF6C"
                                        ]}
                                        strokeWidth={3}
                                    />
                                </div>
                            </Card>
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
