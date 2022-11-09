import express, { json } from 'express';
import dotenv from 'dotenv';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { default as MongoStore } from 'connect-mongo';
import passport from './src/passport/passport-local.js';
import requestsLogger from './src/middlewares/reqLogger.middleware.js'

/* ---------------------------- routes importing ---------------------------- */
import fakerRouter from './src/routes/productsTest.routes.js';
import randomsRouter from './src/routes/randoms.routes.js';
import infoRouter from './src/routes/info.routes.js';
import homeRouter from './src/routes/home.routes.js';
import authRouter from './src/routes/auth/index.routes.js';
import notFoundRouter from './src/routes/404.notFound.routes.js';

dotenv.config();
const app = express();

/* ---------------------------- database settings --------------------------- */
import './src/databases/connectionMongoDB.js';

/* -------------------------- middlewares settings -------------------------- */
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(express.static('public'));
app.use(requestsLogger);

/* -------------------------- template engine settings -------------------------- */
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: './src/views/layouts',
    partialsDir: './src/views/partials/',
  })
);
app.set('view engine', 'hbs');
app.set('views', './src/views');

/* ---------------------------- session settings ---------------------------- */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collection: 'sessions',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: {
      maxAge: 600000,
    },
  })
);

/* ---------------------------- passport settings --------------------------- */
app.use(passport.initialize());
app.use(passport.session());

/* -------------------------- routes settings -------------------------- */
app.use(homeRouter);
app.use('/api', fakerRouter);
app.use('/api', randomsRouter);
app.use('/info', infoRouter);
app.use('/auth', authRouter);
app.use(notFoundRouter);

export default app;
