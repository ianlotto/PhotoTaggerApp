(function(root){
  var PT = root.PT = (root.PT || {});

  var PhotoTagBoxView = PT.PhotoTagBoxView = function(photoTagging) {
    this.photoTagging = photoTagging;
    this.$el = $("<div class=\"photo-tag-box\"></div>");
  }

  PhotoTagBoxView.prototype.render = function(photo) {
    $el = this.$el;

    $el.css({
      position: "absolute",
      left: this.photoTagging.get("x_pos"),
      top: this.photoTagging.get("y_pos")
    });

    $el.html(JST["photo_tag_box"]({
      tagged_user : this.photoTagging.getTaggedUser()
    }));

    return this;
  }

})(this);