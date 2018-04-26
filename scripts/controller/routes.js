'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/update/single-book:id', ctx => app.bookView.submitUpdate(ctx) );
page('/books/update/:id', ctx => app.bookView.initUpdate(ctx));
page('/books/new', app.bookView.initNewBook);
page('/books/:id', ctx => app.bookView.initDetailPage(ctx));
// page('/books/delete/:id');
page();