declare type CheckFunction = (value: any, path: any, req?: any) => Promise<string | string[]> | string | string[];
interface SetValidationProvider {
    isAsync?: boolean;
    stop?: boolean;
    name?: string;
    optional?: boolean;
    convert?: boolean;
}
export declare class ValidationProvider {
    _func: CheckFunction;
    isAsync: boolean;
    stop: boolean;
    name: string;
    optional: boolean;
    convert: boolean;
    convertFunctions: {
        date: (value: any) => Date;
        object: (value: any) => any;
        array: (value: any) => any;
        number: (value: any) => number;
        string: (value: any) => string;
    };
    constructor(func: CheckFunction, isAsync?: any);
    get func(): CheckFunction;
    set(options: SetValidationProvider): this;
}
export interface ValidationSchema {
    [x: string]: ValidationProvider | ValidationSchema;
}
export declare function date(): ValidationProvider;
export declare function required(): ValidationProvider;
export declare function string(): ValidationProvider;
export declare function number(): ValidationProvider;
export declare function min(m: any): ValidationProvider;
export declare function max(m: any): ValidationProvider;
export declare function length(length: any): ValidationProvider;
export declare function equal(data: any): ValidationProvider;
export declare function minLength(length: any): ValidationProvider;
export declare function maxLength(length: any): ValidationProvider;
export declare function object(): ValidationProvider;
export declare function array(schema?: any): ValidationProvider;
export declare function Enum(...list: any[]): ValidationProvider;
export declare function all(...checks: ValidationProvider[]): ValidationProvider;
export declare function some(...checks: any[]): ValidationProvider;
export declare function custom(func: CheckFunction): ValidationProvider;
export {};
