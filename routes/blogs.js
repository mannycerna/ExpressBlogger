var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
//   res.send('blogs page');
  res.json({success: true, route: "blogs"})
  
});

module.exports = router;