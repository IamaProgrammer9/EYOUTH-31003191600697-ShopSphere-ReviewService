"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("./index.js"));
const port = process.env.PORT || 5200;
index_js_1.default.listen(port, () => {
    console.log(`Reviews service server started on url http://localhost:${port}`);
});
