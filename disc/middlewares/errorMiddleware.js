"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    const { stack, status, message } = err;
    console.error(stack);
    res.status(status || 500).json({
        error: {
            message,
            status: status || 500
        }
    });
};
exports.default = errorMiddleware;
