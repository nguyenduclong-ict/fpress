import { Provider } from '../mongo';
import { Router } from 'express';
interface MiddlewareOptions {
    all: any[];
    list: any[];
    find: any[];
    create: any[];
    update: any[];
    delete: any[];
}
export default function (router: Router, provider: Provider, middleware: MiddlewareOptions): void;
export {};
