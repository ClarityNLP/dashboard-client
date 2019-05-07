import { connect } from "react-redux";
import Documents from "./Documents";

function mapStateToProps(state) {
    return {
        documents: state.app.documents
    };
}

const DocumentsContainer = connect(
    mapStateToProps,
    {}
)(Documents);

export default DocumentsContainer;
