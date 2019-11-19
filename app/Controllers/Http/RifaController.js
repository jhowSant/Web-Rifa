"use strict";

const Rifa = use("App/Models/Rifa");
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
    return view.render("rifas.index", {});
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
    const rifaData = request.only(["titulo", "descricao","data_provavel_sorteio","data_inicio_venda","data_fim_venda","data_sorteio","valor_bilhete"]);
    rifaData.user_id = auth.user.id;
    const rifa = await Rifa.create(rifaData);
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
  async show({ params, request, response, view, rifa }) {
    return view.render("rifas.show", { rifa });
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
  async edit({ params, request, response, view }) {}

  /**
   * Update rifa details.
   * PUT or PATCH rifas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a rifa with id.
   * DELETE rifas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = RifaController;
