--Books replace publisher_email with name

-- Get all books
select isbn, publisher_name, title, author, genre, pages, price, quantity
from book natural join publisher;

-- Get specific book by search - string
select isbn, publisher_name, title, author, genre, pages, price, quantity
from book natural join publisher
where title = <search> or genre = <search> or author = <search>;

-- Get specific book by search - id
select isbn, publisher_name, title, author, genre, pages, price, quantity
from book natural join publisher
where isbn = <search>;

