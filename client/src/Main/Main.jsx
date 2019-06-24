import React, { Component } from 'react';
import NavbarTop from './NavbarTop/index';
import Documents from './Documents';
import Library from './Library';
import Results from './Results';
import Loader from './Loader';
import Transient from '../auth/Transient';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSpinner, faPlug } from '@fortawesome/free-solid-svg-icons';
import {
  FaCubes,
  FaPoll,
  FaFolder,
  FaChartBar,
  FaBookOpen
} from 'react-icons/fa';
library.add(faBars, faSpinner, faPlug);

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.oidc !== prevProps.oidc) {
      this.props.getJobs().then(() => {
        const { jobs } = this.props.app;

        const IDs = jobs.map(job => {
          return job.nlp_job_id;
        });

        this.props.getStats(IDs);
        this.props.getPerformance(IDs);
      });

      this.props.getDocuments();
      this.props.getLibrary();
    }
  }

  handleSlideoutToggle = event => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  };

  render() {
    const {
      REACT_APP_INGEST_URL,
      REACT_APP_RESULTS_URL,
      REACT_APP_DOCUMETATION_URL
    } = window._env_;

    const { waitingForData } = this.props.app;

    return this.props.oidc.user ? (
      <React.Fragment>
        <nav id='menu' className={this.state.isMenuOpen ? 'open' : ''}>
          <div className='nav-links'>
            <a className='nav-link has-text-centered active'>
              <span className='link-icon is-size-4'>
                <FaPoll />
              </span>
              Dashboard
            </a>
            <a
              href={`http://${REACT_APP_INGEST_URL}`}
              className='nav-link has-text-centered'
            >
              <span className='link-icon is-size-4'>
                <FaFolder />
              </span>
              Documents
            </a>
            <a
              href={`http://${REACT_APP_RESULTS_URL}/runner`}
              className='nav-link has-text-centered'
            >
              <span className='link-icon is-size-4'>
                <FaCubes />
              </span>
              Query Builder
            </a>
            <a
              href={`http://${REACT_APP_RESULTS_URL}`}
              className='nav-link has-text-centered'
            >
              <span className='link-icon is-size-4'>
                <FaChartBar />
              </span>
              Results
            </a>
            <a
              href={REACT_APP_DOCUMETATION_URL}
              className='nav-link has-text-centered'
            >
              <span className='link-icon is-size-4'>
                <FaBookOpen />
              </span>
              Documentation
            </a>
          </div>
        </nav>
        <div id='dashboard'>
          <NavbarTop toggle={this.handleSlideoutToggle} />
          {waitingForData ? (
            <Loader />
          ) : (
            <div className='columns dashboard_columns'>
              <div className='column dashboard_column'>
                <Documents />
                <Library />
              </div>
              <div className='column dashboard_column'>
                <Results />
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    ) : (
      <Transient />
    );
  }
}
