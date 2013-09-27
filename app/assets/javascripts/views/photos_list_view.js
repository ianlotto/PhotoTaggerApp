(function(root){
  var PT = root.PT = (root.PT || {});

  var PhotoListView = PT.PhotoListView = function() {
    this.$el = $("<div></div>");
  }

  PhotoListView.prototype.render = function() {
    $el = this.$el;

    $el.empty();

    liStr = "<ul>"
    PT.Photo.all.forEach(function(photo){
      liStr += "<li>" + photo.get("title") + "</li>";
    });
    liStr += "</ul>";

    $el.html(liStr);

    return this;
  }

})(this);