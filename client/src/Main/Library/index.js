import { connect } from 'react-redux';
import Library from './Library';
import { runNLPQL } from '../../redux/actions/run_nlpql';
import { deleteQuery } from '../../redux/actions/delete_query';

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

const LibraryContainer = connect(
  mapStateToProps,
  { runNLPQL, deleteQuery }
)(Library);

export default LibraryContainer;
