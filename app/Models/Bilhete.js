'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bilhete extends Model {

    rifa() {
        return this.belongsTo("App/Models/Rifa");
      }



user() {
  return this.belongsTo("App/Models/User");
}

}
module.exports = Bilhete
