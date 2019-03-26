import React, { Component } from "react";
import ReactJson from "react-json-view";

export default class RunResponse extends Component {
    componentDidMount() {
        const htmlClasses = document.getElementsByTagName("html")[0].classList;

        htmlClasses.add("is-clipped");
    }

    componentWillUnmount() {
        const htmlClasses = document.getElementsByTagName("html")[0].classList;

        htmlClasses.remove("is-clipped");
    }

    render() {
        const { data, toggle } = this.props;

        return (
            <div className="modal is-active">
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Running Job:</p>
                        <button
                            className="delete"
                            aria-label="close"
                            onClick={toggle}
                        />
                    </header>
                    <section className="modal-card-body">
                        <div className="response-json">
                            <ReactJson
                                src={data}
                                displayObjectSize={false}
                                displayDataTypes={false}
                            />
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}
