import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import { FaExpand, FaCompress } from 'react-icons/fa';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      content: [],
      limit: 10,
      page: 1
    };
  }

  componentDidMount() {
    this.setContent();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.app.jobs !== this.props.app.jobs ||
      prevProps.app.stats !== this.props.app.stats ||
      prevProps.app.performance !== this.props.app.performance
    ) {
      const { jobs, stats, performance } = this.props.app;
      if (jobs.length > 0 && stats && performance) {
        this.setContent();
      }
    }
  }

  toggle = () => {
    this.setState(state => ({
      toggle: !state.toggle
    }));
  };

  setContent = () => {
    const { jobs, stats, performance } = this.props.app;
    const { limit, page } = this.state;

    if (Array.isArray(jobs)) {
      if (jobs.length > 0) {
        let data = [];
        const start = (page - 1) * limit;
        const limitedJobs = jobs.slice(start, start + limit);

        data = limitedJobs.map((job, i) => {
          const id = job.nlp_job_id;

          return (
            <tr
              key={'job' + i}
              className='job_row'
              onClick={() => {
                this.redirectToJob(id);
              }}
            >
              <td>{job.name}</td>
              <td>
                <Moment format='D MMM YYYY HH:MM' date={job.date_started} />
              </td>
              <td>
                {job.status === 'COMPLETED' ? (
                  <Moment duration={job.date_started} date={job.date_ended} />
                ) : (
                  job.status
                )}
              </td>
              <td>{stats ? stats[id].final_subjects : null}</td>
              <td>
                {performance ? (
                  performance[id].accuracy_score !== 0 ? (
                    performance[id].accuracy_score
                  ) : (
                    <a
                      onClick={() => {
                        this.redirectToJob(id);
                      }}
                    >
                      Validate
                    </a>
                  )
                ) : null}
              </td>
            </tr>
          );
        });

        this.setState({
          content: (
            <table className='table is-hoverable is-striped is-fullwidth'>
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Date</th>
                  <th>Runtime</th>
                  <th>n</th>
                  <th>Accuracy</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </table>
          )
        });
      } else {
        this.setState({
          content: <p>You have no results available.</p>
        });
      }
    } else {
      this.setState({
        content: (
          <p className='has-text-weight-bold'>
            We ran into a problem while getting your results, please try again
            later.
          </p>
        )
      });
    }
  };

  redirectToJob = job_id => {
    window.location =
      'http://' + window._env_.REACT_APP_RESULTS_URL + '?job=' + job_id;
  };

  nextPage = () => {
    const { jobs } = this.props.app;
    const { limit, page } = this.state;
    const last_page = Math.ceil(jobs.length / limit);
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
    const { content, toggle, page, limit } = this.state;
    const { jobs } = this.props.app;

    return (
      <div
        className={
          toggle ? 'card-container expanded results' : 'card-container results'
        }
      >
        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>Results</p>
            <button
              className='card-header-icon expand_button'
              onClick={this.toggle}
            >
              {toggle ? <FaCompress /> : <FaExpand />}
            </button>
          </header>
          <div className='card-content'>
            <div className='results_container'>
              {toggle && jobs.length > 0 ? (
                <nav className='pagination'>
                  <a className='pagination-previous' onClick={this.prevPage}>
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
                        {Math.ceil(jobs.length / limit)}
                      </span>
                    </li>
                  </ul>
                </nav>
              ) : null}
              {content}
            </div>
          </div>
          <div className='card-footer'>
            <div
              className={
                toggle ? 'column is-2 is-offset-10' : 'column is-4 is-offset-8'
              }
            >
              <a
                href={'http://' + window._env_.REACT_APP_RESULTS_URL}
                className='button is-primary is-fullwidth'
              >
                See All Results
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
