(function(root){
  var PT = root.PT = (root.PT || {});

  var Photo = PT.Photo = function (attributes){
    this.attributes = _.extend({}, attributes);
  };

  Photo.all = [];

  Photo.addToAll = function (photos) {
    Photo.all = Photo.all.concat(photos);
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

      Photo.addToAll(photos);
      callback();
      }
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
    url: $form.attr('action'),
    method: 'POST',
    data: thisPhoto.attributes,
    dataType: 'json',
    success: function(data){
      _.extend(thisPhoto.attributes, data);
      Photo.addToAll(thisPhoto);
      callback(thisPhoto);
      }
    });
  };

  $(function(){
    $form = $('form.new-photo');

    $form.on('submit', function(event){
      event.preventDefault();
      formData = $(event.currentTarget).serializeJSON();

      var photo = new Photo(formData.photo);

      photo.create(function (justSavedPhoto) {

      });

    });

  });

})(this);

