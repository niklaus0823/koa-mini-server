import {Context as KoaContext, Middleware as KoaMiddleware, Request as KoaRequest} from 'koa';

export interface RequestSchema extends KoaRequest {
    params?: {[key: string]: any};
}

export interface ResponseSchema {
    code: number;
    msg?: string;
    payload?: any;
}

export type MiddlewareNext = () => Promise<any>;

export abstract class BaseApi {

    public method: string;
    public uri: string;
    public type: string;

    public abstract handle(ctx: KoaContext, next: MiddlewareNext): Promise<any>;

    public abstract paramsValidate(ctx: KoaContext);

    public register(): Array<string | KoaMiddleware> {
        return [this.uri, this._paramsPares(), this._validate(), this._execute()];
    };

    protected _paramsPares(): KoaMiddleware {
        return async (ctx: KoaContext, next: MiddlewareNext): Promise<void> => {
            try {
                if (ctx.request.method == 'POST') {
                    (ctx.request as RequestSchema).params = ctx.request.body;
                } else {
                    (ctx.request as RequestSchema).params = ctx.request.query;
                }
                await next();
            } catch (err) {
                ctx.body = this.buildResponse(err.message, -1);
            }
        };
    }

    protected _validate(): KoaMiddleware {
        return async (ctx: KoaContext, next: MiddlewareNext): Promise<void> => {
            try {
                await this.paramsValidate(ctx);
                await next();
            } catch (err) {
                ctx.body = this.buildResponse(err.message, -1);
            }
        };
    }

    protected _execute(): KoaMiddleware {
        return async (ctx: KoaContext, next: MiddlewareNext): Promise<void> => {
            ctx.body = await this.handle(ctx, next);
            await next();
        };
    }

    public buildResponse(payload: any, code: number = 0): ResponseSchema {
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