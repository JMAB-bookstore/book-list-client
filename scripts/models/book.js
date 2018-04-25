'use strict';

var app = app || {};

(function(module) {
  
  function Book(rawDataObj) {
    Object.key(rawDataObj).forEach( key => this[key] = rawDataObj[key]);
  }
  
  Book.all = [];
  
  Book.prototype.toHtml() = function() {
    var template = Handlebars.compile($('#book-list-template').text());
  
    // no marked .body 
  
    return template(this);
  }
  
  Book.loadAll = bookData => {
    Book.all = bookData.map(book => {
      return new Book(book);
    })
  };
  
  Book.fetchAll = callback => {
    $.get('/api/v1/books')
    .then(results => {
      Book.loadAll(results);
      callback();
    })
    .catch(errorCallback);
  };

  module.Book = Book;
})(app);

