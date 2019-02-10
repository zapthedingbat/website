var keystone = require("keystone");

var Types = keystone.Field.Types;

var Navigation = new keystone.List("Navigation", {
  sortable: true
});

Navigation.add({
  label: {
    type: Types.Text,
    required: true,
    initial: true
  },
  url: {
    type: Types.Text,
    required: true,
    initial: true
  }
});
Navigation.defaultColumns = "label, url";
Navigation.register();
