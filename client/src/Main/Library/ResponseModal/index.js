import React, { Component } from 'react';

export default class ResponseModal extends Component {
  componentDidMount() {
    const htmlClasses = document.getElementsByTagName('html')[0].classList;

    htmlClasses.add('is-clipped');
  }

  componentWillUnmount() {
    const htmlClasses = document.getElementsByTagName('html')[0].classList;

    htmlClasses.remove('is-clipped');
  }

  render() {
    const { title, toggle, children } = this.props;

    return (
      <div className='modal is-active'>
        <div className='modal-background' />
        <div className='modal-card'>
          <header className='modal-card-head'>
            <p className='modal-card-title'>{title}</p>
            <button className='delete' aria-label='close' onClick={toggle} />
          </header>
          <section className='modal-card-body'>{children}</section>
        </div>
      </div>
    );
  }
}
