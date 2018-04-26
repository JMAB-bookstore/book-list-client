'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', app.bookView.initNewBook);
page('/books/:id', ctx => app.bookView.initDetailPage(ctx));
page();