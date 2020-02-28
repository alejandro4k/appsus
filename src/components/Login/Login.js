import React, { Component } from "react";
import "./Login.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: 0,
      userloged: false
    };
  }

  render() {
    return (
      <div className="logincontainer">
        <div className="centerVertical col-sm-4">
          <div className="card">
            <article className="card-body">
              <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
              <hr />
              <p className="text-success text-center">Some message goes here</p>
              <form>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {" "}
                        <i className="fa fa-user"></i>{" "}
                      </span>
                    </div>
                    <input
                      name=""
                      className="form-control"
                      placeholder="Email or login"
                      type="email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {" "}
                        <i className="fa fa-lock"></i>{" "}
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="******"
                      type="password"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    {" "}
                    Login{" "}
                  </button>
                </div>
                <p className="text-center">
                  <a href="#" className="btn">
                    Forgot password?
                  </a>
                </p>
              </form>
            </article>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
