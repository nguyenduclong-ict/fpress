import { Request, Response, NextFunction } from 'express';
import * as checks from './func';
export default function (schema: any, target: 'query' | 'body' | 'params'): (req: Request, res: Response, next: NextFunction) => void;
export { checks };
