'use strict';

var app = app || {};

(function(module) {

  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();

    app.Book.all.forEach(e => {
      $('#book-list').append(e.toHtml());
    });
  };

  module.bookView = bookView;

})(app) ;

$(function () {
  app.Book.fetchAll(app.bookView.initIndexPage);
});