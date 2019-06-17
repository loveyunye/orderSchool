import express from 'express'
import UserController from '../controller/UserController'
import DinnerController from '../controller/DinnerController'
import CustomerController from '../controller/CustomerController'
import BasicController from '../controller/BasicController'
import OrderController from '../controller/OrderController'


const customerController = new CustomerController()
const userController = new UserController()
const dinnerController = new DinnerController()
const basicController = new BasicController()
const orderController = new OrderController()

const router = express.Router();
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 用户操作
router.get('/sys/user/getUser',userController.getUser)
router.get('/sys/user/updateUser',userController.updateUser)
router.get('/sys/user/createUser',userController.createUser)

router.post('/sys/user/createUser',userController.createUser)
router.get('/sys/user/userTypes',userController.userTypes)
router.get('/sys/user/getUserList',userController.getUserList)
router.get('/sys/user/deleteUser',userController.deleteUser)
router.get('/sys/user/getUserById',userController.getUserById)

// 菜单操作
router.get('/sys/dinner/getDinner', dinnerController.getDinner )
router.get('/sys/dinner/createDinner', dinnerController.createDinner )
router.get('/sys/dinner/updateDinner', dinnerController.updateDinner )
router.get('/sys/dinner/deleteDinner', dinnerController.deleteDinner )
router.get('/sys/dinner/dinnerType', dinnerController.getDinnerType )

// 订单操作 
// router.get('/mobile/order/orderCreate', orderController.createOrder )
router.post('/mobile/order/orderCreate', orderController.createOrder )
router.get('/mobile/order/getOrderMobile', orderController.getOrderMobile )
router.get('/sys/order/getOrderSystem', orderController.getOrderSystem )
router.get('/sys/order/setOrderStatus', orderController.setOrderStatus )
router.get('/sys/order/getOrderNumByStatus', orderController.getOrderNumByStatus )
router.get('/sys/order/businessRank', orderController.businessRank )


// 图片上传
router.post('/sys/upload/img', basicController.uploadImg )
router.post('/sys/template/order', basicController.sendAppTemplate )


// 移动端客户操作
router.get('/mobile/customer/getUser',customerController.getUser)
router.get('/mobile/customer/createUser',customerController.createCustomer)
// 移动端菜单操作 
router.get('/mobile/dinner/getDinner',dinnerController.getDinner)


module.exports = router;
