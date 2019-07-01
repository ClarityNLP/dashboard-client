import React, { Component } from 'react';
import Card from '../Card';
import PieChart from 'react-svg-piechart';
import colors from './Colors';
import isEqual from 'lodash.isequal';

export default class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isError: false,
      message: null
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

  setContent = () => {
    const { documents } = this.props;
    const __this = this;

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

        __this.setState({
          data: data,
          isError: false,
          message: null
        });
      } else {
        __this.setState({
          data: [],
          isError: false,
          message: 'You have no documents available.'
        });
      }
    } else {
      __this.setState({
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
    const { data, isError, message } = this.state;

    let content;

    if (data.length > 0 && !isError) {
      content = <PieChart data={data} />;
    } else if (data.length === 0 && !isError) {
      content = <p>{message}</p>;
    } else {
      content = <p className='has-text-weight-bold'>{message}</p>;
    }

    return (
      <Card
        className='documents'
        heading='Documents'
        cta_label='Add Documents'
        cta_href={'http://' + window._env_.REACT_APP_INGEST_URL + '/csv'}
      >
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
      </Card>
    );
  }
}
