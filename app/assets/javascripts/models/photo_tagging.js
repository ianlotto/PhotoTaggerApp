(function(root){
  var PT = root.PT = (root.PT || {});

  var PhotoTagging = PT.PhotoTagging = function (attributes){
    this.attributes = _.extend({}, attributes);
  };

  PhotoTagging.all = [];

  PhotoTagging.fetchByPhotoId = function (photoId, callback) {
    var thisTagging = this;

    $.ajax({
      url: '/api/photos/' + photoId + '/photo_taggings',
      method: 'GET',
      dataType: 'json',
      success: function(data){
        var taggings = _.map(data, function(t) {
          return new PhotoTagging(t);
        });

        PhotoTagging.all = taggings;
        callback(); //renders photo_detail onto page.
      }
    });
  }

  PhotoTagging.prototype.get = function (attr_name) {
    return this.attributes[attr_name];
  };

  PhotoTagging.prototype.set = function (attr_name, val) {
    this.attributes[attr_name] = val;
  };

  PhotoTagging.prototype.getTaggedUser = function () {
    var thisTagging = this;

    return _.find(USERS, function(user){
      return thisTagging.attributes["user_id"] === user.id;
    })
  }

  PhotoTagging.prototype.create = function (callback) {
    var thisTagging = this;

    if (thisTagging.get("id")) return false;

    $.ajax({
      url: "/api/photo_taggings",
      method: 'POST',
      data: thisTagging.attributes,
      dataType: 'json',
      success: function(data){
        _.extend(thisTagging.attributes, data);
        PhotoTagging.all.unshift(thisTagging);

        callback();
      }
    });
  };

})(this);

