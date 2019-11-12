"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class BilhetesSchema extends Schema {
  up() {
    this.create("bilhetes", table => {
      table.increments();
      table
        .integer("rifa_id")
        .unsigned()
        .references("id")
        .inTable("rifa")
        .notNullable();
      table
        .integer("usuario_id")
        .unsigned()
        .references("id")
        .inTable("usuarios");
      table.integer("numero").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("bilhetes");
  }
}

module.exports = BilhetesSchema;