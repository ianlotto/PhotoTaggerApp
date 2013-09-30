(function(root){
  var PT = root.PT = (root.PT || {});

  PT.inherits = function(Parent) {
    var Surrogate = function () {};
    Surrogate.prototype = Parent.prototype;
    this.prototype = new Surrogate();
  }

})(this);