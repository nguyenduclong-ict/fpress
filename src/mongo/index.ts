import { Model, Document } from 'mongoose'
import { Pagination, ListParams, FindParams, UpdateManyParams } from './declare'
import logger from '../utils/logger'
import CustomError from '../error/custom-error'
export class Provider {
    model: Model<Document, {}>

    constructor(model) {
        this.model = model
    }

    get findOne() {
        return this.model.findOne
    }
    get find() {
        return this.model.find
    }
    get findById() {
        return this.model.findById
    }

    get deleteOne() {
        return this.model.findOneAndDelete
    }
    get delete() {
        return this.model.deleteMany
    }
    createOne(doc) {
        return new this.model(doc).save()
    }
    get createMany() {
        return this.model.insertMany
    }
    update(condition, data, options?) {
        return this.model.updateMany(condition, data, {
            new: true,
            setDefaultsOnInsert: true,
            upsert: false,
            ...(options || {}),
        })
    }
    updateOne(condition, data, options?) {
        return this.model.updateOne(condition, data, {
            new: true,
            setDefaultsOnInsert: true,
            upsert: false,
            ...(options || {}),
        })
    }

    // REST API
    async restGetFind(req, res, next) {
        try {
            let { query, populate, projection } = req.query as FindParams
            query = parseJSON(query)
            populate = parseJSON(populate)
            projection = parseJSON(projection)
            const data = await this.findOne(query, projection, { populate })
            res.json(data)
        } catch (error) {
            logger.error('restGetFind', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'restGetFind error',
                    data: error,
                })
            )
        }
    }
    async resFindBody(req, res, next) {
        try {
            const { query, populate, projection } = req.body as FindParams
            const data = await this.findOne(query, projection, { populate })
            res.json(data)
        } catch (error) {
            logger.error('resFindBody', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'resFindBody error',
                    data: error,
                })
            )
        }
    }
    // list with method GET
    async restGetList(req, res, next) {
        try {
            let result: { data; pager: Pagination }
            let {
                query,
                populate,
                projection,
                pagination,
                sort,
            } = req.query as ListParams
            // parse params
            query = parseJSON(query)
            populate = parseJSON(populate)
            projection = parseJSON(projection)
            pagination = parseJSON(pagination)
            sort = parseJSON(sort)
            // end pars
            const task = this.find(query, projection, { populate })
            sort && task.sort
            if (pagination) {
                formatPagination(pagination)
                task.skip(pagination.page * pagination.pageSize).limit(
                    pagination.pageSize
                )
                const [docs, total] = await Promise.all([
                    task,
                    this.model.count(query),
                ])
                result.data = docs
                result.pager = {
                    page: pagination.page,
                    pageSize: pagination.pageSize,
                    total,
                    totalPages: Math.ceil(
                        pagination.total / pagination.pageSize
                    ),
                }
            } else {
                result.data = await task
            }
            res.json(result)
        } catch (error) {
            logger.error('restGetList', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'restGetList error',
                    data: error,
                })
            )
        }
    }
    // List by POST method
    async restPostList(req, res, next) {
        try {
            let result: { data; pager: Pagination }
            const {
                query,
                populate,
                projection,
                pagination,
                sort,
            } = req.body as ListParams
            const task = this.find(query, projection, { populate })
            sort && task.sort
            if (pagination) {
                formatPagination(pagination)
                task.skip(pagination.page * pagination.pageSize).limit(
                    pagination.pageSize
                )
                const [docs, total] = await Promise.all([
                    task,
                    this.model.count(query),
                ])
                result.data = docs
                result.pager = {
                    page: pagination.page,
                    pageSize: pagination.pageSize,
                    total,
                    totalPages: Math.ceil(
                        pagination.total / pagination.pageSize
                    ),
                }
            } else {
                result.data = await task
            }
            res.json(result)
        } catch (error) {
            logger.error('restPostList', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'restPostList error',
                    data: error,
                })
            )
        }
    }

    async restCreateOne(req, res, next) {
        try {
            const data = req.body
            const doc = await this.createOne(data)
            res.json(doc)
        } catch (error) {
            logger.error('restCreate', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'restCreate error',
                    data: error,
                })
            )
        }
    }
    async restCreateMany(req, res, next) {
        try {
            const data = req.body
            const docs = await this.createMany(data)
            res.json(docs)
        } catch (error) {
            logger.error('restCreateMany', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'restCreateMany error',
                    data: error,
                })
            )
        }
    }
    async restUpdateOne(req, res, next) {
        try {
            const docs = await this.updateOne({ _id: req.params.id }, req.body)
            res.json(docs)
        } catch (error) {
            logger.error('restUpdateOne', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'restUpdateOne error',
                    data: error,
                })
            )
        }
    }
    async restUpdateMany(req, res, next) {
        try {
            const { query, data, options } = req.body as UpdateManyParams
            const docs = await this.update(query, data, options)
            res.json(docs)
        } catch (error) {
            logger.error('restUpdateMany', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'restUpdateMany error',
                    data: error,
                })
            )
        }
    }
    async restDeleteOne(req, res, next) {
        try {
            const docs = await this.deleteOne({ _id: req.params.id })
            res.json(docs)
        } catch (error) {
            logger.error('restDeleteOne', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'restDeleteOne error',
                    data: error,
                })
            )
        }
    }
    async restDeleteMany(req, res, next) {
        try {
            const docs = await this.delete(req.body)
            res.json(docs)
        } catch (error) {
            logger.error('restDeleteMany', req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: 'restDeleteMany error',
                    data: error,
                })
            )
        }
    }
}

function formatPagination(pagination: Pagination): Pagination {
    pagination.page = Number(pagination.page) || 0
    pagination.pageSize = Number(pagination.pageSize) || 10
    pagination.total = Number(pagination.total) || 0
    pagination.totalPages = Number(pagination.totalPages) || 0
    return pagination
}

function parseJSON(data) {
    if (typeof data === 'string') {
        try {
            return JSON.parse(data)
        } catch (error) {
            return data
        }
    }
    return data
}
