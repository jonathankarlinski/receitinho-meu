import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
  const MIN_PASSWORD = 6;

  return (
    <form>
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
          onChange={ (event) => setPassword(event.target.value) }
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ (!regex.test(email) || password.length <= MIN_PASSWORD) }
      >
        Enter
      </button>
    </form>
  );
}
