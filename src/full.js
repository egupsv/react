import React from 'react';
import './App.css';
import SignUp from './signUp';
import SignIn from './signIn';
import crypto from 'crypto-js';
import InputMask from 'react-input-mask';

const users = [
  {name: 'a',
  nick: 'a',
  email: 'a@gmail.com',
  phone: '+799999999',
  password: ''

} 
]

export default class Full extends React.Component {
  state = {
    active: 'signUp',
    signUp: {
      form: {
        name: '',
        nick: '',
        email: '',
        phone: '',
        password: '',
        consent: false,
      },
      passwordVisibility: false,
      submitted: false,
    },
    signIn: {
      form: {
        emailPhone: '',
        password: '',
      },
      passwordVisibility: false,
      submitted: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { active } = this.state;
    //const { submitted } = this.state.signUp;
    const { password } = this.state.signUp.form;
    const encryption = crypto.AES.encrypt(password, 'secretCode').toString();
    console.log(encryption);
    const newUser = this.state.signUp.form;
    delete newUser.consent;
    newUser.password = encryption;
    const newUserString = JSON.stringify(newUser);

    this.setState({ [active]: { submitted: true } });
 ; }

  
  onClick = () => {
      const { active } = this.state;
      const newActive = (active === 'signUp' ? 'signIn' : 'signUp');
      this.setState({active: newActive });
  }

  handleConsent = () => {
    const { form } = this.state.signUp;
    this.setState({ signUp: { form: { ...form, consent: !form.consent } } });
  }

  handleInput = ({ target }) => {
    const { active } = this.state;
    const { form } = this.state[active];
    this.setState({ [active]: { form: { ...form, [target.name]: target.value } } });
  }

  isDisabledSubmit = () => {
    const { active } = this.state;
    const { form } = this.state[active];
    const filterForCheck = Object.values(form).filter((e) => !e);
    if (filterForCheck.length !== 0) {
      return true;
    }
    return false;
  }

  renderSignUp() {
    const { form, passwordVisibility } = this.state.signUp; 
    return (          
      <form className="main-block" onSubmit={this.handleSubmit}>
        <div className="form-header">Регистрация</div>
        <div className="form-header-small">Введите свои данные</div>
        <div className="form-column">
          <div className="inputs">
            <input
                required
                type="text"
                name="name"
                onChange={this.handleInput}
                value={form.name}
                className="field"
                placeHolder="Имя"
              />
              <input
                required
                type="text"
                name="nick"
                onChange={this.handleInput}
                value={form.nick}
                className="field"
                placeHolder="Никнейм"
              />
              <input
                required
                type="email"
                name="email"
                onChange={this.handleInput}
                value={form.email}
                className="field"
                placeHolder="Email"
              />
              <InputMask
                required
                type="text"
                name="phone"
                mask="+7 999 999 99 99"
                maskChar="_"
                onChange={this.handleInput}
                pattern="+7\d{10}"
                value={form.phone}
                className="field"
                placeHolder="Телефон"
              />
              <input
                required
                type={passwordVisibility ? "text" : "password"}
                name="password"
                pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W]).*"
                onChange={this.handleInput}
                value={form.password}
                className="field"
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
              onChange={this.handleConsent}
            />
            <span className="checkmark"></span>
            </label>
            
          
          <input type="submit" className="submit" value="зарегистрироваться" disabled={this.isDisabledSubmit()}/>
          
        </form>
        
      );
    }
  

  render() {
    const { active } = this.state;
    const { form } = this.state[active];
    if (this.state.signUp.submitted) {
      return <div>{form.name + '444'}</div>
    }
      return <>
          {active === 'signUp' ? <>{this.renderSignUp()}<div><div className >Есть аккаунт?</div>
            <button onClick={this.onClick}>Войти</button> 
            </div></>
                 : <><SignIn handleSubmit={this.handleSubmit}
            handleInput={this.handleInput} 
            isDisabledSubmit={this.isDisabledSubmit}
            form={this.state.signIn.form}
            passwordVisibility={this.state.signIn.passwordVisibility}
            />
            <button onClick={this.onClick}>Войти</button> </>}
            
        </>;
      
  }
} 