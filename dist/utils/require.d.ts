declare class Module {
    dir: string;
    path: string;
    exports: any;
}
export declare function requireAll(directory: any, maxDeep?: number, currentDeep?: number): Module[];
export {};
