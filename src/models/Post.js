var keystone = require("keystone");
var storage = require("../lib/file-storage");

var Types = keystone.Field.Types;

var Post = new keystone.List("Post", {
  map: { name: "title" },
  autokey: { path: "slug", from: "title", unique: true }
});

Post.add({
  title: {
    label: "Title",
    type: Types.Text,
    required: true
  },
  state: {
    type: Types.Select,
    options: "draft, published, archived",
    default: "draft",
    index: true
  },
  author: { type: Types.Relationship, ref: "User", index: true },
  publishedDate: {
    type: Types.Date,
    index: true,
    dependsOn: { state: "published" }
  },
  image: { type: Types.File, storage: storage },
  content: {
    description: { type: Types.Markdown, wysiwyg: true, height: 100 },
    body: { type: Types.Markdown, wysiwyg: true, height: 800 }
  }
});

Post.defaultColumns = "title, state|20%, author|20%, publishedDate|20%";
Post.register();
