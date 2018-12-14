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
class BaseApi {
    register() {
        return [this.uri, this._paramsPares(), this._validate(), this._execute()];
    }
    ;
    _paramsPares() {
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (ctx.request.method == 'POST') {
                    ctx.request.params = ctx.request.body;
                }
                else {
                    ctx.request.params = ctx.request.query;
                }
                yield next();
            }
            catch (err) {
                ctx.body = this.buildResponse(err.message, -1);
            }
        });
    }
    _validate() {
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.paramsValidate(ctx);
                yield next();
            }
            catch (err) {
                ctx.body = this.buildResponse(err.message, -1);
            }
        });
    }
    _execute() {
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = yield this.handle(ctx, next);
            yield next();
        });
    }
    buildResponse(payload, code = 0) {
        if (code < 0) {
            console.log(`[${this.uri}]: ${payload}`);
            return {
                code: code,
                msg: payload
            };
        }
        return {
            code: code,
            payload: payload
        };
    }
}
exports.BaseApi = BaseApi;
//# sourceMappingURL=BaseApi.js.map