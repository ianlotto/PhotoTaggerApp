(function(root){
  var PT = root.PT = (root.PT || {});

  var Photo = PT.Photo = function (attributes){
    this.attributes = _.extend({}, attributes);
  };

  Photo.all = [];
  Photo._events = {};

  Photo.on = function (eventName, callback) {
	if(Photo._events[eventName]) {
		Photo._events[eventName].push(callback);
	} else {
		Photo._events[eventName] = [callback];
	}
  }

  Photo.trigger = function (eventName) {
	Photo._events[eventName].forEach(function(callback){
		callback();
	});
  }

  Photo.fetchByUserId = function (userId, callback) {
    var photo = this;

    $.ajax({
    url: '/api/users/' + userId + '/photos',
    method: 'GET',
    dataType: 'json',
    success: function(data){
      var photos = _.map(data, function(p) {
        return new Photo(p);
      });

      Photo.all = photos;
      callback(); //renders content onto page.
      }
    });
  }

  Photo.find = function (id) {
    var thisId = id;
    return _.find(Photo.all, function(photo) {
      return photo.get("id") === thisId;
    });
  }

  Photo.prototype.get = function (attr_name) {
    return this.attributes[attr_name];
  };

  Photo.prototype.set = function (attr_name, val) {
    this.attributes[attr_name] = val;
  };

  Photo.prototype.create = function (callback) {
    var thisPhoto = this;

    if (thisPhoto.get("id")) return false;

    $.ajax({
    url: $("form.new-photo").attr('action'),
    method: 'POST',
    data: thisPhoto.attributes,
    dataType: 'json',
    success: function(data){
      _.extend(thisPhoto.attributes, data);
      Photo.all.unshift(thisPhoto);
	  Photo.trigger("add");

      callback(thisPhoto);
      }
    });
  };

})(this);

