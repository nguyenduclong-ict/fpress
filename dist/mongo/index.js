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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _model;
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
const custom_error_1 = __importDefault(require("../error/custom-error"));
class Provider {
    // END HOOKS
    constructor(model) {
        _model.set(this, void 0);
        // REST API
        this.restFind = (target = 'query') => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { query, populate, projection, sort } = req[target];
                query = parseJSON(query);
                populate = buildPopulate(populate);
                projection = parseJSON(projection);
                const data = yield this.find(query, projection, { populate, sort }, { req, res, next });
                res.json(data);
            }
            catch (error) {
                logger_1.default.error(`Find ${this.model.name} (req.${target}) Error`, req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: `Find ${this.model.name} (req.${target}) Error`,
                    data: error,
                }));
            }
        });
        this.restFindOne = (target = 'query') => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { query, populate, projection } = req[target];
                query = parseJSON(query);
                populate = buildPopulate(populate);
                projection = parseJSON(projection);
                const data = yield this.findOne(query, projection, { populate }, { req, res, next });
                res.json(data);
            }
            catch (error) {
                logger_1.default.error(`FindOne ${this.model.name} (req.${target}) Error`, req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: `FindOne ${this.model.name} (req.${target}) Error`,
                    data: error,
                }));
            }
        });
        // list with method GET
        this.restList = (target = 'query') => (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { query, populate, projection, pagination, sort } = req[target];
                // parse params
                query = parseJSON(query);
                populate = buildPopulate(populate);
                projection = parseJSON(projection);
                pagination = parseJSON(pagination);
                // end prams
                const options = { populate, sort };
                formatPagination(pagination);
                options.skip = (pagination.page - 1) * pagination.pageSize;
                options.limit = pagination.pageSize;
                const task = this.find(query, projection, options, {
                    req,
                    res,
                    next,
                });
                const [docs, total] = yield Promise.all([
                    task,
                    this.model.countDocuments(query),
                ]);
                const result = {
                    data: docs,
                    pager: {
                        page: pagination.page,
                        pageSize: pagination.pageSize,
                        total,
                        totalPages: Math.ceil(total / pagination.pageSize),
                    },
                };
                res.json(result);
            }
            catch (error) {
                logger_1.default.error(`List ${this.model.name} (req.${target}) Error`, req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: `List ${this.model.name} (req.${target}) Error`,
                    data: error,
                }));
            }
        });
        this.restCreateOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const doc = yield this.createOne(data, { req, res, next });
                res.json(doc);
            }
            catch (error) {
                logger_1.default.error(`restCreate ${this.model.name} Error`, req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: `restCreate ${this.model.name} Error`,
                    data: error,
                }));
            }
        });
        this.restCreateMany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const docs = yield this.createMany(data, {}, { req, res, next });
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error(`restCreateMany ${this.model.name} Error`, req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: `restCreateMany ${this.model.name} Error`,
                    data: error,
                }));
            }
        });
        this.restUpdateOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.updateOne({ _id: req.params.id }, req.body, {}, { req, res, next });
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error(`restUpdateOne ${this.model.name} Error`, req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: `restUpdateOne ${this.model.name} Error`,
                    data: error,
                }));
            }
        });
        this.restUpdateMany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { query, data, options } = req.body;
                const docs = yield this.update(query, data, options, {
                    req,
                    res,
                    next,
                });
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error(`restUpdateMany ${this.model.name} Error`, req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: `restUpdateMany ${this.model.name} Error`,
                    data: error,
                }));
            }
        });
        this.restDeleteOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.deleteOne({ _id: req.params.id }, {}, { req, res, next });
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error(`restDeleteOne ${this.model.name} Error`, req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: `restDeleteOne ${this.model.name} Error`,
                    data: error,
                }));
            }
        });
        this.restDeleteMany = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const docs = yield this.delete(req.body, {}, { req, res, next });
                res.json(docs);
            }
            catch (error) {
                logger_1.default.error(`restDeleteMany ${this.model.name} Error`, req.path, error);
                next(new custom_error_1.default({
                    code: 500,
                    message: `restDeleteMany ${this.model.name} Error`,
                    data: error,
                }));
            }
        });
        __classPrivateFieldSet(this, _model, model);
    }
    get model() {
        return __classPrivateFieldGet(this, _model);
    }
    findOne(conditions, projection, options, inject = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.$preFindOne === 'function') {
                this.$preFindOne.call(this, conditions, projection, options, inject);
            }
            let result = yield this.model.findOne.call(this.model, conditions, projection, options);
            if (typeof this.$afterFindOne === 'function') {
                result =
                    (yield this.$afterFindOne.call(this, conditions, projection, options, inject, result)) || result;
            }
            return result;
        });
    }
    find(conditions, projection, options, inject = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.$preFind === 'function') {
                this.$preFind.call(this, conditions, projection, options, inject);
            }
            let result = yield this.model.find.call(this.model, conditions, projection, options);
            if (typeof this.$afterFind === 'function') {
                result =
                    (yield this.$afterFind.call(this, conditions, projection, options, inject, result)) || result;
            }
            return result;
        });
    }
    findById(id, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.$preFindById === 'function') {
                this.$preFindById.call(this, id, projection, options);
            }
            let result = yield this.model.findById.call(this.model, id, projection, options);
            if (typeof this.$afterFindById === 'function') {
                this.$afterFindById.call(this, id, projection, options, result);
            }
            return result;
        });
    }
    deleteOne(conditions, options = {}, inject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.$preDeleteOne === 'function') {
                yield this.$preDeleteOne.call(this, conditions, options, inject);
            }
            let result = yield this.model.findOneAndDelete.call(this.model, conditions, options);
            if (typeof this.$afterDeleteOne === 'function') {
                result =
                    (yield this.$afterDeleteOne.call(this, conditions, options, inject, result)) || result;
            }
            return result;
        });
    }
    delete(conditions, options = {}, inject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.$preDeleteMany === 'function') {
                yield this.$preDeleteMany.call(this, conditions, options, inject);
            }
            let result = yield this.model.deleteMany.call(this.model, conditions, options);
            if (typeof this.$afterDeleteMany === 'function') {
                result =
                    (yield this.$afterDeleteMany.call(this, conditions, options, inject, result)) || result;
            }
            return result;
        });
    }
    // CREATE
    createOne(doc, inject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.$preCreateOne === 'function') {
                yield this.$preCreateOne.call(this, doc, inject);
            }
            let result = yield new this.model(doc).save();
            if (typeof this.$afterCreateOne === 'function') {
                result =
                    (yield this.$afterCreateOne.call(this, doc, inject, result)) ||
                        result;
            }
            return result;
        });
    }
    createMany(docs, options = {}, inject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.$preCreateMany === 'function') {
                yield this.$preCreateMany.call(this, docs, options, inject);
            }
            let result = yield this.model.insertMany.call(this.model, docs, options);
            if (typeof this.$afterCreateMany === 'function') {
                result =
                    (yield this.$afterCreateMany.call(this, docs, options, inject, result)) || result;
            }
            return result;
        });
    }
    // UPDATE
    update(conditions, data, options = {}, inject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.$preUpdateMany === 'function') {
                yield this.$preUpdateMany.call(this, conditions, data, options, inject);
            }
            let result = yield this.model.updateMany(conditions, data, Object.assign({ new: true, setDefaultsOnInsert: true, upsert: false }, (options || {})));
            if (typeof this.$afterUpdateMany === 'function') {
                result =
                    (yield this.$afterUpdateMany.call(this, conditions, data, options, inject, result)) || result;
            }
            return result;
        });
    }
    updateOne(condition, data, options = {}, inject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.$preUpdateOne === 'function') {
                yield this.$preUpdateOne.call(this, condition, data, options, inject);
            }
            let result = yield this.model.findOneAndUpdate(condition, data, Object.assign({ new: true, setDefaultsOnInsert: true, upsert: false }, options));
            if (typeof this.$afterUpdateOne === 'function') {
                result =
                    (yield this.$afterUpdateOne.call(this, condition, data, options, inject, result)) || result;
            }
            return result;
        });
    }
}
exports.Provider = Provider;
_model = new WeakMap();
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
function buildPopulate(populate) {
    populate = buildPopulate(populate);
    if (!Array.isArray(populate)) {
        populate = [populate];
    }
    populate = populate.map((item) => {
        if (typeof item === 'string') {
            let [path, select, model] = item.split(':');
            return { path, select, model };
        }
        else {
            return item;
        }
    });
    return populate;
}
