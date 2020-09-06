import { ValidationSchema } from './provider';
export declare function check(schema: ValidationSchema, data?: {}, path?: string): Promise<any>;
interface CreateValidatorOptions {
    convert: boolean;
    target: 'body' | 'query' | 'param';
}
export default function CreateValidator(schema: ValidationSchema, options: CreateValidatorOptions): (req: any, res: any, next: any) => Promise<any>;
export {};
