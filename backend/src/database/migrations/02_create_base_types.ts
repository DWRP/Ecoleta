import Knex = require("knex");

export async function up(knex:Knex){
    return knex.schema.createTable('base_types',table=>{
        table.increments('id').primary()
        table.integer('base_id')
            .references('id')
            .inTable('bases')
            .notNullable()
        table.integer('type_id')
            .references('id')
            .inTable('types')
            .notNullable()
        
    })
}
export async function down(knex:Knex){
    return knex.schema.dropTable('base_types')
}