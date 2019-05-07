import { connect } from "react-redux";
import {
  connect as connectSocket,
  disconnect as disconnectSocket,
  onDisconnected as onSocketDisconnected,
  onReconnecting as onSocketReconnecting,
  onReconnectSuccess as onSocketReconnectSuccess,
  onReconnectFailure as onSocketReconnectFailure
} from '../redux/actions/socket';
import { receiveStats } from '../redux/actions/stats';
import Main from "./Main";

function mapStateToProps(state) {
    return {
        app: state.app,
        socket: state.socket,
        oidc: state.oidc,
    };
}

const MainContainer = connect(mapStateToProps, {
  connectSocket,
  disconnectSocket,
  onSocketDisconnected,
  onSocketReconnecting,
  onSocketReconnectSuccess,
  onSocketReconnectFailure,
  receiveStats
})(Main);

export default MainContainer;
