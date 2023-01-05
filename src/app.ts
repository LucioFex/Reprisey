import express, { Express } from 'express';
import dotenv from 'dotenv';
import router from './routes/index';

dotenv.config();

// Initialization of app and main port
const app: Express = express();
app.set('port', process.env.PORT || 3000);

// Body-Parser (integrated in Express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
app.use('/', router);

app.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    console.log('App running in the port:', app.get('port'));
});
