import express, { Express } from 'express'
import http, { Server } from 'http'
import logger from '../utils/logger'
import initRouter from './router'
import importAll from '../utils/import-all'
import files from '../cli/files'
import CustomError from '../error/custom-error'
import morgan from 'morgan'
import cors from 'cors'

class FPress {
    app: Express
    server: Server
    #services: any[] = []

    create(server, app) {
        this.app = app || express()
        this.server = server || http.createServer(this.app)
        return this
    }

    registerService(service) {
        this.#services.push(service)
        return this
    }

    registerAllService(path) {
        path = path || files.getCurrentDir() + '/services'
        const modules = importAll(path)
        modules.forEach(({ module }) => this.registerService(module))
        return this
    }

    async start() {
        // Service
        await Promise.all(
            this.#services.map((s) => s.apply(null, this.server, this.app))
        )
        logger.info('Services start complete!')

        // Router
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        if (process.env.STATIC_PATH) {
            this.app.use(express.static(process.env.STATIC_PATH))
        }
        // ROUTER
        initRouter(this.app)

        // Handle Error
        this.app.use((error, req, res, next) => {
            if (error) {
                logger.custom.error('[ROUTER ERORR]', error)
                const code = error.code || 500
                if (error instanceof CustomError) {
                    return res.status(code).json({
                        status: 'error',
                        code,
                        message: error.message,
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

        // Start server
        const port = process.env.PORT || Math.floor(Math.random() * 65536)
        this.server.listen(port, () => {
            logger.info('Server listen on port', port)
        })
    }
}

export default new FPress()
