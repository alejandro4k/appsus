/* eslint-disable default-case */
import React, { Component } from "react";
import Login from "./Login/Login";
import Menu from "./Menu/Menu";
import Axios from "axios";
class ComponentMaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeCompt: 0,
      login: false,
      id_user: 0
    };
  }
  /*
  componentDidlMount() {
    if (localStorage.getItem("id_user") != null) {
        alert("entraaa")
      this.setState({
        login: true,
        changeCompt: 1
      });
    }
  }
  */
 
  userLoged(value, status) {
    this.setState({
      changeCompt: value,
      login: status,
    });
  }

  showComponent = () => {
    switch (this.state.changeCompt) {
      case 0:
        return <Login userLogin={this.userLoged.bind(this)} />;
        break;
      case 1:
        return (
          <Menu
            userLogin={this.userLoged.bind(this)}
            optionsCategorias={this.state.categorias}
          />
        );
        break;
    }
  };

  render() 
  
  {
    return <div className="mainComponent">{this.showComponent()}</div>;
  }
}
export default ComponentMaster;
