import React, { Component } from 'react';
import { FaPlay, FaTrash, FaExpand, FaCompress } from 'react-icons/fa';
import ResponseModal from './ResponseModal';
import ReactJson from 'react-json-view';
import Loader from '../Loader';
export default class Library extends Component {
  constructor(props) {
    super(props);

    this.min = 3;
    this.max = 10;

    this.state = {
      toggle: false,
      content: [],
      limit: this.min,
      page: 1,
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

  toggle = () => {
    this.setState(
      state => ({
        toggle: !state.toggle,
        limit: state.toggle ? this.min : this.max
      }),
      this.setContent
    );
  };

  setContent = () => {
    const { limit, page } = this.state;
    const { library } = this.props.app;

    if (Array.isArray(library)) {
      if (library.length > 0) {
        let data = [];
        const start = (page - 1) * limit;
        const reverse_library = library.reverse().slice(start, start + limit);

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
      window.location.protocol+ '//' +
      window._env_.RESULTS_URL +
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

  nextPage = () => {
    const { library } = this.props.app;
    const { limit, page } = this.state;
    const last_page = Math.ceil(library.length / limit);
    const next = page + 1;

    if (next > last_page) {
      return;
    }

    this.setState(
      state => ({
        page: state.page + 1
      }),
      this.setContent
    );
  };

  prevPage = () => {
    const { page } = this.state;
    const prev = page - 1;

    if (prev < 1) {
      return;
    }

    this.setState(
      state => ({
        page: state.page - 1
      }),
      this.setContent
    );
  };

  render() {
    const { toggle, content, modal, loading, page, limit } = this.state;
    const { library } = this.props.app;

    return (
      <React.Fragment>
        {modal}
        <div
          className={
            toggle
              ? 'card-container expanded library'
              : 'card-container library'
          }
        >
          <div className='card'>
            <header className='card-header'>
              <p className='card-header-title'>NLPQL</p>
              <button
                className='card-header-icon expand_button'
                onClick={this.toggle}
              >
                {toggle ? <FaCompress /> : <FaExpand />}
              </button>
            </header>
            <div className='card-content'>
              {loading ? (
                <Loader />
              ) : (
                <div className='library_container'>
                  {toggle && library.length > 0 ? (
                    <nav className='pagination'>
                      <a
                        className='pagination-previous'
                        onClick={this.prevPage}
                      >
                        Previous
                      </a>
                      <a className='pagination-next' onClick={this.nextPage}>
                        Next page
                      </a>
                      <ul className='pagination-list'>
                        <li>
                          <span className='pagination-ellipsis'>{page}</span>
                        </li>
                        <li>
                          <span className='pagination-ellipsis'>of</span>
                        </li>
                        <li>
                          <span className='pagination-ellipsis'>
                            {Math.ceil(library.length / limit)}
                          </span>
                        </li>
                      </ul>
                    </nav>
                  ) : null}
                  {content}
                </div>
              )}
            </div>
            <div className='card-footer'>
              <div
                className={
                  toggle
                    ? 'column is-2 is-offset-10'
                    : 'column is-4 is-offset-8'
                }
              >
                <a
                  href={`${window.location.protocol}//${window._env_.RESULTS_URL}/runner`}
                  className='button is-primary is-fullwidth'
                >
                  Add Query
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
