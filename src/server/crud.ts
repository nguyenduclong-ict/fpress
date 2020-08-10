import { Provider } from '../mongo'
import { Router } from 'express'

interface MiddlewareOptions {
    all: any[]
    list: any[]
    find: any[]
    create: any[]
    update: any[]
    delete: any[]
}

const validateMiddlewareOptions = (options: MiddlewareOptions) => {
    options = options || ({} as any)
    options.all = options.all || []
    options.list = options.list || []
    options.find = options.find || []
    options.create = options.create || []
    options.update = options.update || []
    options.delete = options.delete || []
    Object.keys(options).forEach((key) => {
        if (!Array.isArray(options[key])) {
            options[key] = [options[key]]
        }
    })
    return options
}

export default function (
    router: Router,
    provider: Provider,
    middleware: MiddlewareOptions
) {
    const m = validateMiddlewareOptions(middleware)
    // Find
    router.get('/find', ...m.all, ...m.find, provider.restFind('query'))
    router.post('/find', ...m.all, ...m.find, provider.restFind('body'))
    // Find one
    router.post('/find-one', ...m.all, ...m.find, provider.restFindOne('query'))
    router.get('/find-one', ...m.all, ...m.find, provider.restFindOne('body'))
    // List
    router.get('/', ...m.all, ...m.list, provider.restList('query'))
    router.post('/list', ...m.all, ...m.list, provider.restList('body'))
    // Create
    router.post('/', ...m.all, ...m.create, provider.restCreateOne)
    router.post('/multiple', ...m.all, ...m.create, provider.restCreateMany)
    // Update
    router.put('/:id', ...m.all, ...m.update, provider.restUpdateOne)
    router.put('/', ...m.all, ...m.update, provider.restUpdateMany)
    // Delete
    router.delete('/:id', ...m.all, ...m.delete, provider.restDeleteOne)
    router.delete('/', ...m.all, ...m.delete, provider.restDeleteMany)
}
