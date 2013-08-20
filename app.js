
/**
 * Module dependencies
 */

var express = require('express'),
	routes = require('./routes'),
	api = require('./routes/api'),
	http = require('http'),
	path = require('path'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

var app = module.exports = express();

var uristring = 
process.env.MONGOLAB_URI || 
process.env.MONGOHQ_URL || 
'mongodb://localhost/HelloMongoose';

mongoose.connect(uristring, function (err, res) {
  if (err) { 
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Tasks = new Schema({
	"title": String,
	"description": String,
	"difficulty": Number,
	"completed": Boolean
});	

var Project = new Schema({
	"title": String,
	"tasks": [ Tasks ]
});

var User = new Schema({ // update data model here
	"first_name": String,
	"last_name": String,
	"email": {type: String, unique: true},
	"username": {type: String, unique: true},
	"password": String,
	"projects": [ Project ]
});

var User = mongoose.model('User', User);
	User.prototype.validPassword = function(pass) {
	return (this.password === pass);
}

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({ secret: 'keyboardcat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    mongoose.model('User').findOne({ username: username }, function (err, user) {	
      if (err) { 
      	console.log('There was an error');
      	return done(err); 
      }
      if (!user) {
      	console.log('Username invalid');
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
      	console.log('Password incorrect');
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne(id, function (err, user) {
    done(err, user);
  });
});


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);

app.get('/login', function(req, res) {
	console.log(req.session.user);
	if (!req.session.user) {
		res.render('login');
	} else {
		res.redirect('/');
	}
});

app.post('/login', passport.authenticate('local', { 
	failureRedirect: '/login'
}), function(req, res) {
	req.session.user = req.body.username;
	res.redirect('/');
});
app.get('/signup', function(req, res) {
	if (!req.session.user) {
		res.render('signup');	
	} else {
		res.redirect('/');
	}
});

app.get('/logout', function(req, res) {
	req.session.user = undefined;
	res.redirect('/login');
});

app.post('/signup', function(req,res) {
	if (req.body.username && req.body.password) {
		var user = new User({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		});
		user.save(function(err) {
			if (!err) {
				console.log(user.username);
				req.session.user = req.body.username;
				res.redirect('/');
			} else {
				console.log(err);
				res.redirect('/signup');
			}
		});
	} else {
		res.redirect('/signup');
	}
});

app.get('/person', function(req,res) {
	if (!req.session.user) {
		res.redirect('/login');
	} else {
		res.send(req.user);
	}
});

app.put('/person', function(req,res) {
	if (!req.session.user) {
		res.redirect('/login');
	} else {
		console.log('Updating user');
		console.log(req.body.projects);
		mongoose.model('User').findOne({username: new RegExp('^'+req.session.user+'$', "i")}, function(err, user) {
			console.log(user);
			user.projects = req.body.projects;
			console.log(user.first_name + ' is here');
			user.save(function(err) {
				if (!err) {
					console.log('User updated');
				} else {
					console.log(err);
				}
 			});
		});
	}
});


/*app.get('/:user', function(req, res) {
	if (!req.session.user) {
		res.redirect('/login');
	} else if (req.params.user != req.session.user) {
		res.redirect('/' + req.session.user);
	} else {
		res.render('index');
	}
});*/



app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res) {
	if (!req.session.user) {
		res.render('login');
	} else {
		res.redirect('/');
	}
});


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
