var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    domainName: process.env.domainName,
    apiUrl: process.env.apiUrl,
    title: 'Kartrocket Assignment'
  });
});

module.exports = router;
