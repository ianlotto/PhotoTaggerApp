(function(root){
  var PT = root.PT = (root.PT || {});

  var TagSelectView = PT.TagSelectView = function(photo, clickEvent) {
    this.photo = photo;
    this.clickEvent = clickEvent;
    this.$el = $("<div></div>");

    this.$el.on("click", ".tag-options li",
                this.selectTagOptions.bind(this));
  }

  TagSelectView.prototype.getClickPos = function () {
    var click = this.clickEvent;

    var imgPos = $(click.currentTarget).position();
    var top = imgPos.top + click.offsetY - 50,
        left = imgPos.left + click.offsetX - 50;

    return {
      top: top,
      left: left
    }
  }

  TagSelectView.prototype.render = function () {
    var $el = this.$el;

    $div = $('<div class="photo-tag"></div>');

    $el.css(_.extend({ position: "absolute" }, this.getClickPos()));

    $el.append($div);

    $el.append(JST["photo_tag_options"]({
      users: USERS
    }));

    return this;
  }

  TagSelectView.prototype.selectTagOptions = function (event) {
    var thisTagging = this;
    var pos = thisTagging.getClickPos();

    var attrs = {
      user_id: $(event.currentTarget).attr("data-id"),
      photo_id: this.photo.get("id"),
      x_pos: pos.left,
      y_pos: pos.top
    }

    new PT.PhotoTagging(attrs).create(function(){
      thisTagging.$el.remove();
    });
  }

})(this);