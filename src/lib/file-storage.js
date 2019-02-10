var keystone = require("keystone");

var storage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: "uploads",
    publicPath: "/public/uploads/"
  }
});

module.exports = storage;
