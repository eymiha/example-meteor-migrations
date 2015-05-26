Migrations.add({
    // version string keeps order but no conflicts with other branches
    // could even be in a file named 2015-04-20-add-sort-order-field.js
    // to reduce git conflicts
    name: "2015-04-20-split-name-field",

    description: "Split the fullname field into firstname and lastname",

    expand: function () {
      Customers.find().forEach(function (customer) {
        var first = customer.fullname.split(' ')[0];
        var last = customer.fullname.split(' ')[1];
        Customers.update(customer._id, {$set: {firstname: first, lastname: last}});
      });
    },
    contract: function () {
      Customers.update({}, {$unset: fullname}, {multi: true});
    }
});
