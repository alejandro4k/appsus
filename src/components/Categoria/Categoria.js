import React, { Component } from "react";
import Axios from "axios";
import "./Categoria.css";
class Categoria extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  limpiar() {

    document.getElementById("nombreCategoria").value  = "";
   


  }
  saveData(e) {
    e.preventDefault();
    var categoria = document.getElementById("nombreCategoria").value;
    var id_user = localStorage.getItem("id_user");
    var dataform = new FormData();
    dataform.append("id_user",id_user);
    dataform.append("categoria",categoria);
    Axios.post("https://thawing-ocean-79982.herokuapp.com/Main/addCategoria",
    dataform
    ).then(res =>{
        console.log(res.data)
        if(res.data === true){
            alert("Categoria agregada exitosamente.");
            //limpiar la caja de texto
            //document.getElementById("nombreCategoria").value("")

        }
    })
  }
  render() {
    return (
      <form className="containerForm">
        <div className="form-group">
          <label for="exampleFormControlInput1">Nombre Categoria</label>
          <input
            type="text"
            className="form-control"
            id="nombreCategoria"
            placeholder="Telefonos,Ropa"
          />
        </div>
        <button type="button" id="btnAgregarCat" onClick={(e)=> this.saveData(e)} class="btn btn-primary">
          Agregar
        </button>
      </form>
    );
  }
}
export default Categoria;
