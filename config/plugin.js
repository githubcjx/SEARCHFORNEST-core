'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  snowflake: {
    enable: true,
    package: 'egg-snowflake'
  },
  wechats: {
    enable: true,
    package: "egg-wechats"
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  }
};