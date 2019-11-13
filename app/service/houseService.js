'use strict'

const Service = require('egg').Service

class houseService extends Service {
  async list(params) {
    const { app } = this
    const list = await app.mysql.select('house_info')
    return list
  }
  async publish(params) {
    const { app } = this
    const result = await app.mysql.insert('house_info', {
      area_name: params.area_name,
      area: params.area,
      type: params.type,
      direction: params.direction,
      floor: params.floor,
      parking: params.parking,
      elevator: params.elevator,
      rent: params.rent,
      rent_type: params.rent_type,
      landlord: params.landlord,
      phone: params.phone,
      look_time: params.look_time,
      people: params.people,
      settle_time: params.settle_time,
      openid: params.openid,
      decorate: params.decorate,
      config: params.config,
      bright: params.bright,
      require: params.require,
      introduce: params.introduce,
      house_type: params.house_type
    })
    return true
  }
  async get(params) {
    const { app } = this
    const list = await app.mysql.get('house_info', {
      house_id: params.house_id
    })
    const user = await app.mysql.get('user', {
      openid: list.openid
    })
    const like = await app.mysql.get('user_collection', {
      house_id: params.house_id,
      openid: list.openid
    })
    if (like) {
      list.like = like.islike
    }
    list.gender = user.gender
    return list
  }
  async like(params) {
    const { app } = this
    const like = await app.mysql.get('user_collection', {
      house_id: params.house_id,
      openid: params.openid
    })
    if (like) {
      return await app.mysql.update('user_collection', {
        islike: Math.abs(like.islike - 1)
      }, {
        where: {
          openid: params.openid,
          house_id: params.house_id
        }
      })
    } else {
      return await app.mysql.insert('user_collection', {
        house_id: params.house_id,
        openid: params.openid,
        islike: 1
      })
    }
  }
  async collection(params) {
    const { app } = this
    let result = []
    const collection = await app.mysql.select('user_collection', {
      where: {
        openid: params.openid,
        islike: 1
      },
      columns: ['house_id']
    })
    for (let i of collection) {
      const item = await app.mysql.get('house_info', {
        house_id: i.house_id
      })
      item.like = 1
      result.push(item)
    }
    return result
  }
}

module.exports = houseService;