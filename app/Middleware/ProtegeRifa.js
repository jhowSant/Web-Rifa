'use strict';

class ProtegeRifa {
 async handle(ctx, next) {
 const { params, auth } = ctx;
 const rifa = await auth.user.rifas().where('id', params.id).first();
 ctx.rifa = rifa;
 await next();
 }
}
module.exports = ProtegeRifa;