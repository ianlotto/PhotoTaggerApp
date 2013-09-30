(function(root){
  var PT = root.PT = (root.PT || {});

  var Model = PT.Model = function (attributes){
    this.attributes = _.extend({}, attributes);
  };

  Model.all = [];
  Model.getIndexURL = function() {};

  Model.prototype.get = function (attr_name) {
    return this.attributes[attr_name];
  };

  Model.prototype.set = function (attr_name, val) {
    this.attributes[attr_name] = val;
  };

  Model.fetchByParentId = function (parentId, callback) {
    var Model = this;

    $.ajax({
    url: Model.getIndexURL(parentId),
    method: 'GET',
    dataType: 'json',
    success: function(data){
      var objects = _.map(data, function(m) {
        return new Model(m);
      });

      Model.all = objects;
      callback(); //renders content onto page.
      }
    });
  }

  Model.prototype.create = function (callback) {
    var thisObj = this;

    if (thisObj.get("id")) return false;

    $.ajax({
    url: thisObj.createURL,
    method: 'POST',
    data: thisObj.attributes,
    dataType: 'json',
    success: function(data){
      _.extend(thisObj.attributes, data);

      callback(thisObj);
      }
    });
  };

})(this);