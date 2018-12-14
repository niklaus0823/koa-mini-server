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
const KoaRouter = require("koa-router");
const LibPath = require("path");
const LibFs = require("mz/fs");
class RouteLoader {
    constructor() {
        this._initialized = false;
        this._router = new KoaRouter();
    }
    static instance() {
        if (RouteLoader._instance === undefined) {
            RouteLoader._instance = new RouteLoader();
        }
        return RouteLoader._instance;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            let dir = LibPath.join(__dirname, 'api');
            let files = yield LibFs.readdir(dir);
            for (let file of files) {
                if (LibPath.basename(file).match(/.+\.js$/) === null) {
                    continue;
                }
                yield this._createRouter(LibPath.join(dir, file));
            }
            this._initialized = true;
        });
    }
    getRouter() {
        return this._router;
    }
    _createRouter(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let api = require(path).api;
                this._router[api.method].apply(this._router, api.register());
            }
            catch (err) {
                console.error(err.toString());
            }
        });
    }
}
exports.default = RouteLoader;
//# sourceMappingURL=Router.js.map