import { connect } from "react-redux";
import Library from "./Library";
import { runNLPQL } from "../../redux/actions/run_nlpql";
import { setJobs } from "../../redux/actions/set_jobs";

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

const LibraryContainer = connect(
    mapStateToProps,
    { runNLPQL, setJobs }
)(Library);

export default LibraryContainer;
