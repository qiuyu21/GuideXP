import React, { useState } from "react";
import { Link } from "react-router-dom";
import Joi from "@hapi/joi";
import "./login.css";
import Logo from "../../static/logo.png";
import FormValidateHelper from "../formValidate";
import authService from "../../services/authServices";
import { status_codes, error_codes } from "../../helper/responseHelper";

const definition = {
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Username"),
  password: Joi.string().required().label("Password"),
};

export default function Login() {
  const [state, setState] = useState({
    data: { email: "", password: "" },
    errors: {},
  });
  const { validateAll, handleChange } = FormValidateHelper(Joi, definition);
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateAll(state.data);
    setState({ ...state, errors: errors || {} });
    if (errors) return;
    doSubmit();
  };

  const doSubmit = async () => {
    try {
      await authService.login(state.data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && (ex.response.status === status_codes.BAD_REQUEST || ex.response.status === status_codes.FORBIDDEN)) {
        const errors = { ...state.errors };
        errors.email = ex.response.data.message;
        setState({ ...state, errors });
      }
    }
  };
  return (
    <div className="app">
      <div className="form-wrapper login-container">
        <div className="header">GuideXP</div>
        <div className="content">
          <div className="image">
            <img alt="logo" src={Logo} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                onChange={(e) => {
                  const new_state = handleChange(state, e);
                  setState(new_state);
                }}
                value={state.data.email}
              />
              {state.errors.email && (
                <span className="error">{state.errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => {
                  const new_state = handleChange(state, e);
                  setState(new_state);
                }}
                value={state.data.password}
              />
              {state.errors.password && (
                <span className="error">{state.errors.password}</span>
              )}
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="button-container">
            <button type="submit" className="btn" onClick={handleSubmit}>
              Login
            </button>
          </div>
          <small>
            <Link to="/password/reset">Forgot password?</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
