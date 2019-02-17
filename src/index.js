var path = require("path");
var keystone = require("keystone");
var routes = require("./routes");
// var lodash = require("lodash");

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
  name: process.env.NAME,
  brand: process.env.BRAND,
  mongo: process.env.MONGODB_URI,
  "module root": path.resolve(__dirname),
  less: "../public",
  static: "../public",
  favicon: "../public/favicon.ico",
  views: "templates/views",
  updates: "../updates",
  "view engine": "pug",
  emails: "templates/emails",
  "auto update": true,
  session: true,
  auth: true,
  "user model": "User"
});

// Load your project's Models
keystone.import("models");

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set("locals", {
  // _: lodash,
  env: keystone.get("env"),
  utils: keystone.utils,
  editable: keystone.content.editable
});

// Load your project's Routes
keystone.set("routes", routes);

// Configure the navigation bar in Keystone's Admin UI
keystone.set("nav", {
  content: ["pages", "posts", "navigations"],
  enquiries: "enquiries",
  configuration: ["users"]
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();
