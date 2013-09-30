(function(root){
  var PT = root.PT = (root.PT || {});

  var TagSelectView = PT.TagSelectView = function(photo, clickEvent) {
    this.photo = photo;
    this.clickEvent = clickEvent;
    this.$el = $("<div></div>");
  }

  TagSelectView.prototype.render = function () {
    var click = this.clickEvent;
    var imgPos = $(click.currentTarget).position();

    $div = $('<div class="photo-tag"></div>');

    var top = imgPos.top + click.offsetY - 50,
        left = imgPos.left + click.offsetX - 50;

    $div.css({
      position: "absolute",
      top: top,
      left: left
    });

    this.$el.append($div);

    return this;
  }

})(this);