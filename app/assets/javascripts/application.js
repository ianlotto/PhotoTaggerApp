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
//= require_tree ./models
//= require_tree ./views
//= require_tree ../templates

PT.initialize = function (){
  PT.Photo.fetchByUserId(CURRENT_USER_ID, function(){
    PT.showPhotoIndex();
  });
}

PT.showPhotoIndex = function () {
  var view = new PT.PhotoListView();
  var form = new PT.PhotoFormView();

	$('div#content')
      .empty()
      .append(view.render().$el)
      .append(form.render().$el);
}

PT.showPhotoDetail = function (photo) {
  var thisPhoto = photo;

  PT.PhotoTagging.fetchByPhotoId(thisPhoto.get("id"), function(){
    var detail = new PT.PhotoDetailView(thisPhoto);

    $('div#content').html(detail.render(thisPhoto).$el);
  });
}