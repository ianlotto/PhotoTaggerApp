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

	$form = $(event.currentTarget);
	$txtInputs = $("input[type=text]");

    formData = $form.serializeJSON();

    var photo = new PT.Photo(formData.photo);

    photo.create(function(newPhoto) {
      PT.Photo.all.unshift(newPhoto);
      PT.Photo.trigger("add");
      $txtInputs.val("");
    });

  };

})(this);