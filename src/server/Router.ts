import * as KoaRouter from 'koa-router';
import * as LibPath from 'path';
import * as LibFs from 'mz/fs';
import {BaseApi} from './api/abstract/BaseApi';

export default class RouteLoader {
    private static _instance: RouteLoader;

    private _initialized: boolean;
    private readonly _router: KoaRouter;

    private constructor() {
        this._initialized = false;
        this._router = new KoaRouter();
    }

    public static instance(): RouteLoader {
        if (RouteLoader._instance === undefined) {
            RouteLoader._instance = new RouteLoader();
        }
        return RouteLoader._instance;
    }

    public async init() {
        let dir = LibPath.join(__dirname, 'api');
        let files = await LibFs.readdir(dir);
        for (let file of files) {
            if (LibPath.basename(file).match(/.+\.js$/) === null) {
                continue;
            }
            await this._createRouter(LibPath.join(dir, file));
        }

        this._initialized = true;
    }

    public getRouter(): KoaRouter {
        return this._router;
    }

    private async _createRouter(path: string): Promise<void> {
        try {
            let api = (require(path) as any).api as BaseApi;
            this._router[api.method].apply(this._router, api.register());
        } catch (err) {
            console.error(err.toString());
        }
    }
}