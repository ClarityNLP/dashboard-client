import { connect } from 'react-redux';
import { getJobs } from '../redux/actions/get_jobs';
import { getStats } from '../redux/actions/get_stats';
import { getPerformance } from '../redux/actions/get_performance';
import { getDocuments } from '../redux/actions/get_documents';
import { getLibrary } from '../redux/actions/get_library';
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
  { getJobs, getStats, getPerformance, getDocuments, getLibrary }
)(Main);

export default MainContainer;
