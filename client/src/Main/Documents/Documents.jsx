import React, { Component } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';
import PieChart from 'react-svg-piechart';
import colors from './Colors';
import isEqual from 'lodash.isequal';

export default class Documents extends Component {
  constructor(props) {
    super(props);

    this.min = 5;
    this.max = 20;

    this.state = {
      data: [],
      isError: false,
      message: null,
      num_docs: this.min,
      toggle: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.app.documents !== prevProps.app.documents) {
      this.setContent();
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.documents, this.props.documents)) {
      this.setContent();
    }
  }

  toggle = () => {
    this.setState(
      state => ({
        toggle: !state.toggle,
        num_docs: state.num_docs < this.max ? this.max : this.min
      }),
      this.setContent
    );
  };

  setContent = () => {
    const { num_docs } = this.state;
    const { documents } = this.props;

    if (Array.isArray(documents)) {
      if (documents.length > 0) {
        const data = [];
        let color_count = 0;

        for (let i = 0; i < documents.length; i += 2) {
          let title = documents[i];
          let count = documents[i + 1];

          data.push({
            title: title,
            value: count,
            color: colors[color_count]
          });

          color_count++;
        }

        this.setState({
          data: data.slice(0, num_docs),
          isError: false,
          message: null
        });
      } else {
        this.setState({
          data: [],
          isError: false,
          message: 'There are no documents available.'
        });
      }
    } else {
      this.setState({
        data: [],
        isError: true,
        message:
          'We ran into a problem while getting your documents, please try again later.'
      });
    }
  };

  getLegend = data => {
    return data.map((key, i) => {
      const { value, color, title } = key;
      return (
        <tr key={'legend' + i}>
          <td style={{ backgroundColor: color }} />
          <td>{title}</td>
          <td>{value}</td>
        </tr>
      );
    });
  };

  render() {
    const { data, isError, message, toggle } = this.state;
    let content;

    if (data.length > 0 && !isError) {
      content = <PieChart data={data} />;
    } else if (data.length === 0 && !isError) {
      content = <p>{message}</p>;
    } else {
      content = <p className='has-text-weight-bold'>{message}</p>;
    }

    return (
      <div
        className={
          toggle
            ? 'documents card-container expanded'
            : 'documents card-container'
        }
      >
        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>Documents</p>
            <button
              className='card-header-icon expand_button'
              onClick={this.toggle}
            >
              {toggle ? <FaCompress /> : <FaExpand />}
            </button>
          </header>
          <div className='card-content'>
            <div className='document_pie_chart'>
              <div className='columns card_columns'>
                <div className='column is-half is-narrow'>{content}</div>
                <div className='column is-half is-narrow'>
                  <div className='pie_legend'>
                    <table className='table is-narrow is-fullwidth'>
                      <tbody>{this.getLegend(data)}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='card-footer'>
            <div
              className={
                toggle ? 'column is-2 is-offset-10' : 'column is-4 is-offset-8'
              }
            >
              <a
                href={`${window.location.protocol}//${window._env_.INGEST_URL}/csv`}
                className='button is-primary is-fullwidth'
              >
                Add Documents
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
