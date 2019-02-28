import { connect } from "react-redux";
import { setDocuments } from "../redux/actions/set_documents";

import Main from "./Main";

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

const MainContainer = connect(
    mapStateToProps,
    { setDocuments }
)(Main);

export default MainContainer;
