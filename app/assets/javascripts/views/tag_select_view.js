(function(root){
  var PT = root.PT = (root.PT || {});

  var TagSelectView = PT.TagSelectView = function(photo, clickEvent) {
    this.photo = photo;
    this.clickEvent = clickEvent;
    this.$el = $("<div></div>");
  }

  TagSelectView.prototype.render = function () {
    var $el = this.$el;
    var click = this.clickEvent;
    var imgPos = $(click.currentTarget).position();

    $div = $('<div class="photo-tag"></div>');

    var top = imgPos.top + click.offsetY - 50,
        left = imgPos.left + click.offsetX - 50;

    $el.css({
      position: "absolute",
      top: top,
      left: left
    });

    $el.append($div);

    $el.append(JST["photo_tag_options"]({
      users: USERS
    }));

    return this;
  }

})(this);