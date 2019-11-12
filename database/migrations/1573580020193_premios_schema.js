'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PremiosSchema extends Schema {
  up () {
    this.create('premios', (table) => {
      table.increments()
      table.integer('rifa_id').unsigned().references('id').inTable('rifa').notNullable();
      table.string('descricao',45).notNullable();
      table.integer('colocacao').notNullable();
      table.integer('bilhete_sorteado_id').unsigned().references('id').inTable('bilhetes');
      table.timestamps()
    })
  }

  down () {
    this.drop('premios')
  }
}

module.exports = PremiosSchema
