import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import Card from '../Card';

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    this.setContent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.app.jobs !== this.props.app.jobs) {
      this.setContent();
    }
  }

  setContent = () => {
    const { jobs, stats, performance } = this.props.app;

    if (Array.isArray(jobs)) {
      if (jobs.length > 0) {
        let data = [];

        data = jobs.map((job, i) => {
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
              <td>{stats[id].final_subjects}</td>
              <td>
                {performance[id].accuracy_score !== 0 ? (
                  performance[id].accuracy_score
                ) : (
                  <a
                    onClick={() => {
                      this.redirectToJob(id);
                    }}
                  >
                    Validate
                  </a>
                )}
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

  render() {
    const { content } = this.state;

    return (
      <Card
        className='results'
        heading='Results'
        cta_label='See All Results'
        cta_href={'http://' + window._env_.REACT_APP_RESULTS_URL}
      >
        <div className='results_container'>{content}</div>
      </Card>
    );
  }
}
