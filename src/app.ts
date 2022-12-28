import express, { Express, Request, Response } from 'express';
import router from './routes/index';
import dotenv from 'dotenv';
dotenv.config();

'use strict';

// Initialization of app and main port
const app: Express = express();
app.set('port', process.env.PORT || 3000);

// Body-Parser (integrated in Express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
app.use("/", router);

app.listen(app.get('port'), () => {
    console.log('App running in the port:', app.get('port'));
});