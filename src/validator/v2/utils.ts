export function hasError(data) {
    return Array.isArray(data) ? data.length : !!data
}
