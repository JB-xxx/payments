console.log('This script populates some test collections to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/


var async = require('async')
var Cijfercode = require('./models/cijfercode')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cijferitems = []
var books = []


/*
function genreCreate(code, name, datum, cb) {
    var genre = new Genre({  code: code, name: name, datum: datum });
         
    genre.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log('New Genre: ' + genre);
      genres.push(genre)
      cb(null, genre);
    }   );
  }
*/

  function codeCreate(code, name, datum, cb) {
    items = { 
      code: code, 
      name: name, 
      datum: datum
    }
      
    var cijfercode = new Cijfercode(items);    
    cijfercode.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Cijfercode: ' + cijfercode);
      cijferitems.push(cijfercode)
      cb(null, cijfercode)
    }  );
  }

  function createBooks(cb) {
    async.parallel([
        function(callback) {
          codeCreate(28260, 'Jody', '1998-08-28', callback);
        },
        function(callback) {
            codeCreate(04260, 'Thijs', '1996-04-24', callback);
        },
        function(callback) {
            codeCreate(05262, 'Gera', '1964-10-05', callback);
        },
        function(callback) {
            codeCreate(26052, 'Jan', '1954-06-26', callback);
        },
        function(callback) {
            codeCreate(12042, 'Bob', '2018-12-12', callback);
        },
    ],
    // optional callback
    cb);
}

async.series([
    createBooks
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Klaar');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
