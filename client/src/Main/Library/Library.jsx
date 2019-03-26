import React, { Component } from "react";
import Card from "../Card";
import { FaPlay } from "react-icons/fa";
import RunResponse from "./RunResponse";

export default class Library extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: [],
            modal: null
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
                                        this.runQuery(query.nlpql_raw);
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

    runQuery = query => {
        this.props.runNLPQL(query).then(response => {
            const { nlpql_run_results } = this.props.app;

            this.setState({
                modal: (
                    <RunResponse
                        data={nlpql_run_results}
                        toggle={this.toggleModal}
                    />
                )
            });
        });
    };

    toggleModal = () => {
        this.setState({
            modal: null
        });
    };

    render() {
        const { content, modal } = this.state;

        return (
            <React.Fragment>
                {modal}
                <Card
                    className="library"
                    heading="Query Library"
                    cta_label="Add Query"
                    cta_href={
                        "http://" +
                        window._env_.REACT_APP_RESULTS_URL +
                        "/runner"
                    }
                >
                    <div className="library_container">{content}</div>
                </Card>
            </React.Fragment>
        );
    }
}
