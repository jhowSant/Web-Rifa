"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UsersSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      // table.integer('user_id').unsigned().references('id').inTable('users');  chave vermelhinha
      table
        .string("username", 80)
        .notNullable()
        .unique();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.boolean("admin").defaultTo(false).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UsersSchema;
