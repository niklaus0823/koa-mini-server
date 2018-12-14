Koa Mini Server
=========================

> Quickly create a minimal Koa server.

## Usage

```bash
npm install
npm start
```

## How to begin

1. create a `demo.ts` file in `~/src/server/api`

``` typescript
import {Context as KoaContext} from 'koa';
import {BaseApi, MiddlewareNext, RequestSchema, ResponseSchema} from './abstract/BaseApi';

interface SecretParams {
    name: string;
}

class demo extends BaseApi {

    constructor() {
        super();
        this.method = 'all'; // 'all' | 'post' | 'get'
        this.uri = '/v1/demo';
        this.type = 'application/json; charset=utf-8';
    }

    public async paramsValidate(ctx: KoaContext) {
        const params = (ctx.request as RequestSchema).params as SecretParams;

        if (!params.name || params.name == '') {
            throw new Error('Param `username` is required!');
        }
    }

    public async handle(ctx: KoaContext, next: MiddlewareNext): Promise<ResponseSchema> {
        try {
            const params = (ctx.request as RequestSchema).params as SecretParams;

            return this.buildResponse(params);
        } catch (err) {
            return this.buildResponse(err.message, -1);
        }
    };
}

export const api = new demo();
```

2. Run `tsc` and `node ./build/index.js`

3. The website server worked,  ` http://127.0.0.1:8001/v1/demo` .

