export interface Pagination {
    page: number
    pageSize: number
    total?: number
    totalPages?: number
}

export interface ListParams {
    query
    populate
    projection
    pagination: Pagination
    sort
}

export interface FindParams {
    query
    populate
    projection
}

export interface UpdateManyParams {
    query
    data
    options
}
