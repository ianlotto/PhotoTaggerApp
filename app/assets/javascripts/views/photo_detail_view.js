(function(root){
  var PT = root.PT = (root.PT || {});

  var PhotoDetailView = PT.PhotoDetailView = function(photo) {
    this.photo = photo;
    this.$el = $("<div></div>");

    this.$el.on("click", "button#back-button", PT.showPhotoIndex);
    this.$el.on("click", "img", this.popTagSelectView.bind(this));
  }

  PhotoDetailView.prototype.render = function(photo) {
    var thisPhoto = this;
    var $el = thisPhoto.$el;

    $el.html(JST["photo_detail"]({
      photo : photo
    }));

    $el.prepend("<button id=\"back-button\">Back to Your Photos</button>");

    PT.PhotoTagging.all.forEach(function(photoTagging){
      var ptbView = new PT.PhotoTagBoxView(photoTagging);
      $el.append(ptbView.render().$el);
    });

    return this;
  }

  PhotoDetailView.prototype.popTagSelectView = function (event) {

    var tagSelect = new PT.TagSelectView(this.photo, event);

    this.$el.append(tagSelect.render().$el);
  }

})(this);