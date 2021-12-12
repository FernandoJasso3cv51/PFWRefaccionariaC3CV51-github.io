import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraAlumnos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoAlumno =
  getFirestore().
    collection("Alumno");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const Descripcion de productos = getString(
        formData, "descripcion de productos").trim();  
    const Marca = getString(formData, "marca").trim();
    const Precio = getString(formData, "precio").trim();
    const Piezas Disponibles = getString(formData, "piezas disponibles").trim();
    const Fecha de Ingreso = getString(formData, "fecha de ingreso").trim();
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    const modelo = {
      matricula,
      nombre,
      telefono,
      grupo,
      fecha 
    };
    await daoAlumno.
      add(modelo);
    muestraAlumnos();
  } catch (e) {
    muestraError(e);
  }
}

