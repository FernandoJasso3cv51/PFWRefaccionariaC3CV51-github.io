import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraProductos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoProductos =
  getFirestore().
    collection("Productos");
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
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
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoProductos.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Productos} */
      const data = doc.data();
      forma.dp.value = data.dp;
      forma.marca.value = data.marca || "";
      forma.precio.value = data.precio || "";
      forma.pd.value = data.pd || "";
      forma.fecha.value = data.fecha || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraProductos();
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const dp = getString(
        formData, "dp").trim();  
    const marca = getString(formData, "marca").trim();
    const precio = getString(formData, "precio").trim();
    const pd = getString(formData, "pd").trim();
    const fecha = getString(formData, "fecha").trim();
    /**
     * @type {
        import("./tipos.js").
                Productos} */
    const modelo = {
      dp, 
      marca,
      precio,
      pd,
      fecha
    };
    await daoProductos.
      doc(id).
      set(modelo);
    muestraProductos();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoProductos.
        doc(id).
        delete();
      muestraProductos();
    }
  } catch (e) {
    muestraError(e);
  }
}

