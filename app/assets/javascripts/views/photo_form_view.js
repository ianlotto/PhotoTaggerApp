(function(root){
  var PT = root.PT = (root.PT || {});

  var PhotoFormView = PT.PhotoFormView = function() {
    this.$el = $("<div></div>");
  }

  PhotoFormView.prototype.render = function() {
    $el = this.$el;
    $el.html(JST["photo_form"]());

    return this;
  }

})(this);