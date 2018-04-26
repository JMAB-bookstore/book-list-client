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

  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  };

  Book.prototype.detailToHtml = function() {
    var template = Handlebars.compile($('#detail-template').text());
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


  module.Book = Book;
})(app);

