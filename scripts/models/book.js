'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://jm-ab-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiURL = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach( key => this[key] = rawDataObj[key]);
  }

  Book.all = [];

  Book.prototype.toHtml = function(htmlID) {
    var template = Handlebars.compile($(htmlID).text());
    return template(this);
  };

  Book.loadAll = bookData => {
    Book.all = bookData.map(book => {
      return new Book(book);
    });
  };

  Book.fetchAll = callback => {
    $.get(`${ENV.apiURL}/api/v1/books`)
      .then(results => { Book.loadAll(results);
      })
      .then(callback)
      .catch( err => app.errorView.errorCallBack(err));
  };

  Book.fetchOne = function(callback) {
    $.ajax({
      url: `${ENV.apiURL}/api/v1/books/:${this.id}`,
      method: 'GET',
    })
      .then( callback )
      .catch( err => app.errorView.errorCallBack(err));
  };

  Book.prototype.addNewBook = function() {
    $.post(`${ENV.apiURL}/api/v1/books`, {title: this.title, author: this.author, isbn: this.isbn, image_url: this.image_url, description: this.description})
      .then( console.log('addneewbook pass'))
      .catch( err => app.errorView.errorCallBack(err));
  };

  Book.prototype.updateBook = function() {

    $.ajax({
      url: `${ENV.apiURL}/api/v1/books/update/single-book${ctx.params.id}`,
      method: 'PUT',
      data: {
        title: this.title,
        author: this.author,
        isbn: this.isbn,
        image_url: this.image_url,
        description: this.description
      }
    })
      .then(console.log('Book Update sent to server'))
      .catch(err => console.error('inside Book.updateBook:', err));
  };


  module.Book = Book;
})(app);

