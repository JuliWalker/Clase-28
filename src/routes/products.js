import {Router} from 'express'
import { productsDao as api } from '../daos/index.js'
import passport from "passport";

const router = Router()

function isAuth(req,res,next){
    if(req.isAuthenticated()){
        next()
    } else {
        res.render("login")
    }
}
// tengo que agregar el middleware de auth a todas las rutas get

router.get('/', async (req,res)=>{
    try {
        const allProducts = await api.getAll()
        console.log("esto es lo que esta traynedo el req session")
        console.log(req.session)
        // aca tengo que ver como hago para traerme el nombre de la session que esta serializada
        res.render("home", { nombre: req.session.nombre, products: allProducts });
    } catch (error) {
        console.log(error)
    }    
});

router.get('/:id', async (req, res) => {
    try{
        const producto = await api.getOne(req.params.id);
        producto? res.status(200).json(producto) : res.status(404).json({message: 'Producto no encontrado. id: ' + req.params.id});
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

router.post('/', async (req,res)=>{
    try {
        const obj = req.body
        const createProduct = await api.saveNew(obj)
        res.json(createProduct)
    } catch (error) {
        res.json({message: err.message});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const productoActualizado = await api.update(req.params.id, req.body);
        res.json({
            message: 'Producto actualizado correctamente',
            id: productoActualizado._id
            });
    }catch (err){
        res.json({message: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const productoBorrado = await api.delete(req.params.id);
        res.json({
            message: 'Producto borrado correctamente',
            id: productoBorrado._id
            });
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});

export default router