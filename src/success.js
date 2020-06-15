import React from 'react';
import './App.css';
import success from './images/success.svg';

export default class Success extends React.Component {
  render() {
    const {
      active,
      handleOnClick,
    } = this.props;
    const successMessage = (active === 'signUp' ? 'Вы зарегистрированы' : 'Вы авторизованы');
    const image = (active === 'signUp' ? <img className="success" onClick={handleOnClick} src={success}></img> : <img className="success" src={success}></img>);
    return (
      <>
        {image}
        <div className="success-message">{successMessage}</div>
      </>
    );
  }
}
