export declare function required(v: any, p: any): string;
export declare function string(v: any, p: any): string;
export declare function number(v: any, p: any): string;
export declare function object(v: any, p: any): string;
export declare function array(v: any, p: any): string;
export declare function date(v: any, p: any): string;
export declare function min(minValue: any): (v: any, p: any) => string[];
export declare function max(maxValue: any): (v: any, p: any) => string[];
export declare function minLength(minValue: any): (v: any, p: any) => string[];
export declare function maxLength(maxValue: any): (v: any, p: any) => string[];
export declare function inList(...values: any[]): (v: any, p: any) => string;
export declare function equal(value: any): (v: any, p: any) => string;
export declare function all(...checks: any[]): (v: any, p: any) => any[];
export declare function any(...checks: any[]): (v: any, p: any) => any;
/**
 * check v at leatest is instance of types
 * @param v variable
 * @param types type for check
 */
export declare function is(v: any, ...types: any[]): boolean;
