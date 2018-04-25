'use strict';
var app = app || {};

(function(module){
  let errorView = {};

  errorView.initErrorPage = err => {
    $('.container').hide();
    $('.error-view').show();
    $('#error-message').empty();
    $('#error-message').append(errorView.toHtml(err));
  };

  errorView.toHtml = function(e) {
    let template = Handlebars.compile($('#error-template').text());
    return template(e);
  };

  errorView.errorCallBack = err => {
    console.error(err);
    errorView.initErrorPage(err);
  };




  module.errorView = errorView;
})(app);