import Knex = require("knex")

export async function seed(knex:Knex){
    await knex('types').insert([
        { title: 'Lamps', image: 'lampadas.svg' },
        { title: 'Bateries', image: 'baterias.svg' },
        { title: 'Cardboards', image: 'papeis-papelao.svg' },
        { title: 'Electronics', image: 'eletronicos.svg' },
        { title: 'Organicies', image: 'organicos.svg' },
        { title: 'Oil', image: 'oleo.svg' },
    ])
}