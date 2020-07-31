/// <reference types="node" />
import { Express } from 'express';
import { Server } from 'http';
declare class FPress {
    #private;
    app: Express;
    server: Server;
    create(server: any, app: any, options: any): this;
    registerService(service: any): void;
    registerAllService(path: any): void;
    start(): Promise<void>;
}
declare const _default: FPress;
export default _default;
