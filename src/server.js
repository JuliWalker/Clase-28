import express  from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import 'dotenv/config'
import passport from "passport";
import './passport/local.js'

const morgan = require('morgan');
const app = express();
const PORT = 8080



/** Middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.DB_MONGO,
            ttl: 60 * 10 // 10 minutes
            })
    }
));
app.use(passport.initialize())
app.use(passport.session())


/** Views */
app.set('views', 'src/views');
app.set('view engine', 'ejs');


/** Routes */
import homeRouter from './routes/home.js';
import routesProducts from './routes/products'
// import routesCart from './routes/cart'
import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';
import registerRouter from './routes/register.js';
import info from './routes/info.js';

app.use('/', homeRouter);
app.use('/api/productos',routesProducts)
// app.use('/api/carrito',routesCart)
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/registro', registerRouter);
app.use('/info', info);


/** Server */
try {
    app.listen(PORT);
    console.log(`Server on port ${PORT}...`)
} catch (error) {
    console.log('Error de conexión con el servidor...', error)
}