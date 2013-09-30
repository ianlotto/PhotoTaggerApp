(function(root){
  var PT = root.PT = (root.PT || {});

  var Photo = PT.Photo = function (attributes){
    PT.Model.call(this, attributes);

    this.createURL = "/api/photos";
  };

  PT.inherits.call(PT.Photo, PT.Model);

  _.extend(Photo, PT.Model); //get class methods & properties

  Photo._events = {};

  Photo.getIndexURL = function(id) {
    return '/api/users/' + id + '/photos'
  };

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

  Photo.find = function (id) {
    var thisId = id;
    return _.find(Photo.all, function(photo) {
      return photo.get("id") === thisId;
    });
  }
})(this);