import { connect } from 'react-redux';
import { getJobs } from '../redux/actions/get_jobs';
import { getStats } from '../redux/actions/get_stats';
import { getPerformance } from '../redux/actions/get_performance';
import { getDocuments } from '../redux/actions/get_documents';
import { getLibrary } from '../redux/actions/get_library';
import {
  connect as connectSocket,
  disconnect as disconnectSocket,
  onDisconnected as onSocketDisconnected,
  onReconnecting as onSocketReconnecting,
  onReconnectSuccess as onSocketReconnectSuccess,
  onReconnectFailure as onSocketReconnectFailure
} from '../redux/actions/socket';
import { receiveStats } from '../redux/actions/stats';
import Main from './Main';

function mapStateToProps(state) {
  return {
    app: state.app,
    socket: state.socket,
    oidc: state.oidc
  };
}

const MainContainer = connect(
  mapStateToProps,
  {
    connectSocket,
    disconnectSocket,
    onSocketDisconnected,
    onSocketReconnecting,
    onSocketReconnectSuccess,
    onSocketReconnectFailure,
    receiveStats,
    getJobs,
    getStats,
    getPerformance,
    getDocuments,
    getLibrary
  }
)(Main);

export default MainContainer;
