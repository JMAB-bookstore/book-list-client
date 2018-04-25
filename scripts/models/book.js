'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://jm-ab-booklist.herokuapp.com/';
ENV.developmentApiUrl = 'http://localhost:8080';
ENV.apiURL = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach( key => this[key] = rawDataObj[key]);
  }

  Book.all = [];

  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-list-template').text());

    // no marked .body

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
      .then(results => {
        console.log(results);
        Book.loadAll(results);
        callback();
      })
      .catch(app.errorView.errorCallback);
    console.log(app.errorView.errorCallback);
  };

  Book.fetchOne = function(callback) {
    $.ajax({
      url: `${ENV.apiURL}/api/v1/books/:${this.id}`,
      method: 'GET',
    })
      .then( callback )
      .catch( console.error);
  };


  module.Book = Book;
})(app);

