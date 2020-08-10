"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateMiddlewareOptions = (options) => {
    options = options || {};
    options.all = options.all || [];
    options.list = options.list || [];
    options.find = options.find || [];
    options.create = options.create || [];
    options.update = options.update || [];
    options.delete = options.delete || [];
    Object.keys(options).forEach((key) => {
        if (!Array.isArray(options[key])) {
            options[key] = [options[key]];
        }
    });
    return options;
};
function default_1(router, provider, middleware) {
    const m = validateMiddlewareOptions(middleware);
    // Find
    router.get('/find', ...m.all, ...m.find, provider.restFind('query'));
    router.post('/find', ...m.all, ...m.find, provider.restFind('body'));
    // Find one
    router.get('/find-one', ...m.all, ...m.find, provider.restFindOne('query'));
    router.post('/find-one', ...m.all, ...m.find, provider.restFindOne('body'));
    // List
    router.get('/', ...m.all, ...m.list, provider.restList('query'));
    router.post('/list', ...m.all, ...m.list, provider.restList('body'));
    // Create
    router.post('/', ...m.all, ...m.create, provider.restCreateOne);
    router.post('/multiple', ...m.all, ...m.create, provider.restCreateMany);
    // Update
    router.put('/:id', ...m.all, ...m.update, provider.restUpdateOne);
    router.put('/', ...m.all, ...m.update, provider.restUpdateMany);
    // Delete
    router.delete('/:id', ...m.all, ...m.delete, provider.restDeleteOne);
    router.delete('/', ...m.all, ...m.delete, provider.restDeleteMany);
}
exports.default = default_1;
