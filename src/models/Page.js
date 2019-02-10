var keystone = require("keystone");
var storage = require("../lib/file-storage");
var Types = keystone.Field.Types;

var Page = new keystone.List("Page", {
  map: { name: "title" },
  autokey: { path: "slug", from: "title", unique: true }
});

Page.add({
  title: {
    label: "Title",
    type: Types.Text,
    required: true
  },
  author: { type: Types.Relationship, ref: "User", index: true },
  image: { type: Types.File, storage: storage },
  content: {
    description: { type: Types.Markdown, wysiwyg: true, height: 100 },
    body: { type: Types.Markdown, wysiwyg: true, height: 800 }
  }
});

Page.defaultColumns = "title, author";
Page.register();
