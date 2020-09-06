declare type CheckFunction = (value: any, path: any, req?: any) => Promise<string | string[]> | string | string[];
export declare class ValidationProvider {
    func: CheckFunction;
    isAsync: any;
    stop: any;
    name: '';
    constructor(func: CheckFunction, isAsync?: any);
    set(options: any): this;
}
export interface ValidationSchema {
    [x: string]: ValidationProvider | ValidationSchema;
}
export declare function required(): ValidationProvider;
export declare function string(): ValidationProvider;
export declare function number(): ValidationProvider;
export declare function min(m: any): ValidationProvider;
export declare function max(m: any): ValidationProvider;
export declare function length(length: any): ValidationProvider;
export declare function equal(data: any): void;
export declare function minLength(length: any): ValidationProvider;
export declare function maxLength(length: any): ValidationProvider;
export declare function object(): ValidationProvider;
export declare function array(schema?: any): ValidationProvider;
export declare function Enum(...list: any[]): ValidationProvider;
export declare function all(...checks: ValidationProvider[]): ValidationProvider;
export declare function some(...checks: any[]): ValidationProvider;
export declare function custom(func: CheckFunction): ValidationProvider;
export {};
