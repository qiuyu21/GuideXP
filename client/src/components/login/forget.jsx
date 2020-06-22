import React, { useState } from "react";
import Joi from "@hapi/joi";
import Lock from "../../static/lock.png";
import { Link } from "react-router-dom";
import FormValidateHelper from "../formValidate";

const definition = {
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .required()
    .label("Email"),
};

export default function Forget() {
  const [state, setState] = useState({
    data: { email: "" },
    errors: {},
  });

  const { validateAll, handleChange } = FormValidateHelper(Joi, definition);

  return (
    <div className="app">
      <div className="form-wrapper login-container">
        <div className="header">Forgot Password?</div>
        <div className="content">
          <div className="image">
            <img alt="lock" src={Lock} />
          </div>
          <p className="text">Enter Your Email Address</p>
          <div className="form">
            <div className="form-group">
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
          </div>
        </div>
        <div className="footer">
          <div className="button-container">
            <button type="submit" className="btn">
              Email Me A Reset Link
            </button>
          </div>
          <small>
            <Link to="/login">Return Login</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
