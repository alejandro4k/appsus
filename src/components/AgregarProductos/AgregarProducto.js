import React, { Component } from "react";
import Axios from "axios";
import "./Agregar.css";
let options;
class AgregarProductos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorias: []
    };
  }
  componentDidMount() {
      
      var id_usuario = localStorage.getItem("id_user");
      //console.log(localStorage.getItem("id_user"));
      var dataform = new FormData();
      dataform.append("id_user", id_usuario);
  
      Axios.post("http://localhost/Api1/Main/listarCategorias", dataform).then(
        res => {
          this.setState({
            categorias: res.data
          });
          this.props.setStateCateg(this.state.categorias)
        }
      );

       
  }
  limpiar() {

    document.getElementById("producto").value  = "";
    document.getElementById("stock").value ="";
    document.getElementById("precio").value ="";


  }
  validarFormulario(idform) {
    var form = document.getElementById(idform);
    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();
    }
  }
  saveProducto(e) {
    e.preventDefault();
    if(this.validarFormulario("formAdd")){

        var id_usuario = localStorage.getItem("id_user");
        var Categoria = document.getElementById("Categoria").value;
        var producto = document.getElementById("producto").value;
        var stock = document.getElementById("stock").value;
        var precio = document.getElementById("precio").value;
        var dataform = new FormData();
        dataform.append("user", id_usuario);
        dataform.append("producto", producto);
        dataform.append("stock", stock);
        dataform.append("precio", precio);
        dataform.append("categoria", Categoria);
        Axios.post("http://localhost/Api1/Main/addProducto", dataform).then(res => {
          if (res.data === true) {
            alert("Producto agregado exitosamente.");
            this.limpiar();
          } else {
            alert("error al agregar el producto.");
          }
        });
    }


  }

  render() {
      //console.log(this.state.categorias);
    if (this.state.categorias) {
      options = this.state.categorias.map(function(e) {
        return <option value={e.id_categorias}>{e.nombre_categoria}</option>;
      });
    } else {
        document.getElementById("btnAgregarProd").disabled = true;
      options = <option value="00">No hay categorias</option>;
    }
    return (
      <form className="containerForm" id="formAdd">
        <div className="form-group">
          <label htmlFor="Categoria">Categoria</label>
          <select className="form-control" id="Categoria" required>
            {options}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="producto">Producto</label>
          <input
            type="text"
            className="form-control"
            id="producto"
            placeholder="telefono,computador,etc"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            placeholder="10"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            placeholder="10"
            required
          />
        </div>
        <button
          type="button"
          id="btnAgregarProd"
          onClick={e => this.saveProducto(e)}
          className="btn btn-primary"
        >
          Agregar
        </button>
      </form>
    );
  }
}
export default AgregarProductos;
