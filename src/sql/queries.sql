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

--Get isbn and price for a given list of books, used during order creation to computer total
select isbn, price from book
where isbn in (<val1>, <val2>, etc...);

--Orders

--Get order by order number - include name, author of books and quantity in order
select title, author, book_order.quantity, price, total
from book_order, book 
where book.isbn = book_order.isbn and order_number = <order_number>;

--Get max book order - used to increment order number
select max(order_number) from book_order;

--Add new order
insert into book_order
values (<next_order_number>, <user_email>, <ISBN>, <order_location>, current_date, <shipping_address>, <billing_address>, <quantity>, <total>);


--Accounts get password for email
select account_password from account where email = <email>


--Report get sales paer author and genre
select genre, sum(book.price * book_order.quantity) as sales
from book, book_order
where book.isbn = book_order.isbn
group by genre;

select author, sum(book.price * book_order.quantity) as sales
from book, book_order
where book.isbn = book_order.isbn
group by author;
