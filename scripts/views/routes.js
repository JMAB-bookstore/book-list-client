'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/:id', ctx => app.bookView.initDetailPage(ctx));
// page('/books/new', );
page();