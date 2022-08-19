import React from 'react';

export default function Login() {
  return (
    <form>
      <h1>Login</h1>
      <label htmlFor="text">
        Email:
        <input type="text" id="text" data-testid="email-input" />
      </label>
      <label htmlFor="senha">
        Password:
        <input type="password" id="senha" data-testid="password-input" />
      </label>
      <button type="button" data-testid="login-submit-btn">
        Enter
      </button>
    </form>
  );
}
