import { connect } from "react-redux";
import { setDocuments } from "../redux/actions/set_documents";
import { setJobs } from "../redux/actions/set_jobs";

import Main from "./Main";

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

const MainContainer = connect(
    mapStateToProps,
    { setDocuments, setJobs }
)(Main);

export default MainContainer;
