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
    return options
}

export default function (
    router: Router,
    provider: Provider,
    middleware: MiddlewareOptions
) {
    const m = validateMiddlewareOptions(middleware)
    router.get('/find', ...m.all, ...m.find, provider.restGetFind)
    router.post('/find-body', ...m.all, ...m.find, provider.resFindBody)
    router.get('/', ...m.all, ...m.list, provider.restGetList)
    router.post('/list', ...m.all, ...m.list, provider.restPostList)
    router.post('/', ...m.all, ...m.create, provider.restCreateOne)
    router.post('/multiple', ...m.all, ...m.create, provider.restCreateMany)
    router.put('/:id', ...m.all, ...m.update, provider.restUpdateOne)
    router.put('/', ...m.all, ...m.update, provider.restUpdateMany)
    router.delete('/:id', ...m.all, ...m.delete, provider.restDeleteOne)
    router.delete('/', ...m.all, ...m.delete, provider.restDeleteMany)
}
