"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.default.init().then(() => {
    server_1.default.start();
}).catch((err) => {
    console.log(err.message);
});
//# sourceMappingURL=index.js.map