const express = require('express');
const bodyParser = require('body-parser');
const patientsController = require('./controllers/patients');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Controllers
app.use('/patients', patientsController);

// Global error handling middleware
app.use((err, req, res, next) => {
    const { stack, status, message } = err;
    console.error(stack);
    res.status(status || 500).json({
        error: {
            message,
            status: status || 500
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});