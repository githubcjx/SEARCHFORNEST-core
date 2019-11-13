'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async info() {
    const ctx = this.ctx;
    const userId = ctx.params.id;
    const res = await ctx.service.userService.find(userId);
    ctx.helper.success({ ctx, res, code: 200 })
  }
  async login() {
    const { ctx, service } = this
    const loginTransfer = {
      code: { type: 'string', required: true, allowEmpty: false }
    }
    try {
      ctx.validate(loginTransfer)
      let payload = ctx.request.body || {}
      payload.timestamp = ctx.helper.getTime()
      const res = await service.userService.login(payload)
      if (res.token !== undefined) {
        ctx.helper.success({ ctx, res, code: 200 })
      } else {
        ctx.helper.success({ ctx, res, code: 20001 })
      }
    } catch (err) {
      ctx.helper.error({ ctx, err, code: 5001, msg: err.message })
    }
  }
}

module.exports = UserController;