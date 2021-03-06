import {
    Model,
    Document,
    QueryFindBaseOptions,
    QueryFindOneAndRemoveOptions,
    ModelOptions,
    ModelUpdateOptions,
    QueryFindOneAndUpdateOptions,
} from 'mongoose'
import { Pagination, ListParams, FindParams, UpdateManyParams } from './declare'
import logger from '../utils/logger'
import CustomError from '../error/custom-error'
export class Provider {
    #model: Model<Document, {}>

    // DECLARE HOOKS
    // PRE
    $preCreateOne: (doc, inject) => any
    $preCreateMany: (doc, options, inject) => any

    $preUpdateOne: (conditions, data, options, inject) => any
    $preUpdateMany: (conditions, data, options, inject) => any

    $preDeleteOne: (conditions, options, inject) => any
    $preDeleteMany: (conditions, options, inject) => any

    $preFind: (conditions, projection, options, inject) => any
    $preFindOne: (conditions, projection, options, inject) => any
    $preFindById: (id, projection, options) => any
    // AFTER
    $afterCreateOne: (doc, inject, result) => any
    $afterCreateMany: (docs, options, inject, result) => any

    $afterUpdateOne: (condition, data, options, inject, result) => any
    $afterUpdateMany: (condition, data, options, inject, result) => any

    $afterDeleteOne: (condition, options, inject, result) => any
    $afterDeleteMany: (condition, options, inject, result) => any

    $afterFind: (conditions, projection, options, inject, result) => any
    $afterFindOne: (conditions, projection, options, inject, result) => any
    $afterFindById: (id, projection, options, result) => any
    // END HOOKS

    constructor(model) {
        this.#model = model
    }

    get model() {
        return this.#model
    }

    async findOne(
        conditions,
        projection?,
        options?: QueryFindBaseOptions,
        inject = {}
    ) {
        if (typeof this.$preFindOne === 'function') {
            this.$preFindOne.call(this, conditions, projection, options, inject)
        }
        let result = await this.model.findOne.call(
            this.model,
            conditions,
            projection,
            options
        )
        if (typeof this.$afterFindOne === 'function') {
            result =
                (await this.$afterFindOne.call(
                    this,
                    conditions,
                    projection,
                    options,
                    inject,
                    result
                )) || result
        }
        return result
    }

    async find(
        conditions,
        projection?,
        options?: QueryFindBaseOptions & { sort },
        inject = {}
    ) {
        if (typeof this.$preFind === 'function') {
            this.$preFind.call(this, conditions, projection, options, inject)
        }
        let result = await this.model.find.call(
            this.model,
            conditions,
            projection,
            options
        )

        if (typeof this.$afterFind === 'function') {
            result =
                (await this.$afterFind.call(
                    this,
                    conditions,
                    projection,
                    options,
                    inject,
                    result
                )) || result
        }
        return result
    }

    async findById(id, projection, options: QueryFindBaseOptions) {
        if (typeof this.$preFindById === 'function') {
            this.$preFindById.call(this, id, projection, options)
        }
        let result = await this.model.findById.call(
            this.model,
            id,
            projection,
            options
        )
        if (typeof this.$afterFindById === 'function') {
            this.$afterFindById.call(this, id, projection, options, result)
        }
        return result
    }

    async deleteOne(
        conditions,
        options: QueryFindOneAndRemoveOptions = {},
        inject = {}
    ) {
        if (typeof this.$preDeleteOne === 'function') {
            await this.$preDeleteOne.call(this, conditions, options, inject)
        }
        let result = await this.model.findOneAndDelete.call(
            this.model,
            conditions,
            options
        )
        if (typeof this.$afterDeleteOne === 'function') {
            result =
                (await this.$afterDeleteOne.call(
                    this,
                    conditions,
                    options,
                    inject,
                    result
                )) || result
        }
        return result
    }

    async delete(conditions, options: ModelOptions = {}, inject = {}) {
        if (typeof this.$preDeleteMany === 'function') {
            await this.$preDeleteMany.call(this, conditions, options, inject)
        }
        let result = await this.model.deleteMany.call(
            this.model,
            conditions,
            options
        )
        if (typeof this.$afterDeleteMany === 'function') {
            result =
                (await this.$afterDeleteMany.call(
                    this,
                    conditions,
                    options,
                    inject,
                    result
                )) || result
        }
        return result
    }

    // CREATE
    async createOne(doc, inject = {}) {
        if (typeof this.$preCreateOne === 'function') {
            await this.$preCreateOne.call(this, doc, inject)
        }
        let result = await new this.model(doc).save()
        if (typeof this.$afterCreateOne === 'function') {
            result =
                (await this.$afterCreateOne.call(this, doc, inject, result)) ||
                result
        }
        return result
    }

    async createMany(
        docs,
        options: { ordered?: boolean; rawResult?: boolean } & ModelOptions = {},
        inject = {}
    ) {
        if (typeof this.$preCreateMany === 'function') {
            await this.$preCreateMany.call(this, docs, options, inject)
        }
        let result = await this.model.insertMany.call(this.model, docs, options)
        if (typeof this.$afterCreateMany === 'function') {
            result =
                (await this.$afterCreateMany.call(
                    this,
                    docs,
                    options,
                    inject,
                    result
                )) || result
        }
        return result
    }

    // UPDATE
    async update(
        conditions,
        data,
        options: ModelUpdateOptions = {},
        inject = {}
    ) {
        if (typeof this.$preUpdateMany === 'function') {
            await this.$preUpdateMany.call(
                this,
                conditions,
                data,
                options,
                inject
            )
        }
        let result = await this.model.updateMany(conditions, data, {
            new: true,
            setDefaultsOnInsert: true,
            upsert: false,
            ...(options || {}),
        })
        if (typeof this.$afterUpdateMany === 'function') {
            result =
                (await this.$afterUpdateMany.call(
                    this,
                    conditions,
                    data,
                    options,
                    inject,
                    result
                )) || result
        }
        return result
    }

    async updateOne(
        condition,
        data,
        options: QueryFindOneAndUpdateOptions = {},
        inject = {}
    ) {
        if (typeof this.$preUpdateOne === 'function') {
            await this.$preUpdateOne.call(
                this,
                condition,
                data,
                options,
                inject
            )
        }

        let result = await this.model.findOneAndUpdate(condition, data, {
            new: true,
            setDefaultsOnInsert: true,
            upsert: false,
            ...options,
        })

        if (typeof this.$afterUpdateOne === 'function') {
            result =
                (await this.$afterUpdateOne.call(
                    this,
                    condition,
                    data,
                    options,
                    inject,
                    result
                )) || result
        }
        return result
    }

    // REST API
    restFind = (target = 'query') => async (req, res, next) => {
        try {
            let { query, populate, projection, sort } = req[
                target
            ] as FindParams
            query = parseJSON(query)
            populate = buildPopulate(populate)
            projection = parseJSON(projection)
            const data = await this.find(
                query,
                projection,
                { populate, sort },
                { req, res, next }
            )
            res.json(data)
        } catch (error) {
            logger.error(
                `Find ${this.model.name} (req.${target}) Error`,
                req.path,
                error
            )
            next(
                new CustomError({
                    code: 500,
                    message: `Find ${this.model.name} (req.${target}) Error`,
                    data: error,
                })
            )
        }
    }
    restFindOne = (target: 'query' | 'body' = 'query') => async (
        req,
        res,
        next
    ) => {
        try {
            let { query, populate, projection } = req[target] as FindParams
            query = parseJSON(query)
            populate = buildPopulate(populate)
            projection = parseJSON(projection)
            const data = await this.findOne(
                query,
                projection,
                { populate },
                { req, res, next }
            )
            res.json(data)
        } catch (error) {
            logger.error(
                `FindOne ${this.model.name} (req.${target}) Error`,
                req.path,
                error
            )
            next(
                new CustomError({
                    code: 500,
                    message: `FindOne ${this.model.name} (req.${target}) Error`,
                    data: error,
                })
            )
        }
    }
    // list with method GET
    restList = (target: 'query' | 'body' = 'query') => async (
        req,
        res,
        next
    ) => {
        try {
            let { query, populate, projection, pagination, sort } = req[
                target
            ] as ListParams
            // parse params
            query = parseJSON(query)
            populate = buildPopulate(populate)
            projection = parseJSON(projection)
            pagination = parseJSON(pagination)
            // end prams
            const options: any = { populate, sort }
            pagination = formatPagination(pagination)
            options.skip = (pagination.page - 1) * pagination.pageSize
            options.limit = pagination.pageSize

            const task = this.find(query, projection, options, {
                req,
                res,
                next,
            })
            const [docs, total] = await Promise.all([
                task,
                this.model.countDocuments(query),
            ])

            const result = {
                data: docs,
                pager: {
                    page: pagination.page,
                    pageSize: pagination.pageSize,
                    total,
                    totalPages: Math.ceil(total / pagination.pageSize),
                },
            }
            res.json(result)
        } catch (error) {
            logger.error(
                `List ${this.model.name} (req.${target}) Error`,
                req.path,
                error
            )
            next(
                new CustomError({
                    code: 500,
                    message: `List ${this.model.name} (req.${target}) Error`,
                    data: error,
                })
            )
        }
    }

    restCreateOne = async (req, res, next) => {
        try {
            const data = req.body
            const doc = await this.createOne(data, { req, res, next })
            res.json(doc)
        } catch (error) {
            logger.error(`restCreate ${this.model.name} Error`, req.path, error)
            next(
                new CustomError({
                    code: 500,
                    message: `restCreate ${this.model.name} Error`,
                    data: error,
                })
            )
        }
    }
    restCreateMany = async (req, res, next) => {
        try {
            const data = req.body
            const docs = await this.createMany(data, {}, { req, res, next })
            res.json(docs)
        } catch (error) {
            logger.error(
                `restCreateMany ${this.model.name} Error`,
                req.path,
                error
            )
            next(
                new CustomError({
                    code: 500,
                    message: `restCreateMany ${this.model.name} Error`,
                    data: error,
                })
            )
        }
    }
    restUpdateOne = async (req, res, next) => {
        try {
            const docs = await this.updateOne(
                { _id: req.params.id },
                req.body,
                {},
                { req, res, next }
            )
            res.json(docs)
        } catch (error) {
            logger.error(
                `restUpdateOne ${this.model.name} Error`,
                req.path,
                error
            )
            next(
                new CustomError({
                    code: 500,
                    message: `restUpdateOne ${this.model.name} Error`,
                    data: error,
                })
            )
        }
    }
    restUpdateMany = async (req, res, next) => {
        try {
            const { query, data, options } = req.body as UpdateManyParams
            const docs = await this.update(query, data, options, {
                req,
                res,
                next,
            })
            res.json(docs)
        } catch (error) {
            logger.error(
                `restUpdateMany ${this.model.name} Error`,
                req.path,
                error
            )
            next(
                new CustomError({
                    code: 500,
                    message: `restUpdateMany ${this.model.name} Error`,
                    data: error,
                })
            )
        }
    }
    restDeleteOne = async (req, res, next) => {
        try {
            const docs = await this.deleteOne(
                { _id: req.params.id },
                {},
                { req, res, next }
            )
            res.json(docs)
        } catch (error) {
            logger.error(
                `restDeleteOne ${this.model.name} Error`,
                req.path,
                error
            )
            next(
                new CustomError({
                    code: 500,
                    message: `restDeleteOne ${this.model.name} Error`,
                    data: error,
                })
            )
        }
    }
    restDeleteMany = async (req, res, next) => {
        try {
            const docs = await this.delete(req.body, {}, { req, res, next })
            res.json(docs)
        } catch (error) {
            logger.error(
                `restDeleteMany ${this.model.name} Error`,
                req.path,
                error
            )
            next(
                new CustomError({
                    code: 500,
                    message: `restDeleteMany ${this.model.name} Error`,
                    data: error,
                })
            )
        }
    }
}

function formatPagination(pagination: Pagination = {} as any): Pagination {
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

function buildPopulate(populate) {
    populate = parseJSON(populate)

    if (!Array.isArray(populate)) {
        populate = [populate]
    }

    populate = populate.map((item) => {
        if (typeof item === 'string') {
            let [path, select, model] = item.split(':')
            path = path || undefined
            select = select || undefined
            model = model || undefined
            return { path, select, model }
        } else {
            return item
        }
    })

    return populate
}
