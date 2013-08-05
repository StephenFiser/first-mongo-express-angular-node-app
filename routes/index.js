
/*
 * GET home page.
 */

exports.index = function(req, res){
  if (!req.session.user) {
		res.redirect('/login');
	} else {
		res.render('index');
	}
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};