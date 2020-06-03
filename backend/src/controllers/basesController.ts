import { Request, Response, response } from 'express'

import knex from '../database/connection'

class BasesController {
    async index (req:Request,res:Response){
        const {city,uf,types} = req.query
        const parsedtypes = String(types)
                                .split(",")
                                .map(item=>Number(item.trim()))

        const bases = await knex('bases')
                                .join('base_types','bases.id','=','base_types.base_id')
                                .whereIn('base_types.type_id',parsedtypes)
                                .where('city',String(city))
                                .where('uf',String(uf))
                                .distinct()
                                .select('bases.*')

        return res.json(bases)
    }
    async show (req:Request,res:Response){
        const { id } = req.params
 
        const base = await knex('bases').where('id',id).first()
        
        if (!base){
            return res.status(404).json({message:'Base not found'})
        }

        const types = await knex('types')
            .join('base_types','types.id','=','base_types.id')
            .where('base_types.base_id',id)
            .select('types.title')
        return res.json({base,types})
    }

    async create (req:Request,res:Response){
        const {
            name,
            image,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            types
        } = req.body;

        let bases = {
            name,
            image: 'img-fake',
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        bases.city = String(bases.city).toLowerCase()
        bases.uf = String(bases.uf).toUpperCase()
        
        const trx = await knex.transaction()

        const basesId = await trx('bases').insert(bases)

        const baseTypes = types.map((type_id: number)=>{
            return {
                type_id,
                base_id: basesId[0]
            }
        })

        await trx('base_types').insert(baseTypes)

        await trx.commit()
        
        return res.json({
            id:basesId[0],
            ...bases
        })
    }
}


export default new BasesController()