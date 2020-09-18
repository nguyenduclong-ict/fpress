import { Model, Document, QueryFindBaseOptions, QueryFindOneAndRemoveOptions, ModelOptions, ModelUpdateOptions, QueryFindOneAndUpdateOptions } from 'mongoose';
export declare class Provider {
    #private;
    $preCreateOne: (doc: any, inject: any) => any;
    $preCreateMany: (doc: any, options: any, inject: any) => any;
    $preUpdateOne: (conditions: any, data: any, options: any, inject: any) => any;
    $preUpdateMany: (conditions: any, data: any, options: any, inject: any) => any;
    $preDeleteOne: (conditions: any, options: any, inject: any) => any;
    $preDeleteMany: (conditions: any, options: any, inject: any) => any;
    $preFind: (conditions: any, projection: any, options: any, inject: any) => any;
    $preFindOne: (conditions: any, projection: any, options: any, inject: any) => any;
    $preFindById: (id: any, projection: any, options: any) => any;
    $afterCreateOne: (doc: any, inject: any, result: any) => any;
    $afterCreateMany: (docs: any, options: any, inject: any, result: any) => any;
    $afterUpdateOne: (condition: any, data: any, options: any, inject: any, result: any) => any;
    $afterUpdateMany: (condition: any, data: any, options: any, inject: any, result: any) => any;
    $afterDeleteOne: (condition: any, options: any, inject: any, result: any) => any;
    $afterDeleteMany: (condition: any, options: any, inject: any, result: any) => any;
    $afterFind: (conditions: any, projection: any, options: any, inject: any, result: any) => any;
    $afterFindOne: (conditions: any, projection: any, options: any, inject: any, result: any) => any;
    $afterFindById: (id: any, projection: any, options: any, result: any) => any;
    constructor(model: any);
    get model(): Model<Document, {}>;
    findOne(conditions: any, projection?: any, options?: QueryFindBaseOptions, inject?: {}): Promise<any>;
    find(conditions: any, projection?: any, options?: QueryFindBaseOptions & {
        sort: any;
    }, inject?: {}): Promise<any>;
    findById(id: any, projection: any, options: QueryFindBaseOptions): Promise<any>;
    deleteOne(conditions: any, options?: QueryFindOneAndRemoveOptions, inject?: {}): Promise<any>;
    delete(conditions: any, options?: ModelOptions, inject?: {}): Promise<any>;
    createOne(doc: any, inject?: {}): Promise<Document>;
    createMany(docs: any, options?: {
        ordered?: boolean;
        rawResult?: boolean;
    } & ModelOptions, inject?: {}): Promise<any>;
    update(conditions: any, data: any, options?: ModelUpdateOptions, inject?: {}): Promise<any>;
    updateOne(condition: any, data: any, options?: QueryFindOneAndUpdateOptions, inject?: {}): Promise<Document>;
    restFind: (target?: string) => (req: any, res: any, next: any) => Promise<void>;
    restFindOne: (target?: 'query' | 'body') => (req: any, res: any, next: any) => Promise<void>;
    restList: (target?: 'query' | 'body') => (req: any, res: any, next: any) => Promise<void>;
    restCreateOne: (req: any, res: any, next: any) => Promise<void>;
    restCreateMany: (req: any, res: any, next: any) => Promise<void>;
    restUpdateOne: (req: any, res: any, next: any) => Promise<void>;
    restUpdateMany: (req: any, res: any, next: any) => Promise<void>;
    restDeleteOne: (req: any, res: any, next: any) => Promise<void>;
    restDeleteMany: (req: any, res: any, next: any) => Promise<void>;
}
