'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tipo extends Model {


    rifas() {
        return this.hasMany('App/Models/Rifa');
      }
}

module.exports = Tipo
