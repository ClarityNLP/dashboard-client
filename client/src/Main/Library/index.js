import { connect } from "react-redux";
import Library from "./Library";

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

const LibraryContainer = connect(
    mapStateToProps,
    {}
)(Library);

export default LibraryContainer;
