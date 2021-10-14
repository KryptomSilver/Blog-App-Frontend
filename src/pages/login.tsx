import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginPass from "../components/auth/LoginPass";
import LoginSMS from "../components/auth/LoginSMS";
import { RootStore } from "../interfaces/interfaces";

const Login = () => {
  const [sms, setSms] = useState(false);
  const history = useHistory();
  const { auth } = useSelector((state: RootStore) => state);
  useEffect(() => {
    if (auth.access_token) history.push("/");
  }, [auth.access_token, history]);
  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>
        {sms ? <LoginSMS /> : <LoginPass />}
        <small className="row my-2 text-primary" style={{ cursor: "pointer" }}>
          <span className="col-6">
            <Link to="/forgot_password" className="col-6 ">
              Forgot password
            </Link>
          </span>
          <span className="col-6 text-end" onClick={() => setSms(!sms)}>
            {sms ? "Sign in with password" : "Singn in with SMS"}
          </span>
        </small>

        <p>
          You don't have an account?
          <Link
            to="/register"
            style={{ color: "crimson", paddingLeft: ".4rem" }}
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
