var express = require('express');
var router = express.Router();

var cijfercode_controller = require('../controllers/cijfercodeController');


/// CODE ROUTES ///
router.get('/', cijfercode_controller.index);

//POST request for creating code.
router.get('/code/create', cijfercode_controller.code_create_post);

router.get('/code/jan', cijfercode_controller.code_list);


module.exports = router; 