"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const koaBody = require("koa-body");
const koaBodyParser = require("koa-bodyparser");
const Router_1 = require("./Router");
const config_1 = require("../config");
class Server {
    constructor() {
        this._app = new Koa();
        this._initialized = false;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Router_1.default.instance().init();
            // koa demo v3 middleware
            this._app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
                yield next();
            }));
            this._app.use(koaBody({ multipart: true }));
            this._app.use(koaBodyParser({ formLimit: '2048kb' }));
            this._app.use(Router_1.default.instance().getRouter().routes());
            this._initialized = true;
        });
    }
    start() {
        if (!this._initialized) {
            console.log('ANTD Server not initialized yet');
            return;
        }
        // server start
        this._app.listen(config_1.default.port, config_1.default.host, () => {
            console.log(`ANTD Server started, listening on: ${config_1.default.host}:${config_1.default.port}`);
        });
    }
}
exports.default = new Server();
//# sourceMappingURL=index.js.map