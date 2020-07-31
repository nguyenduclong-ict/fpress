declare const _default: {
    log(...args: any[]): void;
    info(...args: any[]): void;
    warning(...args: any[]): void;
    error(...args: any[]): void;
    custom: {
        info: (text: any, ...args: any[]) => void;
        warning: (text: any, ...args: any[]) => void;
        error: (text: any, ...args: any[]) => void;
    };
};
export default _default;
