"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: `./src/.env` });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./mongoSetup");
const patients_1 = __importDefault(require("./controllers/patients"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const app = (0, express_1.default)();
const port = process.env.port || 3000;
app.use(body_parser_1.default.json());
// Controllers
app.use('/patients', patients_1.default);
// Middlewares
app.use(errorMiddleware_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
