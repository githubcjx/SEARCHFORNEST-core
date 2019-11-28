'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/users', controller.userController.info);
  router.post('/user/login', controller.userController.login);
  router.post('/house/list', controller.houseController.list);
  router.post('/house/publish', controller.houseController.publish);
  router.post('/house/get', controller.houseController.get);
  router.post('/house/like', controller.houseController.like);
  router.post('/house/collection', controller.houseController.collection);
  router.post('/house/getRelease', controller.houseController.getRelease);
  router.post('/house/record', controller.houseController.record);
  router.post('/house/getRecord', controller.houseController.getRecord);

};
