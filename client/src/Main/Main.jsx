import React, { Component } from "react";
import Navbar from "./Navbar";
import Documents from "./Documents";
import Library from "./Library";
import Results from "./Results";
import Loader from "./Loader";

export default class Main extends Component {
    componentDidMount() {
        this.props.setSocket();
    }

    componentWillUnmount() {
        this.props.app.socket.close();
    }

    render() {
        const { connecting } = this.props.app;

        return (
            <React.Fragment>
                <Navbar />
                <div className="dashboard_container">
                    {connecting ? (
                        <Loader />
                    ) : (
                        <div className="columns dashboard_columns">
                            <div className="column dashboard_column">
                                <Documents />
                                <Library />
                            </div>
                            <div className="column dashboard_column">
                                <Results />
                            </div>
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}
