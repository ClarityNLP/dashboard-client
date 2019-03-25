import React, { Component } from "react";
import Card from "../Card";
import PieChart from "./PieChart";
import colors from "./Colors";

export default class Documents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentDidMount() {
        this.setContent();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.app.documents !== this.props.app.documents) {
            this.setContent();
        }
    }

    setContent = () => {
        const { documents } = this.props.app;
        let tmp_content;

        if (Array.isArray(documents)) {
            if (documents.length > 0) {
                const data = [];
                let color_count = 0;

                for (let i = 0; i < documents.length; i += 2) {
                    let label = documents[i];
                    let count = documents[i + 1];

                    data.push({
                        label: label,
                        value: count,
                        color: colors[color_count]
                    });

                    color_count++;
                }

                tmp_content = <PieChart data={data} radius={100} />;
            } else {
                tmp_content = <p>You have no documents available.</p>;
            }
        } else {
            tmp_content = (
                <p className="has-text-weight-bold">
                    We ran into a problem while getting your documents, please
                    try again later.
                </p>
            );
        }

        this.setState({
            content: tmp_content
        });
    };

    render() {
        const { content } = this.state;

        return (
            <Card
                className="documents"
                heading="Documents"
                cta_label="Add Documents"
                cta_href={
                    "http://" + window._env_.REACT_APP_INGEST_URL + "/csv"
                }
            >
                <div className="document_pie_chart">{content}</div>
            </Card>
        );
    }
}
