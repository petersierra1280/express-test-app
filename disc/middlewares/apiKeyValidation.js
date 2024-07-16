"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: `./src/.env` });
// Middleware to validating API key before an operation
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    console.log('apiKey - request', apiKey);
    console.log('env file', process.env.API_KEY);
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
exports.default = apiKeyMiddleware;
