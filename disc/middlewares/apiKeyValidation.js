"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Middleware to validating API key before an operation
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};
exports.default = apiKeyMiddleware;
