import { ValidationSchema } from './provider';
export declare function check(schema: ValidationSchema, data?: {}, path?: string, req?: any): Promise<any>;
interface CreateValidatorOptions {
    convert: boolean;
    target: 'body' | 'query' | 'param';
    pick: string | string[];
    delete: string | string[];
}
export default function CreateValidator(schema: ValidationSchema, options: CreateValidatorOptions): (req: any, res: any, next: any) => Promise<any>;
export {};
