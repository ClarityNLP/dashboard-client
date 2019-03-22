import React, { Component } from "react";
import Card from "../Card";
import { FaPlay } from "react-icons/fa";

export default class Library extends Component {
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
        if (prevProps.app.library !== this.props.app.library) {
            this.setContent();
        }
    }

    setContent = () => {
        const { library } = this.props.app;

        if (Array.isArray(library)) {
            if (library.length > 0) {
                let data = [];

                data = library.map((query, i) => {
                    return (
                        <tr key={"query" + i} className="query_row">
                            <td>{query.nlpql_name}</td>
                            <td>{query.version}</td>
                            <td className="has-text-right">
                                <FaPlay
                                    className="run_button"
                                    onClick={() => {
                                        this.props.runNLPQL(query.nlpql_raw);
                                    }}
                                />
                            </td>
                        </tr>
                    );
                });

                this.setState({
                    content: (
                        <table className="table is-fullwidth is-striped is-fullwidth">
                            <tbody>{data}</tbody>
                        </table>
                    )
                });
            } else {
                this.setState({
                    content: <p>You have no queries available.</p>
                });
            }
        } else {
            this.setState({
                content: (
                    <p className="has-text-weight-bold">
                        We ran into a problem while getting your library, please
                        try again later
                    </p>
                )
            });
        }
    };

    render() {
        const { content } = this.state;

        return (
            <Card
                className="library"
                heading="Query Library"
                cta_label="Add Query"
                cta_href={process.env.REACT_APP_QUERY_BUILDER_URL}
            >
                <div className="library_container">{content}</div>
            </Card>
        );
    }
}
