"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsuariosSchema extends Schema {
  up() {
    this.create("usuarios", table => {
      table.increments();
      // table.integer('user_id').unsigned().references('id').inTable('users');  chave vermelhinha
      table
        .string("nome", 80)
        .notNullable()
        .unique();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("senha", 60).notNullable();
      table.boolean("admin").defaultTo(false).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("usuarios");
  }
}

module.exports = UsuariosSchema;
