(function(root){
  var PT = root.PT = (root.PT || {});

  var PhotoFormView = PT.PhotoFormView = function() {
    this.$el = $("<div></div>");

    this.$el.on("submit", "form", this.submit.bind(this));
  }

  PhotoFormView.prototype.render = function() {
    $el = this.$el;
    $el.html(JST["photo_form"]());

    return this;
  }

  PhotoFormView.prototype.submit = function (event) {
    event.preventDefault();

    formData = $(event.currentTarget).serializeJSON();

    var photo = new PT.Photo(formData.photo);

    console.log(photo)

    photo.create(function (justSavedPhoto) {
      console.log(this);
    });

  };

})(this);