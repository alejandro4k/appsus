import React, { Component } from "react";
import "./Menu.css";
import AddProducto from "../AgregarProductos/AgregarProducto";
import Categoria from "../Categoria/Categoria";
import Listar from "../Listar/Listar";
import Axios from 'axios';
let componente;
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: 0,
      userloged: false,
      comp: 1,
      categoriasprop:[]
    };
  }
  getCategorias(value){
    this.setState({
        categoriasprop: value
    })
    //console.log(this.state.categoriasprop)
  }

  changeComponent(e, value) {
    e.preventDefault();
    this.setState({
      comp: value
    });
  }
  logOut(){
    localStorage.removeItem("id_user");

    
    window.location.reload();
    
  }
  render() {
    
    if (this.state.comp === 1) {
        componente = <AddProducto setStateCateg ={this.getCategorias.bind(this)}/>
    }else if(this.state.comp === 2){
        componente = <Categoria />
    }else{
        componente = <Listar categorias={this.state.categoriasprop}/>
    }

    return (
      <div className="Menu">
        <div className="d-flex" id="wrapper">
          <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Appsus</div>
            <div className="list-group list-group-flush">
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={e => this.changeComponent(e, 1)}
              >
                Agregar Productos
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={(e) => this.changeComponent(e, 2)}
              >
                Agregar Categoria
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={(e) => this.changeComponent(e, 3)}
              >
                Listar Productos
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action bg-light"
                onClick={(e)=> this.logOut(e)}
              >
                Cerrar Sesion
              </a>
            </div>
          </div>

          <div id="page-content-wrapper">
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
              <button className="btn btn-primary" id="menu-toggle">
                Toggle Menu
              </button>

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>

            <div className="container-fluid">
              
              {componente}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Menu;
