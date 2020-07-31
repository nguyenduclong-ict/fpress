/// <reference types="qs" />
import { Request, Response, NextFunction } from 'express';
import * as checks from './func';
export default function (schema: any, target: 'query' | 'body' | 'params'): (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>, res: Response<any>, next: NextFunction) => void;
export { checks };
