(function(root){
  var PT = root.PT = (root.PT || {});

  var PhotoDetailView = PT.PhotoDetailView = function(photo) {
    this.photo = photo;
    this.$el = $("<div></div>");

    this.$el.on("click", "button#back-button", PT.showPhotoIndex);
  }

  PhotoDetailView.prototype.render = function(photo) {
    $el = this.$el;
    $el.html(JST["photo_detail"]({
      photo : photo
    }));

    $el.prepend("<button id=\"back-button\">Back to Your Photos</button>");

    return this;
  }

})(this);