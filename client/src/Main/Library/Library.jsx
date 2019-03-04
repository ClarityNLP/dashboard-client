import React, { Component } from "react";
import Card from "../Card";

export default class Library extends Component {
    getLibraryContent = () => {};

    render() {
        return (
            <Card
                className="library"
                heading="Query Library"
                cta_label="Build Library"
            />
        );
    }
}
