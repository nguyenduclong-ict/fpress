declare class Module {
    dir: string;
    path: string;
    exports: any;
}
export declare function requireAll(directory: any, currentDeep?: number, maxDeep?: number): Module[];
export {};
