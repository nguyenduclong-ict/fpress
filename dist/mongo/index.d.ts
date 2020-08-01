import { Model, Document } from 'mongoose';
export declare class Provider {
    model: Model<Document, {}>;
    constructor(model: any);
    get findOne(): {
        (conditions?: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, callback?: (err: any, res: Document) => void): import("mongoose").DocumentQuery<Document, Document, {}>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, projection: any, callback?: (err: any, res: Document) => void): import("mongoose").DocumentQuery<Document, Document, {}>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, projection: any, options: {
            lean: true;
        } & Pick<import("mongoose").QueryFindBaseOptions, "session" | "populate" | "collation" | "explain" | "projection">, callback?: (err: any, res: Document) => void): import("mongoose").Query<Pick<Document, "_id">>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, projection: any, options: import("mongoose").QueryFindBaseOptions, callback?: (err: any, res: Document) => void): import("mongoose").DocumentQuery<Document, Document, {}>;
    };
    get find(): {
        (callback?: (err: any, res: Document[]) => void): import("mongoose").DocumentQuery<Document[], Document, {}>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, callback?: (err: any, res: Document[]) => void): import("mongoose").DocumentQuery<Document[], Document, {}>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, projection?: any, callback?: (err: any, res: Document[]) => void): import("mongoose").DocumentQuery<Document[], Document, {}>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, projection?: any, options?: {
            lean: true;
        } & Pick<import("mongoose").QueryFindOptions, "session" | "sort" | "snapshot" | "populate" | "readPreference" | "collation" | "explain" | "projection" | "batchSize" | "comment" | "hint" | "limit" | "maxscan" | "skip" | "tailable">, callback?: (err: any, res: Document[]) => void): import("mongoose").Query<Pick<Document, "_id">[]>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, projection?: any, options?: import("mongoose").QueryFindOptions, callback?: (err: any, res: Document[]) => void): import("mongoose").DocumentQuery<Document[], Document, {}>;
    };
    get findById(): {
        (id: any, callback?: (err: any, res: Document) => void): import("mongoose").DocumentQuery<Document, Document, {}>;
        (id: any, projection: any, callback?: (err: any, res: Document) => void): import("mongoose").DocumentQuery<Document, Document, {}>;
        (id: any, projection: any, options: {
            lean: true;
        } & Pick<import("mongoose").QueryFindBaseOptions, "session" | "populate" | "collation" | "explain" | "projection">, callback?: (err: any, res: Document) => void): import("mongoose").Query<Pick<Document, "_id">>;
        (id: any, projection: any, options: import("mongoose").QueryFindBaseOptions, callback?: (err: any, res: Document) => void): import("mongoose").DocumentQuery<Document, Document, {}>;
    };
    get deleteOne(): {
        (): import("mongoose").DocumentQuery<Document, Document, {}>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, callback?: (err: any, res: Document) => void): import("mongoose").DocumentQuery<Document, Document, {}>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, options: {
            rawResult: true;
        } & import("mongoose").QueryFindOneAndRemoveOptions, callback?: (err: any, doc: import("mongodb").FindAndModifyWriteOpResultObject<Document>, res: any) => void): import("mongoose").Query<import("mongodb").FindAndModifyWriteOpResultObject<Document>>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, options: import("mongoose").QueryFindOneAndRemoveOptions, callback?: (err: any, res: Document) => void): import("mongoose").DocumentQuery<Document, Document, {}>;
    };
    get delete(): {
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, callback?: (err: any) => void): import("mongoose").Query<{
            ok?: number;
            n?: number;
        } & {
            deletedCount?: number;
        }>;
        (conditions: import("mongoose").MongooseFilterQuery<Pick<Document, "_id">>, options: import("mongoose").ModelOptions, callback?: (err: any) => void): import("mongoose").Query<{
            ok?: number;
            n?: number;
        } & {
            deletedCount?: number;
        }>;
    };
    createOne(doc: any): Promise<Document>;
    get createMany(): {
        (docs: any[], callback?: (error: any, docs: Document[]) => void): Promise<Document[]>;
        (docs: any[], options?: {
            ordered?: boolean;
            rawResult?: boolean;
        } & import("mongoose").ModelOptions, callback?: (error: any, docs: Document[]) => void): Promise<Document[]>;
        (doc: any, callback?: (error: any, doc: Document) => void): Promise<Document>;
        (doc: any, options?: {
            ordered?: boolean;
            rawResult?: boolean;
        } & import("mongoose").ModelOptions, callback?: (error: any, doc: Document) => void): Promise<Document>;
    };
    update(condition: any, data: any, options?: any): import("mongoose").Query<any>;
    updateOne(condition: any, data: any, options?: any): import("mongoose").Query<any>;
    restGetFind(req: any, res: any, next: any): Promise<void>;
    resFindBody(req: any, res: any, next: any): Promise<void>;
    restGetList(req: any, res: any, next: any): Promise<void>;
    restPostList(req: any, res: any, next: any): Promise<void>;
    restCreateOne(req: any, res: any, next: any): Promise<void>;
    restCreateMany(req: any, res: any, next: any): Promise<void>;
    restUpdateOne(req: any, res: any, next: any): Promise<void>;
    restUpdateMany(req: any, res: any, next: any): Promise<void>;
    restDeleteOne(req: any, res: any, next: any): Promise<void>;
    restDeleteMany(req: any, res: any, next: any): Promise<void>;
}
