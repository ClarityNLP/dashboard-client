import React, { Component } from "react";
import Navbar from "./Navbar";
import Documents from "./Documents";
import Library from "./Library";
import Results from "./Results";
import Loader from "./Loader";

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            setSocketInterval: null
        };
    }

    componentDidMount() {
        this.props.setSocket();

        const tmp = setInterval(() => {
            this.props.setSocket();
        }, 5000);

        this.setState({
            setSocketInterval: tmp
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.app.socket_error !== this.props.app.socket_error) {
            const { socket_error } = this.props.app;

            if (socket_error.type !== "error") {
                clearInterval(this.state.setSocketInterval);
            } else {
                console.error("Could not connect to service, trying again...");
            }
        }
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
