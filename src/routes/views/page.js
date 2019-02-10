var keystone = require("keystone");

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Default to home
  var slug = req.params.slug || "home";
  locals.section = slug;
  locals.data = {};

  // Load the current page
  view.on("init", function(next) {
    keystone
      .list("Page")
      .model.findOne({
        slug: slug
      })
      .exec(function(err, result) {
        locals.data.page = result;
        next(err);
      });
  });

  // Render the view
  view.render("page");
};
