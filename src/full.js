import React from 'react';
import './App.css';
import getUsers from './users'
import SignUp from './signUp';
import SignIn from './signIn';
import Success from './success';
import Crypto from 'crypto-js';

const usersString = getUsers();

const sourceState = {
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
  },
  signIn: {
    form: {
      emailPhone: '',
      password: '',
    },
  },
  users: usersString,
  passwordVisibility: false,
  submitted: false,
  passwordOnBlur: false,
  emailOnBlur: false,
};

export default class Full extends React.Component {
  constructor(props) {
    super(props);
    this.state = sourceState;
  }

  handleSubmitSignUp = (e) => {
    e.preventDefault();
    const { password } = this.state.signUp.form;
    const { phone } = this.state.signUp.form;
    const encryption = Crypto.AES.encrypt(password, 'secretCode').toString();
    const newUser = this.state.signUp.form;
    delete newUser.consent;
    newUser.password = encryption;
    newUser.phone = phone.split(' ').join('');
    const forUsers = JSON.parse(usersString);
    forUsers.push(newUser);
    const newUsersString = JSON.stringify(forUsers);
    this.setState({ submitted: true, users: newUsersString });
  }

  handleSubmitSignIn = (e) => {
    e.preventDefault();
    const { users } = this.state;
    const user = this.state.signIn.form;
    const usersForCheck = JSON.parse(users);
    const emailPhoneSearchResult = usersForCheck
      .filter((u) => u.phone === user.emailPhone || u.email === user.emailPhone);
    if (emailPhoneSearchResult.length === 0) {
      alert('неверный email, телефон или пароль');
    } else {
      const bytes = Crypto.AES.decrypt(emailPhoneSearchResult[0].password, 'secretCode');
      const originalPassword = bytes.toString(Crypto.enc.Utf8);
      if (originalPassword !== user.password) {
        alert('неверный email, телефон или пароль');
      } else {
        this.setState({ submitted: true });
      }
    }
  }

  handleVisibility = () => {
    const { passwordVisibility } = this.state;
    this.setState({ passwordVisibility: !passwordVisibility });
  }

  handleOnClick = () => {
    const { active } = this.state;
    const newActive = (active === 'signUp' ? 'signIn' : 'signUp');
    this.setState({ active: newActive });
  }

  handleOnClickSuccess = () => {
    const { active } = this.state;
    const newActive = (active === 'signUp' ? 'signIn' : 'signUp');
    this.setState({ active: newActive, submitted: false });
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

  handleOnBlurPassword = () => {
    this.setState({ passwordOnBlur: true });
  }

  handleOnBlurEmail = () => {
    this.setState({ emailOnBlur: true });
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

  render() {
    const {
      active,
      passwordVisibility,
      passwordOnBlur,
      emailOnBlur,
    } = this.state;
    const { form } = this.state[active];
    if (this.state.submitted) {
      return <Success active={active} handleOnClick={this.handleOnClickSuccess} />;
    }
    return <>
      {active === 'signUp'
        ? <SignUp
          handleSubmit={this.handleSubmitSignUp}
          handleInput={this.handleInput}
          handleConsent={this.handleConsent}
          isDisabledSubmit={this.isDisabledSubmit}
          form={form}
          passwordVisibility={passwordVisibility}
          passwordOnBlur={passwordOnBlur}
          emailOnBlur={emailOnBlur}
          handleOnBlurPassword={this.handleOnBlurPassword}
          handleOnBlurEmail={this.handleOnBlurEmail}
          handleOnClick={this.handleOnClick}
          handleVisibility={this.handleVisibility}
        /> : <SignIn
          handleSubmit={this.handleSubmitSignIn}
          handleInput={this.handleInput}
          isDisabledSubmit={this.isDisabledSubmit}
          form={this.state.signIn.form}
          passwordVisibility={passwordVisibility}
          handleOnClick={this.handleOnClick}
        />
      }
    </>;
  }
}
