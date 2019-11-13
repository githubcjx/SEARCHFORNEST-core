'use strict';

const Controller = require('egg').Controller;

class HouseController extends Controller {
  async list() {
    const { ctx, service } = this
    try {
      let payload = ctx.request.body || {}
      const res = await service.houseService.list(payload)
      ctx.helper.success({ ctx, res, code: 200 })
    } catch (err) {
      ctx.helper.error({ ctx, err, code: 5001, msg: err.message })
    }
  }
  async publish() {
    const { ctx, service } = this
    try {
      let payload = ctx.request.body || {}
      const res = await service.houseService.publish(payload)
      ctx.helper.success({ ctx, res, code: 200 })
    } catch (err) {
      ctx.helper.error({ ctx, err, code: 5001, msg: err.message })
    }
  }
  async get() {
    const { ctx, service } = this
    try {
      let payload = ctx.request.body || {}
      const res = await service.houseService.get(payload)
      ctx.helper.success({ ctx, res, code: 200 })
    } catch (err) {
      ctx.helper.error({ ctx, err, code: 5001, msg: err.message })
    }
  }
  async like() {
    const { ctx, service } = this
    try {
      let payload = ctx.request.body || {}
      const res = await service.houseService.like(payload)
      ctx.helper.success({ ctx, res, code: 200 })
    } catch (err) {
      ctx.helper.error({ ctx, err, code: 5001, msg: err.message })
    }
  }
  async collection() {
    const { ctx, service } = this
    try {
      let payload = ctx.request.body || {}
      const res = await service.houseService.collection(payload)
      ctx.helper.success({ ctx, res, code: 200 })
    } catch (err) {
      ctx.helper.error({ ctx, err, code: 5001, msg: err.message })
    }
  }
}

module.exports = HouseController;
