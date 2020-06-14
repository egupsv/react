import React from 'react';
import './App.css';


export default class SignIn extends React.Component {
  
  render() {
    const { 
      handleSubmit, 
      handleInput, 
      isDisabledSubmit, 
      form, 
      passwordVisibility,
    } = this.props;
  
    return (
      <form className="main-block" onSubmit={handleSubmit}>
        <div className="form-header">Вход</div>
        <div className="form-header-small">Введите свои данные</div>
        <div className="form-column">
          <div className="inputs">
            <input
              required
              type="text"
              name="emailPhone"
              onChange={handleInput}
              value={form.emailPhone}
              className="field"
              placeHolder="Email или номер телефона"
            />
            <input
              required
              type="password"
              name="password"
              pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).*"
              onChange={handleInput}
              value={form.password}
              className="field"
              placeHolder="Пароль"
            />
          </div>
        </div>
        <input type="submit" id="signIn" disabled={isDisabledSubmit()}/>
        <label htmlFor="signIn"></label>
      </form>
    );
  }
} 