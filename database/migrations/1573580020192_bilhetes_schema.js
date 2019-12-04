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
        .inTable("rifas")
        .notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.integer("numero").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("bilhetes");
  }
}

module.exports = BilhetesSchema;
