"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(router, provider) {
    router.get('/', provider.restGetList);
    router.get('/find', provider.restGetFind);
    router.post('/list', provider.restPostList);
    router.post('/find-body', provider.resFindBody);
    router.post('/', provider.restCreateOne);
    router.post('/multiple', provider.restCreateMany);
    router.put('/:id', provider.restUpdateOne);
    router.put('/', provider.restUpdateMany);
    router.delete('/:id', provider.restDeleteOne);
    router.delete('/', provider.restDeleteMany);
}
exports.default = default_1;
