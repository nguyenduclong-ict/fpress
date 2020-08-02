"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const custom_error_1 = __importDefault(require("../error/custom-error"));
class Provider {
    constructor(model) {
        // REST API
        this.restGetFind = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { query, populate, projection } = req.query;
                query = parseJSON(query);
                populate = parseJSON(populate);
                projection = parseJSON(projection);
                const data = yield this.findOne(query, projection, { populate });
                res.json(data);
            }
            catch (error) {
                logger_1.default.error('restGetFind', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'restGetFind error',
                    data: error,
                }));
            }
        });
        this.resFindBody = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, populate, projection } = req.body;
                const data = yield this.findOne(query, projection, { populate });
                res.json(data);
            }
            catch (error) {
                logger_1.default.error('resFindBody', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'resFindBody error',
                    data: error,
                }));
            }
        });
        // list with method GET
        this.restGetList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = {
                    data: null,
                    pager: undefined,
                };
                let { query, populate, projection, pagination, sort, } = req.query;
                // parse params
                query = parseJSON(query);
                populate = parseJSON(populate);
                projection = parseJSON(projection);
                pagination = parseJSON(pagination);
                sort = parseJSON(sort);
                // end pars
                const task = this.find(query, projection, { populate });
                sort && task.sort;
                if (pagination) {
                    formatPagination(pagination);
                    task.skip((pagination.page - 1) * pagination.pageSize).limit(pagination.pageSize);
                    const [docs, total] = yield Promise.all([
                        task,
                        this.model.countDocuments(query),
                    ]);
                    result.data = docs;
                    result.pager = {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        total,
                        totalPages: Math.ceil(pagination.total / pagination.pageSize),
                    };
                }
                else {
                    result.data = yield task;
                }
                res.json(result);
            }
            catch (error) {
                logger_1.default.error('restGetList', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'restGetList error',
                    data: error,
                }));
            }
        });
        // List by POST method
        this.restPostList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = {
                    data: null,
                    pager: undefined,
                };
                const { query, populate, projection, pagination, sort, } = req.body;
                const task = this.find(query, projection, { populate });
                sort && task.sort;
                if (pagination) {
                    formatPagination(pagination);
                    task.skip((pagination.page - 1) * pagination.pageSize).limit(pagination.pageSize);
                    const [docs, total] = yield Promise.all([
                        task,
                        this.model.countDocuments(query),
                    ]);
                    result.data = docs;
                    result.pager = {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        total,
                        totalPages: Math.ceil(pagination.total / pagination.pageSize),
                    };
                }
                else {
                    result.data = yield task;
                }
                res.json(result);
            }
            catch (error) {
                logger_1.default.error('restPostList', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'restPostList error',
                    data: error,
                }));
            }
        });
        this.restCreateOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const doc = yield this.createOne(data);
                res.json(doc);
            }
            catch (error) {
                logger_1.default.error('restCreate', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'restCreate error',
                    data: error,
                }));
            }
        });
        this.restCreateMany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const docs = yield this.createMany(data);
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error('restCreateMany', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'restCreateMany error',
                    data: error,
                }));
            }
        });
        this.restUpdateOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.updateOne({ _id: req.params.id }, req.body);
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error('restUpdateOne', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'restUpdateOne error',
                    data: error,
                }));
            }
        });
        this.restUpdateMany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, data, options } = req.body;
                const docs = yield this.update(query, data, options);
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error('restUpdateMany', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'restUpdateMany error',
                    data: error,
                }));
            }
        });
        this.restDeleteOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.deleteOne({ _id: req.params.id });
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error('restDeleteOne', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'restDeleteOne error',
                    data: error,
                }));
            }
        });
        this.restDeleteMany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.delete(req.body);
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error('restDeleteMany', req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: 'restDeleteMany error',
                    data: error,
                }));
            }
        });
        this.model = model;
    }
    get findOne() {
        return this.model.findOne.bind(this.model);
    }
    get find() {
        return this.model.find.bind(this.model);
    }
    get findById() {
        return this.model.findById.bind(this.model);
    }
    get deleteOne() {
        return this.model.findOneAndDelete.bind(this.model);
    }
    get delete() {
        return this.model.deleteMany.bind(this.model);
    }
    createOne(doc) {
        return new this.model(doc).save();
    }
    get createMany() {
        return this.model.insertMany.bind(this.model);
    }
    update(condition, data, options) {
        return this.model.updateMany(condition, data, Object.assign({ new: true, setDefaultsOnInsert: true, upsert: false }, (options || {})));
    }
    updateOne(condition, data, options) {
        return this.model.findOneAndUpdate(condition, data, Object.assign({ new: true, setDefaultsOnInsert: true, upsert: false }, (options || {})));
    }
}
exports.Provider = Provider;
function formatPagination(pagination) {
    pagination.page = Number(pagination.page) || 1;
    pagination.pageSize = Number(pagination.pageSize) || 10;
    pagination.total = Number(pagination.total) || 0;
    pagination.totalPages = Number(pagination.totalPages) || 0;
    return pagination;
}
function parseJSON(data) {
    try {
        data = typeof data === 'string' ? JSON.parse(data) : data;
    }
    catch (error) { }
    return data;
}
