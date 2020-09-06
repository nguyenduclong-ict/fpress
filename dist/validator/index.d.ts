import { Request, Response, NextFunction } from 'express';
import * as checks from './func';
declare function check(schema: any, data: any, path?: string, errors?: any[]): any;
export default function CreateValidator(schema: any, target: 'query' | 'body' | 'params'): (req: Request, res: Response, next: NextFunction) => void;
export { checks, check };
