
var execute  = require('../dataBase/index').execute;
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/type', function(req, res, next) {
  execute('select * from customer_type').then(data=>{
    res.send(data)
  });
});
router.post('/type', function(req, res, next) {

  execute('select * from customer_type').then(data=>{
    res.send(data)
  });
});
  

module.exports = router;
