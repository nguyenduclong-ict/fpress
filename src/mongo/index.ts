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
        return this.model.findOne.bind(this.model)
    }
    get find() {
        return this.model.find.bind(this.model)
    }
    get findById() {
        return this.model.findById.bind(this.model)
    }

    get deleteOne() {
        return this.model.findOneAndDelete.bind(this.model)
    }
    get delete() {
        return this.model.deleteMany.bind(this.model)
    }
    createOne(doc) {
        return new this.model(doc).save()
    }
    get createMany() {
        return this.model.insertMany.bind(this.model)
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
        return this.model.findOneAndUpdate(condition, data, {
            new: true,
            setDefaultsOnInsert: true,
            upsert: false,
            ...(options || {}),
        })
    }

    // REST API
    restGetFind = async (req, res, next) => {
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
    resFindBody = async (req, res, next) => {
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
    restGetList = async (req, res, next) => {
        try {
            let result: { data; pager: Pagination } = {
                data: null,
                pager: undefined,
            }
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
                task.skip((pagination.page - 1) * pagination.pageSize).limit(
                    pagination.pageSize
                )
                const [docs, total] = await Promise.all([
                    task,
                    this.model.countDocuments(query),
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
    restPostList = async (req, res, next) => {
        try {
            let result: { data; pager: Pagination } = {
                data: null,
                pager: undefined,
            }
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
                task.skip((pagination.page - 1) * pagination.pageSize).limit(
                    pagination.pageSize
                )
                const [docs, total] = await Promise.all([
                    task,
                    this.model.countDocuments(query),
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

    restCreateOne = async (req, res, next) => {
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
    restCreateMany = async (req, res, next) => {
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
    restUpdateOne = async (req, res, next) => {
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
    restUpdateMany = async (req, res, next) => {
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
    restDeleteOne = async (req, res, next) => {
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
    restDeleteMany = async (req, res, next) => {
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
    pagination.page = Number(pagination.page) || 1
    pagination.pageSize = Number(pagination.pageSize) || 10
    pagination.total = Number(pagination.total) || 0
    pagination.totalPages = Number(pagination.totalPages) || 0
    return pagination
}

function parseJSON(data) {
    try {
        data = typeof data === 'string' ? JSON.parse(data) : data
    } catch (error) {}
    return data
}
