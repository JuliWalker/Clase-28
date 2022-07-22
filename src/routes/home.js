import { Router } from "express";
import passport from "passport";

const router = Router();

function isAuth(req,res,next){
    if(req.isAuthenticated()){
        next()
    } else {
        res.render("login")
    }
}

router.get("/",isAuth, (req, res) => {
        res.redirect("/api/productos");
});



export default router;