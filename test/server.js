const express = require('express')
const app = express()
app.use(express.json())

const { CustomError, CreateValidator } = require('../dist')
const validation = CreateValidator((source) => {
    return {
        name: { type: 'string' },
        items: {
            type: 'array',
            defaultField: {
                type: 'object',
                fields: {
                    name: {
                        type: 'string',
                    },
                },
            },
        },
        info: {
            type: 'object',
            fields: {
                gender: {
                    type: 'number',
                    required: true,
                },
            },
        },
    }
})

app.post('/test', validation, (req, res) => {
    res.json('oke')
})

app.use((error, req, res, next) => {
    if (error) {
        // error code
        let code = error.code || 500
        if (code < 100 || code > 599) {
            code = 500
        }
        //
        if (error instanceof CustomError) {
            return res.status(code).json({
                status: 'error',
                code,
                message: error.message,
                errors: error.data,
                type: error.type,
            })
        } else {
            return res.status(code).json({
                status: 'error',
                code,
                message: error.message,
                ...error,
            })
        }
    }
    next()
})

const port = 3456
app.listen(port, () => {
    console.log(`test running on port ${3456}`)
})
