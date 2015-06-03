Migrations.add({
    // version string keeps order but no conflicts with other branches
    // could even be in a file named 2015-04-20-add-sort-order-field.js
    // to reduce git conflicts
    name: "2015-04-20-split-name-field",

    description: "Split the fullname field into firstname and lastname",

    required: function() {
      return Players.find().count() > 0;
    },

    expand: function () {
      console.log("split the player's names.")
      console.log("  # of players: "+Players.find().count())
      Players.find().forEach(function (player) {
        var split = player.name.split(' ')
        var first = split[0]
        var last = split[1]
        console.log(player.name, split)
        Players.update(
          player._id,
          {$set: {firstname: first, lastname: last}});
      });
    },
    contract: function () {
      // Customers.update({}, {$unset: fullname}, {multi: true});
    }
});
