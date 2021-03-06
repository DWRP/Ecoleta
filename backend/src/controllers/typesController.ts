import { Request, Response } from 'express'

import knex from '../database/connection'

class TypesController {
    async index(req:Request,res:Response){
        const url_base = req.hostname
        const types = await knex('types').select('*')
        const serializedTypes = types.map(item=>{
            return {
                id:item.id,
                title: item.title,
                img_url : `${req.protocol}://${url_base}${url_base=="localhost"?":3333":""}/uploads/${item.image}`
            }
        })
        return res.json(serializedTypes)
    }
}

export default new TypesController()