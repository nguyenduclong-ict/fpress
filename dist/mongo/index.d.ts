import { Model, Document } from 'mongoose';
export declare class Provider {
    #private;
    constructor(model: any);
    get model(): Model<Document, {}>;
    findOne(conditions: any, projection?: any, options?: any, inject?: {}): Promise<any>;
    find(conditions: any, projection?: any, options?: any, inject?: {}): Promise<any>;
    findById(id: any, projection: any, options: any): Promise<any>;
    deleteOne(conditions: any, options: {}, inject: any): Promise<any>;
    delete(conditions: any, options: {}, inject: any): Promise<any>;
    createOne(doc: any, inject?: any): Promise<Document>;
    createMany(docs: any, options: {}, inject: any): Promise<any>;
    update(conditions: any, data: any, options: {}, inject: any): Promise<any>;
    updateOne(condition: any, data: any, options: {}, inject: any): Promise<Document>;
    restFind: (target?: string) => (req: any, res: any, next: any) => Promise<void>;
    restFindOne: (target?: "body" | "query") => (req: any, res: any, next: any) => Promise<void>;
    restList: (target?: "body" | "query") => (req: any, res: any, next: any) => Promise<void>;
    restCreateOne: (req: any, res: any, next: any) => Promise<void>;
    restCreateMany: (req: any, res: any, next: any) => Promise<void>;
    restUpdateOne: (req: any, res: any, next: any) => Promise<void>;
    restUpdateMany: (req: any, res: any, next: any) => Promise<void>;
    restDeleteOne: (req: any, res: any, next: any) => Promise<void>;
    restDeleteMany: (req: any, res: any, next: any) => Promise<void>;
}
