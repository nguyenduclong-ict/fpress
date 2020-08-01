import { Provider } from '../mongo'
import { Router } from 'express'

export default function (router: Router, provider: Provider) {
    router.get('/', provider.restGetList)
    router.get('/find', provider.restGetFind)
    router.post('/list', provider.restPostList)
    router.post('/find-body', provider.resFindBody)
    router.post('/', provider.restCreateOne)
    router.post('/multiple', provider.restCreateMany)
    router.put('/:id', provider.restUpdateOne)
    router.put('/', provider.restUpdateMany)
    router.delete('/:id', provider.restDeleteOne)
    router.delete('/', provider.restDeleteMany)
}
