import express from "express";
const { Router } = express;

import {
  productosDao as productosApi,
  carritosDao as carritosApi,
} from "./daos/index.js";

//------------------------------------------------------------------------
// instancio servidor

const app = express();

//--------------------------------------------
// permisos de administrador

const esAdmin = true;

function crearErrorNoEsAdmin(ruta, metodo) {
  const error = {
    error: -1,
  };
  if (ruta && metodo) {
    error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`;
  } else {
    error.descripcion = "no autorizado";
  }
  return error;
}

function soloAdmins(req, res, next) {
  if (!esAdmin) {
    res.json(crearErrorNoEsAdmin());
  } else {
    next();
  }
}

//--------------------------------------------
// configuro router de productos
//para firebase se debe crear un documento previo con id: 1

const productosRouter = new Router();

productosRouter.get("/", async (req, res) => {
  const productos = await productosApi.listarAll();

  res.send({ productos: productos });
});

productosRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const producto = await productosApi.listar(id);
    res.json({ producto: producto });
  } catch (error) {
    res.json(`Error al buscar el id: ${id}, producto no encontrado`, error);
  }
});

productosRouter.post("/", soloAdmins, async (req, res) => {
  productosApi.guardar(req.body);
  res.status(200);
  res.json("producto cargado");
});

productosRouter.put("/:id", soloAdmins, async (req, res) => {
  try {
    const id = req.params.id;
    productosApi.actualizar(req.body, id);
    res.status(200);
    res.json("producto actualizado");
  } catch (error) {
    res.json(`Error al buscar el id: ${id}, producto no encontrado`);
  }
});

productosRouter.delete("/:id", soloAdmins, async (req, res) => {
  try {
    const id = req.params.id;
    productosApi.borrar(id);
    res.status(200);
    res.json("producto eliminado");
  } catch (error) {
    res.json(`Error al buscar el id, producto no encontrado`);
  }
});
//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router();

carritosRouter.get("/", async (req, res) => {
  try {
    const carritos = await carritosApi.listarAll();
    res.json({ carritos: carritos });
  } catch (error) {
    res.json(`Error al buscar la lista de carritos`);
  }
});

carritosRouter.post("/", async (req, res) => {
  const carrito = { title: req.body.title };
  const productoId = await carritosApi.guardar(carrito);
  res.json("carrito cargado");
  res.status(200);
  return productoId;
});

carritosRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await carritosApi.borrar(id);
    res.json("carrito eliminado");
    res.status(200);
  } catch (error) {
    res.json(`Error al buscar el id, producto no encontrado`);
  }
});

//--------------------------------------------------
// router de productos en carrito

carritosRouter.get("/:id/productos", async (req, res) => {
  try {
    const id = req.params.id;
    const carrito = await carritosApi.listar(id);
    res.json({ carrito: carrito });
  } catch (error) {
    res.json(`Error al buscar el id, producto no encontrado`);
  }
});

carritosRouter.post("/:carritoId/productos/:productoId", async (req, res) => {
  try {
    const carritoId = req.params.carritoId;
    const carrito = await carritosApi.listar(carritoId);
    const productoId = req.params.productoId;
    const producto = await productosApi.listar(productoId);
    carrito.productos.push(producto);
    await carritosApi.actualizar(carrito, carritoId);
    res.json({ carrito: carrito });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
});

carritosRouter.delete("/:id/productos/:id_prod",soloAdmins,async (req, res) => {
    try {
      const id_carrito = req.params.id;
      const carrito = await carritosApi.listar(id_carrito);
      const id_producto = req.params.id_prod;
      const prodToDel = carrito.productos.findIndex(
        (prod) => prod.id == id_producto
      );
      const carritoDel = carrito.productos.splice(prodToDel, 1);
      await carritosApi.actualizar(carrito, id_carrito);
      res.json({ carrito: carrito });
      res.status(200);
    } catch (error) {
      res.json(`Error al buscar el id, producto no encontrado`);
    }
  }
);

//--------------------------------------------
// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productosRouter);
app.use("/api/carritos", carritosRouter);

export default app;
