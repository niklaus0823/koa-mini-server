import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as koaBodyParser from 'koa-bodyparser';
import Router from './Router';
import config from '../config'

class Server {
    private _initialized: boolean;
    private _app: Koa;

    constructor() {
        this._app = new Koa();
        this._initialized = false;
    }

    public async init(): Promise<any> {
        await Router.instance().init();

        // koa demo v3 middleware
        this._app.use(async (ctx, next) => {
            await next();
        });
        this._app.use(koaBody({multipart: true}));
        this._app.use(koaBodyParser({formLimit: '2048kb'}));
        this._app.use(Router.instance().getRouter().routes());
        this._initialized = true;
    }

    public start(): void {
        if (!this._initialized) {
            console.log('ANTD Server not initialized yet');
            return;
        }

        // server start
        this._app.listen(config.port, config.host, () => {
            console.log(`ANTD Server started, listening on: ${config.host}:${config.port}`);
        });
    }
}

export default new Server()