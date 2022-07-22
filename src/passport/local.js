import passport from "passport";
import { Strategy } from "passport-local";
import { usersDao as api } from '../daos/index.js'

const LocalStrategy = Strategy

passport.use('registro', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
    // esto ultimo es para habilitar a Passport a tomar el resto de la info que viene en el objeto "req" ademas del pass y el user
},async(req,email,password,done)=>{
    const usuarioDB = await api.getByMail(email)
    if (usuarioDB) {
        return done(null,false)
    }
    // Puedo usar el schema de mongoose como un constructor de objeto??? Seria algo como lo siguiente pero no me deja:
/*  
    const usuarioNuevo = new api()
    usuarioNuevo.email = email
    usuarioNuevo.password = password
    const { nombre } = req.body;
    usuarioNuevo.nombre = nombre    
*/
    const { nombre } = req.body;
    const usuarioNuevo = {"email": email,"nombre": nombre,"password": password }
    // aca tenfo la misma duda que con el constructor, como uso la API para llamar al method dentro del constructor? seria algo como "api.encriptarPassword(password)" ??
    await api.saveNew(usuarioNuevo)
    // voy a agregar un paso que parece raro pero es para que el usuario que guarde la session tenga el ID de mongo tambien
    const usuarioMongo = await api.getByMail(usuarioNuevo.email)
    console.log(usuarioMongo)
    done(null,usuarioMongo)
}))

passport.use('login', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},async(req,email,password,done)=>{
    const usuarioDB = await api.getByMail(email)
    if (!usuarioDB) {
        return done(null,false)
    }
    done(null,usuarioDB)
}))

passport.serializeUser((usuario,done)=>{
    done(null,usuario.id)
})

passport.deserializeUser(async(id,done)=>{
    const usuario = await api.getOne(id)
    done(null,usuario)
})