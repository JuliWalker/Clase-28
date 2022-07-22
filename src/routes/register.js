import { Router } from "express";
import { usersDao as api } from '../daos/index.js'
import passport from "passport";

const router = Router();

router.get("/", (req, res) => {
    res.render("registro");
});


router.post("/",passport.authenticate('registro',{
    failureRedirect:'/registro/errorRegistro',
    successRedirect:'/api/productos'
})) 

router.get("/errorRegistro", (req, res) => {
    res.render("errorRegistro");
});

export default router;