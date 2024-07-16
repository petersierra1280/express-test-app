import { RequestHandler } from "express";

// Middleware to validating API key before an operation
const apiKeyMiddleware: RequestHandler = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

export default apiKeyMiddleware;