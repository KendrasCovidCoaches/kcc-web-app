import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import GoogleButton from 'react-google-button'

import { auth } from "utils/nhost";

async function loginWithGoogle() {
  auth.login({ provider: 'google' });
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await auth.login({ email, password });
    } catch (error) {
      console.log(error);
      return alert("login failed");
    }

    history.push("/");
  }

  return (
    <div>
      <GoogleButton onClick={loginWithGoogle} />
      <div>Login</div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoFocus
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
