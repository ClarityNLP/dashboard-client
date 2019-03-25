import { connect } from "react-redux";
import { setSocket } from "../redux/actions/set_socket";
import Main from "./Main";

function mapStateToProps(state) {
    return {
        app: state.app,
        oidc: state.oidc,
    };
}

const MainContainer = connect(
    mapStateToProps,
    { setSocket }
)(Main);

export default MainContainer;
