'use strict';

var app = app || {};

(function(module) {

  var bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    $('#book-list').empty();

    app.Book.all.forEach(book => {
      $('#book-list').append(book.toHtml('#book-list-template'));
    });
  };

  bookView.initDetailPage = (ctx) => {
    $('.container').hide();
    $('.book-detail-view').empty().show();

    app.Book.all.forEach( book => {
      if( parseInt(book.id) === parseInt(ctx.params.id) ) {
        $('#book-detail').append(book.toHtml('#detail-template'));
      }
    });
  };

  bookView.initNewBook = () => {
    $('.container').hide();
    $('.new-book-view').show();

    $('#new-book-form').on('submit', bookView.submit);
  };

  bookView.submit = event => {
    event.preventDefault();
    let book = new app.Book ({
      title: $('input[name=title]').val(),
      author: $('input[name=author]').val(),
      isbn: $('input[name=isbn]').val(),
      image_url: $('input[name=image_url]').val(),
      description: $('textarea[name=description]').val()
    });
    book.addNewBook();
    page('/');
  };

  bookView.initUpdate = (ctx) => {
    $('.container').hide();
    $('#book-update').show();

    app.Book.all.forEach(book => {
      if (parseInt(book.id) === parseInt(ctx.params.id)) {
        $('#book-update').append(book.toHtml('#update-book-template'));
      }
    });
    $('#update-book-form').on('submit', bookView.submitUpdate);
  };

  bookView.submitUpdate = () => {
    // event.preventDefault();
    let book = new app.Book ({
      title: $('input[name=title]').val(),
      author: $('input[name=author]').val(),
      isbn: $('input[name=isbn]').val(),
      image_url: $('input[name=image_url]').val(),
      description: $('textarea[name=description]').val()
    });
    book.updateBook();
  };

  module.bookView = bookView;

})(app);
