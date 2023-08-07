import React, { useState } from "react";
import Image from "next/image";
import { useUser } from "../contexts/UserContext";

const RegisterForm = ({ handleFormToggle }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { registerUser } = useUser();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password should be at least 8 characters long.");
      return;
    }

    const response = await registerUser(name, email, password);

    if (!response.success) {
      setErrorMessage(response.error);
    }
  };

  return (
    <div id="login-form">
      <form onSubmit={handleRegister}>
        {errorMessage && (
          <p className="alert alert-danger" role="alert">
            {errorMessage}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="register-name">Full Name</label>
          <input
            type="text"
            id="register-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-email">Email</label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-register-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-register-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            placeholder="Re-enter your password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
        <div className="form-group text-center">
          Already have an account?{" "}
          <a href="#" onClick={handleFormToggle} id="login-link">
            Login
          </a>
        </div>
        <div className="social-login">
          <div className="or-divider">OR</div>
          <div className="login-buttons">
            <button className="btn btn-secondary">
              <Image
                src="/img/logo/facebook-icon.png"
                alt="Register with Facebook"
                width={100}
                height={100}
              />
              Register with Facebook
            </button>
            <button className="btn btn-secondary">
              <Image
                src="/img/logo/google-icon.png"
                alt="Register with Google"
                width={100}
                height={100}
              />
              Register with Google
            </button>
            <button className="btn btn-secondary">
              <Image
                src="/img/logo/apple-icon.png"
                alt="Register with Apple"
                width={100}
                height={100}
              />
              Register with Apple
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
