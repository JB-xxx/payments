var Code = require('../models/cijfercode');
// var async = require('async');


const validator = require('express-validator');

exports.index = function(req, res) {   
    res.send( { title: 'Budget', tekst: 'jij bent heel geweldig boy!'} );
};

// Display list of all Genre. JAN BAARS
exports.code_list = function(req, res, next) { 
  Code.find()
  .sort([['name', 'ascending']]) 
  .exec(function (err, list_genres) {
      if (err) { return next(err); }
      // Successful, so render.
      res.send({ title: 'Genre List', genre_list: list_genres });
  })
}; 


// Handle Genre create on POST.
exports.code_create_post = function(req, res) {   
    res.send( { title: 'Code', tekst: 'De code invullen'} );
};




