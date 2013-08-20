
/*
 * GET home page.
 */

exports.index = function(req, res){
  if (!req.session.user) {
		res.redirect('/login');
	} else {
		console.log(req.user.username + 'is this thing');
		res.render('index');
	}
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};