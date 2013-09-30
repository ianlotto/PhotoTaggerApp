(function(root){
  var PT = root.PT = (root.PT || {});

  var PhotoTagging = PT.PhotoTagging = function (attributes){
    PT.Model.call(this, attributes);

    this.createURL = "/api/photo_taggings";
  };

  PT.inherits.call(PT.PhotoTagging, PT.Model);

  _.extend(PhotoTagging, PT.Model); //get class methods & properties

  PhotoTagging.getIndexURL = function(id) {
    return '/api/photos/' + id + '/photo_taggings';
  };

  PhotoTagging.prototype.getTaggedUser = function () {
    var thisTagging = this;

    return _.find(USERS, function(user){
      return thisTagging.attributes["user_id"] === user.id;
    })
  }

})(this);