"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Rifa extends Model {
  // static get table() {
  //   return "Rifa";
  // }

  user() {
    return this.belongsTo("App/Models/User");
  }

  tipo() {
    return this.belongsTo("App/Models/Tipo");
  }

  premio() {
    return this.hasMany('App/Models/Premio');
    }

  bilhetes() {
    return this.hasMany("App/Models/Bilhete");
  }
}

module.exports = Rifa;
