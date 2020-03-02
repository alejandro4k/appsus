import React, { Component } from "react";
import "./Login.css";
import Axios from "axios";
let formLogin;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: 0,
      userloged: false
    };
  }
  showRegister(e) {
    e.preventDefault();
    this.setState({
      register: 1
    });
  }

  Register(e) {
    e.preventDefault();
    if(this.validarFormulario("formRegister")){
        var user = document.getElementById("userInput").value;
        var pass = document.getElementById("userPass").value;
        var passRepeat = document.getElementById("userPass2").value;
        if(pass == passRepeat){
            //hacer la solicitud y ver si el usuario esta disponible
            var dataform = new FormData();
            dataform.append("username",user);
            dataform.append("pass",pass);
            Axios.post("http://localhost/Api1/Main/createUser",dataform)
            .then(res =>{
                console.log(res.data)
                if(res.data.status){
                    localStorage.setItem("id_user", res.data.id_usuario);
                    this.props.userLogin(1, true);
                }else{
                    alert(res.data.msg)
                }
            })

        }else{
            alert("las contraseñas no coinciden")
        }
    };
  }
  validarFormulario(idform) {
    var form = document.getElementById(idform);
    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();
    }
  }
  Login(e) {
    e.preventDefault();
    var user = document.getElementById("userInput").value;
    var pass = document.getElementById("userPass").value;
    var dataform = new FormData();
    dataform.append("user", user);
    dataform.append("pass", pass);

    /* 
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
      }
      */
    Axios.post("http://localhost/Api1/Main/Validate", dataform).then(res => {
      console.log(res.data);
      if (res.data.status == true) {
          localStorage.setItem("id_user", res.data.id_usuario);
        this.props.userLogin(1, true);
        //this.props.getUser(res.data.id_usuario);
        //console.log(localStorage.getItem("id_user"))
        //localStorage.setItem("password", pass);
      } else {
        alert(this.data.msg);
      }
    });
  }

  render() {
    if (this.state.register == 1) {
      formLogin = (
        <form id="formRegister">
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
                id="userInput"
                className="form-control"
                placeholder="user"
                type="text"
                required
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
                id="userPass"
                placeholder="Contraseña"
                type="password"
                required
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
                id="userPass2"
                placeholder="confirmar contraseña"
                type="password"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <button
              id="btnRegister"
              onClick={e => this.Register(e)}
              className="btn btn-primary btn-block"
            >
              {" "}
              Guardar{" "}
            </button>
          </div>
        </form>
      );
    } else {
      formLogin = (
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
                id="userInput"
                className="form-control"
                placeholder="user"
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
                id="userPass"
                placeholder="******"
                type="password"
              />
            </div>
          </div>
          <div className="form-group">
            <button
              id="btnLogin"
              onClick={e => this.Login(e)}
              className="btn btn-primary btn-block"
            >
              {" "}
              Login{" "}
            </button>
          </div>
          <p className="text-center">
            <a href="#" className="btn" onClick={e => this.showRegister(e)}>
              Crear Usuario
            </a>
          </p>
        </form>
      );
    }
    return (
      <div className="logincontainer">
        <div className="centerVertical col-sm-4">
          <div className="card">
            <article className="card-body">
              <img
                className="figure-img img-fluid rounded"
                src="https://media.licdn.com/dms/image/C4E0BAQFXLeb3Mn-igA/company-logo_200_200/0?e=2159024400&v=beta&t=g8_6yUaBNMMrXeCzPkWaFBK6P-Gfaf22StuYqR0_0v0"
              ></img>
              <h4 className="card-title text-center mb-4 mt-1">Sign in</h4>
              <hr />
              <p className="text-success text-center">Some message goes here</p>

              {formLogin}
            </article>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
