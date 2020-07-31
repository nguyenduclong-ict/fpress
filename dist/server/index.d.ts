/// <reference types="node" />
import { Express } from 'express';
import { Server } from 'http';
declare class FPress {
    #private;
    app: Express;
    server: Server;
    create(server: any, app: any): this;
    registerService(service: any): this;
    registerAllService(path: any): this;
    start(): Promise<void>;
}
declare const _default: FPress;
export default _default;
