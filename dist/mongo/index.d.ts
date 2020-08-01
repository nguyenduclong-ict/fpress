import { Model, Document } from 'mongoose';
export declare class Provider {
    model: Model<Document, {}>;
    constructor(model: any);
    get findOne(): any;
    get find(): any;
    get findById(): any;
    get deleteOne(): any;
    get delete(): any;
    createOne(doc: any): Promise<Document>;
    get createMany(): any;
    update(condition: any, data: any, options?: any): import("mongoose").Query<any>;
    updateOne(condition: any, data: any, options?: any): import("mongoose").Query<any>;
    restGetFind: (req: any, res: any, next: any) => Promise<void>;
    resFindBody: (req: any, res: any, next: any) => Promise<void>;
    restGetList: (req: any, res: any, next: any) => Promise<void>;
    restPostList: (req: any, res: any, next: any) => Promise<void>;
    restCreateOne: (req: any, res: any, next: any) => Promise<void>;
    restCreateMany: (req: any, res: any, next: any) => Promise<void>;
    restUpdateOne: (req: any, res: any, next: any) => Promise<void>;
    restUpdateMany: (req: any, res: any, next: any) => Promise<void>;
    restDeleteOne: (req: any, res: any, next: any) => Promise<void>;
    restDeleteMany: (req: any, res: any, next: any) => Promise<void>;
}
