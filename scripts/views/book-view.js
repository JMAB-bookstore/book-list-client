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

  bookView.initDetailPage = (ctx) => {
    console.log(ctx);
    $('.container').hide();
    $('.book-detail-view').empty().show();

    app.Book.all.forEach( book => {
      if( parseInt(book.id) === parseInt(ctx.params.id) ) {
        $('#book-detail').append(book.detailToHtml());
      }
    });
  };

  module.bookView = bookView;
})(app) ;
