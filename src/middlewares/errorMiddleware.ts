import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    const { stack, status, message } = err;
    console.error(stack);
    res.status(status || 500).json({
        error: {
            message,
            status: status || 500
        }
    });
};

export default errorMiddleware;