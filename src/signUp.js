import React from 'react';
import './App.css';
import InputMask from 'react-input-mask';
import makeVisible from './images/make-visible.svg';

export default class SignUp extends React.Component {
  render() {
    const {
      handleConsent,
      handleSubmit,
      handleInput,
      isDisabledSubmit,
      form,
      passwordVisibility,
      handleOnBlurEmail,
      handleOnBlurPassword,
      emailOnBlur,
      passwordOnBlur,
      handleOnClick,
    } = this.props;
    return (
      <>
        <form onSubmit={handleSubmit}>
        <div className="form-header">Регистрация</div>
        <div className="form-header-small">Введите свои данные</div>
        <div className="form-column">
          <div className="inputs">
            <input
                required
                type="text"
                name="name"
                onChange={handleInput}
                value={form.name}
                className="field"
                placeHolder="Имя"
              />
              <input
                required
                type="text"
                name="nick"
                onChange={handleInput}
                value={form.nick}
                className="field"
                placeHolder="Никнейм"
              />
              <input
                required
                type="email"
                name="email"
                onChange={handleInput}
                value={form.email}
                className={emailOnBlur ? 'field validate' : 'field'}
                onBlur={handleOnBlurEmail}
                placeHolder="Email"
              />
              <InputMask
                required
                type="text"
                name="phone"
                mask="+7 999 999 99 99"
                maskChar="_"
                onChange={handleInput}
                pattern="+7 \d{3} \d{3} \d{2} \d{2}"
                value={form.phone}
                className="field"
                placeHolder="Телефон"
              />
              <input
                required
                type={passwordVisibility ? 'text' : 'password'}
                name="password"
                pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).*"
                onChange={handleInput}
                value={form.password}
                className={passwordOnBlur ? 'field validate' : 'field'}
                onBlur={handleOnBlurPassword}
                placeHolder="Пароль"
                title="Пароль должен содержать большие и маленькие буквы латинского алфавита, цифры и спец символы"
              />
            </div>
          </div>
          <label className="container">
              Я даю свое согласие на обработку персональных данных
            <input
              required
              name="consent"
              type="checkbox"
              checked={form.consent}
              onChange={handleConsent}
            />
            <span className="checkmark"></span>
            </label>
          <input type="submit" className="submit" value="зарегистрироваться" disabled={isDisabledSubmit()}/>
        </form>
        <div className="footer">
          <div className="footer-div">Есть аккаунт?</div>
          <div className="footer-div">
          <button className="button" onClick={handleOnClick}>Войти</button>
          </div>
        </div>
      </>
    );
  }
}
