import React, { Component } from "react";
import "./Listar.css";
import Axios from "axios";
import $ from "jquery";
let listaProductos;
let options;
class Listar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      categorias: [],
      id_producto: 0
    };
  }
  componentDidMount() {
    var id_usuario = localStorage.getItem("id_user");
    var dataformat = new FormData();
    dataformat.append("id_usuario", id_usuario);
    Axios.post("http://localhost/Api1/Main/listarProductos", dataformat).then(
      res => {
        console.log(res.data);
        if (res.data !== false) {
          this.setState({
            productos: res.data
          });
        }
      }
    );
    this.setState({
      categorias: this.props.categorias
    });
    console.log(this.state.categorias);
  }
  deleteProducto(id_producto) {
    if (window.confirm("estas seguro de eliminar este producto?")) {
      var dataform = new FormData();
      dataform.append("id_producto", id_producto);
      Axios.post("http://localhost/Api1/Main/deleteProducto", dataform).then(
        res => {
          if (res.data === true) {
            var dataformat2 = new FormData();
            var id_usuario = localStorage.getItem("id_user");
            dataformat2.append("id_usuario", id_usuario);
            Axios.post(
              "http://localhost/Api1/Main/listarProductos",
              dataformat2
            ).then(res => {
              //console.log(res.data);
              if (res.data !== false) {
                this.setState({
                  productos: res.data
                });
              } else {
                this.setState({
                  productos: []
                });
              }
            });
            alert("producto eliminado.");
          } else {
            alert("error a eliminar le producto");
          }
        }
      );
    }
    //alert(opcion);
    //alert(id_producto);
  }
  passInfo(id_producto, nombre, stock, categoria, precio) {
    document.getElementById("Categoria").value = categoria;
    document.getElementById("producto").value = nombre;
    document.getElementById("stock").value = stock;
    document.getElementById("precio").value = precio;
    this.setState({
      id_producto: id_producto
    });
  }
  updateData() {
    var dataform = new FormData();
    dataform.append("id_producto", this.state.id_producto);
    dataform.append("id_categoria", document.getElementById("Categoria").value);
    dataform.append("nombre", document.getElementById("producto").value);
    dataform.append("precio", document.getElementById("precio").value);
    dataform.append("stock", document.getElementById("stock").value);
    Axios.post("http://localhost/Api1/Main/updateProducto", dataform).then(
      res => {
        if (res.data === true) {
          alert("producto actualizado.");
          function eventFire(el, etype){
            if (el.fireEvent) {
              el.fireEvent('on' + etype);
            } else {
              var evObj = document.createEvent('Events');
              evObj.initEvent(etype, true, false);
              el.dispatchEvent(evObj);
            }
          }
          eventFire(document.getElementById('btnCloseModal'), 'click');
        } else {
          alert("error al actualizar producto.");
        }
      }
    );
  }

  render() {
    if (this.state.categorias != null) {
      options = this.state.categorias.map(function(e) {
        return <option value={e.id_categorias}>{e.nombre_categoria}</option>;
      });
    } else {
      options = <option disabled>No hay categorias</option>;
    }

    if (this.state.productos != null) {
      listaProductos = this.state.productos.map(e => {
        return (
          <tr>
            <th scope="row">{e.nombre}</th>
            <td>{e.nombre_categoria}</td>
            <td>{e.stock}</td>
            <td>{e.precio}</td>
            <td>
              <span
                className="action"
                onClick={() => this.deleteProducto(e.id_producto)}
              >
                Eliminar
              </span>
              <span
                className="action"
                data-toggle="modal"
                data-target="#staticBackdrop"
                onClick={() =>
                  this.passInfo(
                    e.id_producto,
                    e.nombre,
                    e.stock,
                    e.id_categoria,
                    e.precio
                  )
                }
              >
                Actualizar
              </span>
            </td>
          </tr>
        );
      });
    } else {
      listaProductos = <h1>No hay productos agregados.</h1>;
    }
    return (
      <div className="listaProductos container">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Categoria</th>
              <th scope="col">Stock</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>{listaProductos}</tbody>
        </table>

        <div
          class="modal fade"
          id="staticBackdrop"
          data-backdrop="static"
          tabindex="-1"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Actualizar Producto
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="form-group">
                  <label htmlFor="Categoria">Categoria</label>
                  <select className="form-control" id="Categoria">
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
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    placeholder="10"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="precio">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    placeholder="10"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  id="btnCloseModal"
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => this.updateData()}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Listar;
