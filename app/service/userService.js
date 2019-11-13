
const Service = require('egg').Service;

class UserService extends Service {
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('users', { id: 1 });
    return { user };
  }
  async login(params) {
    const { app, ctx } = this
    const result = {}
    const wechat = await app.wechats.getMiniProgramSessionKey(params.code)
    const userInfo = params.userInfo

    if (wechat.openid !== undefined) {
      const user = await app.mysql.get('user', { openid: wechat.openid });

      if (user !== null) { // 存在用户
        const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${app.config.wechats.appid}&secret=${app.config.wechats.secret}`
        const res = await ctx.curl(url, { method: 'GET', dataType: 'json' })
        result.token = res.data.access_token
        result.name = user.name
        result.gender = user.gender
        result.country = user.country
        result.province = user.province
        result.city = user.city
        result.avatarurl = user.avatarurl
        result.openid = wechat.openid
        return result
      } else {
        return await app.mysql.insert('user', {
          openid: wechat.openid,
          nickname: userInfo.nickName,
          avatarurl: userInfo.avatarUrl,
          gender: userInfo.gender,
          country: userInfo.country,
          province: userInfo.province,
          city: userInfo.city,
          language: userInfo.language,
          ctime: params.ctime
        })
      }

    } else {
      return params
    }

  }
}

module.exports = UserService;