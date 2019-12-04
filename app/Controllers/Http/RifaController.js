"use strict";

const Rifa = use("App/Models/Rifa");
const Premio = use("App/Models/Premio");
const Bilhete = use("App/Models/Bilhete");
// const Observacao = use('App/Models/Observacao');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rifas
 */
class RifaController {
  /**
   * Show a list of all rifas.
   * GET rifas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const rifas = (
      await Rifa.query()
        .orderBy("updated_at", "desc")
        .fetch()
    ).rows;
    return view.render("rifas.index", { rifas });
  }

  /**
   * Render a form to be used for creating a new rifa.
   * GET rifas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
    const rifa = new Rifa();
    return view.render("rifas.create", { rifa });
  }

  /**
   * Create/save a new rifa.
   * POST rifas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const rifaData = request.only([
      "titulo",
      "descricao",
      "data_inicio_venda",
      "data_fim_venda",
      "data_sorteio",
      "valor_bilhete"
    ]);
    rifaData.user_id = auth.user.id;
    const rifa = await Rifa.create(rifaData);

    //BILHETE

    for (let i = 1; i <= 10; i++) {
      await Bilhete.create({ rifa_id: rifa.id, numero: i });
    }
    response.route("rifas.show", { id: rifa.id });
  }

  /**
   * Display a single rifa.
   * GET rifas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view,auth }) {
    const rifa = await Rifa.find(params.id);
    await rifa.load("bilhetes");
    const bilhetes = rifa.getRelated("bilhetes").rows;
    const hoje = Date.now();
    rifa.user_id = auth.user.id;
    const usuario = rifa.user_id;
    
    return view.render("rifas.show", { rifa, bilhetes, hoje});
  }

  /**
   * Render a form to update an existing rifa.
   * GET rifas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view, rifa }) {
    
    return view.render('rifas.edit', { rifa });
  }

  /**
   * Update rifa details.
   * PUT or PATCH rifas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, rifa }) {
    const rifaData = request.only(["titulo",
    "descricao",
    "data_inicio_venda",
    "data_fim_venda",
    "data_sorteio",
    "valor_bilhete"]);
    rifa.merge(rifaData);
    await rifa.save();
    response.route('rifas.show', { id: params.id });
  }

  /**
   * Delete a rifa with id.
   * DELETE rifas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
 
  async premio({ request, response, premio }) {
  
    const premioData = request.only(['descricao',"colocacao"]);
    premioData.rifa_id = premio.id;
    premioData.descricao = premio.descricao;
    premioData.colocacao = premio.colocacao;
    await Premio.create(premioData);
    response.route('rifas.show', { id: rifa.id });
  
}
}

module.exports = RifaController;
