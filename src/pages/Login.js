import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const MIN_PASSWORD = 6;

  const handleClick = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/foods');
  };

  return (
    <form onSubmit={ (e) => handleClick(e) }>
      <h1>Login</h1>
      <label htmlFor="text">
        Email:
        <input
          type="text"
          id="text"
          value={ email }
          onChange={ (event) => setEmail(event.target.value) }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="senha">
        Password:
        <input
          type="password"
          id="senha"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          data-testid="password-input"
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ (!regex.test(email) || password.length <= MIN_PASSWORD) }
      >
        Enter
      </button>
    </form>
  );
}
