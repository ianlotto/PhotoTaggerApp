(function(root){
  var PT = root.PT = (root.PT || {});

  var PhotoListView = PT.PhotoListView = function() {
    this.$el = $("<div></div>");

    PT.Photo.on("add", this.render.bind(this));
    this.$el.on("click", "a", this.showDetail.bind(this));
  }

  PhotoListView.prototype.render = function() {
    $el = this.$el;

    $el.empty();

    liStr = "<ul>"

	PT.Photo.all.forEach(function(photo){
      liStr += "<li><a href=\"#\" data-id=\"" +
        photo.get("id") + "\">" + photo.get("title") + "</a></li>";
    });
    liStr += "</ul>";

    $el.html(liStr);

    return this;
  }

  PhotoListView.prototype.showDetail = function(event) {
    event.preventDefault();

    var id = parseInt($(event.currentTarget).attr("data-id"));
    var photo = PT.Photo.find(id);

    PT.showPhotoDetail(photo);
  }

})(this);