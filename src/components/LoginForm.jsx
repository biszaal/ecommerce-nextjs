import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "../contexts/UserContext";

const LoginForm = ({ handleFormToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const { loginUser } = useUser();
  const router = useRouter();

  const validateForm = () => {
    let formErrors = {};

    // Email validation
    if (!email) {
      formErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!password) {
      formErrors.password = "Please enter your password";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const response = await loginUser(email, password);

    if (response.success) {
      router.push("/home");
    } else {
      setErrorMessage(response.error);
    }
  };

  return (
    <div id="login-form">
      <form onSubmit={handleLogin}>
        {errorMessage && (
          <p className="alert alert-danger" role="alert">
            {errorMessage}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <div className="form-group text-center">
          {"Don't have an account? "}
          <a href="#" onClick={handleFormToggle} id="register-link">
            Register
          </a>
        </div>
        <div className="social-login">
          <div className="or-divider">OR</div>
          <div className="login-buttons">
            <button className="btn btn-secondary">
              <Image
                src="/img/logo/facebook-icon.png"
                alt="Login with Facebook"
                width={100}
                height={100}
              />
              Login with Facebook
            </button>
            <button className="btn btn-secondary">
              <Image
                src="/img/logo/google-icon.png"
                alt="Login with Google"
                width={100}
                height={100}
              />
              Login with Google
            </button>
            <button className="btn btn-secondary">
              <Image
                src="/img/logo/apple-icon.png"
                alt="Login with Apple"
                width={100}
                height={100}
              />
              Login with Apple
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
