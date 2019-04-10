import React, { Component } from 'react';
import Card from '../Card';
import { FaPlay, FaTrash } from 'react-icons/fa';
import ResponseModal from './ResponseModal';
import ReactJson from 'react-json-view';
import Loader from '../Loader';
export default class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      modal: null,
      loading: false
    };
  }

  componentDidMount() {
    this.setContent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.app.library !== this.props.app.library) {
      this.setContent();
      this.setState({
        loading: false
      });
    }

    if (prevProps.app.deleting_query !== this.props.app.deleting_query) {
      this.setState({
        loading: true
      });
    }
  }

  setContent = () => {
    const { library } = this.props.app;

    if (Array.isArray(library)) {
      if (library.length > 0) {
        let data = [];

        const reverse_library = library.reverse();

        data = reverse_library.map((query, i) => {
          return (
            <tr
              key={'query' + i}
              className='query_row'
              onClick={() => {
                this.viewQuery(query.nlpql_id);
              }}
            >
              <td>
                <FaTrash
                  className='run_button'
                  onClick={e => {
                    e.stopPropagation();
                    this.props.deleteQuery(query.nlpql_id);
                  }}
                />
              </td>
              <td>{query.nlpql_name}</td>
              <td>{query.nlpql_version}</td>
              <td className='has-text-right'>
                <FaPlay
                  className='run_button'
                  onClick={e => {
                    this.runQuery(e, query.nlpql_raw);
                  }}
                />
              </td>
            </tr>
          );
        });

        this.setState({
          content: (
            <table className='table is-fullwidth is-striped is-fullwidth is-hoverable'>
              <thead>
                <tr>
                  <th />
                  <th>Name</th>
                  <th>Version</th>
                  <th />
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </table>
          )
        });
      } else {
        this.setState({
          content: <p>You have no queries available.</p>
        });
      }
    } else {
      this.setState({
        content: (
          <p className='has-text-weight-bold'>
            We ran into a problem while getting your library, please try again
            later
          </p>
        )
      });
    }
  };

  viewQuery = id => {
    window.location =
      'https://' +
      window._env_.REACT_APP_RESULTS_URL +
      '/runner?query_id=' +
      id;
  };

  runQuery = (event, query) => {
    event.stopPropagation();

    this.props.runNLPQL(query).then(() => {
      const { nlpql_run_results } = this.props.app;

      this.setState({
        modal: (
          <ResponseModal toggle={this.toggleModal} title='Running Job:'>
            <div className='response-json'>
              <ReactJson
                src={nlpql_run_results}
                displayObjectSize={false}
                displayDataTypes={false}
              />
            </div>
          </ResponseModal>
        )
      });
    });
  };

  toggleModal = () => {
    this.setState({
      modal: null
    });
  };

  render() {
    const { content, modal, loading } = this.state;

    return (
      <React.Fragment>
        {modal}
        <Card
          className='library'
          heading='NLPQL'
          cta_label='Add Query'
          cta_href={'http://' + window._env_.REACT_APP_RESULTS_URL + '/runner'}
        >
          {loading ? (
            <Loader />
          ) : (
            <div className='library_container'>{content}</div>
          )}
        </Card>
      </React.Fragment>
    );
  }
}
