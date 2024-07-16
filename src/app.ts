require('dotenv').config({ path: `./src/.env` });

import express from 'express';
import bodyParser from 'body-parser';

import patientsController from './controllers/patients';
import errorMiddleware from './middlewares/errorMiddleware';

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.json());

// Controllers
app.use('/patients', patientsController);

// Middlewares
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});