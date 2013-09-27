// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.serializeJSON.min
//= require underscore
//= require_tree .

(function(root){
  var PT = root.PT = (root.PT || {});

  $(function(){
    $form = $('form.new-photo');

    $form.on('submit', function(event){
      event.preventDefault();
      formData = $(event.currentTarget).serializeJSON();

      var photo = new Photo(formData.photo);
      console.log(formData.photo);

      photo.create(function (justSavedPhoto) {
        console.log(justSavedPhoto);
      });

    });

  });

  var Photo = PT.Photo = function (attributes){
    this.attributes = _.extend({}, attributes);
  };

  Photo.prototype.get = function (attr_name) {
    return this.attributes[attr_name];
  };

  Photo.prototype.set = function (attr_name, val) {
    this.attributes[attr_name] = val;
  };

  Photo.prototype.create = function (callback) {
    var thisPhoto = this;
    $.ajax({
      url: $form.attr('action'),
      method: 'POST',
      data: thisPhoto.attributes,
      dataType: 'json',
      success: function(data){
        _.extend(thisPhoto.attributes, data);
        callback(thisPhoto);
      }
    });
  };

  Photo.fetchByUserId = function (userId, callback) {

  }



})(this);

