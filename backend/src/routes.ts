import express from 'express'

import BasesController from './controllers/basesController'
import TypesController from './controllers/typesController'

const routes = express.Router()

routes.post('/bases',BasesController.create)
routes.get('/bases',BasesController.index)
routes.get('/bases/:id',BasesController.show)

routes.get('/types',TypesController.index)


export default routes