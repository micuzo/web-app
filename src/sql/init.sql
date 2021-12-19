\c postgres
drop database if exists bookstore_101128175;
create database bookstore_101128175;
\c bookstore_101128175;

--Account
create table account (
    email varchar ( 50 ) primary key,
    account_password varchar ( 50 ) not null,
    full_name varchar ( 50 ) not null,
    account_address varchar not null
);

insert into account
values
    ('admin@example.com', 'admin', 'Admin Admin', 'Admin Avenue'),
    ('bob@example.com', '12345', 'Bob Smith', '123 main street'),
    ('alice@example.com', 'stevejobs', 'Alice Smith', '123 main street');


--Publisher
create table publisher (
    publisher_email varchar ( 50 ) primary key,
    publisher_name varchar ( 50 ) not null,
    publisher_address varchar not null,
    phone_number varchar ( 50 ) not null
);

insert into publisher
values
    ('tss@example.com', 'The Scholastic Press', '321 steve street', '29102910'),
    ('awesome-books@example.com', 'Awesome Books', '9320 charleton avenue', '99032'),
    ('pagez@example.com', 'Pagez', '9320 Heimerdinger Boulevard', '9021292819'),
    ('omt@example.com', 'One more thing', 'One Banna Park Way', '29062007');

--Book
create table book (
    ISBN integer primary key,
    publisher_email varchar ( 50 ) references publisher,
    title varchar not null,
    author varchar not null,
    genre varchar not null,
    pages integer not null,
    price float not null,
    publisher_percentage integer not null,
    quantity integer not null
);

insert into book
values
    (3394, 'tss@example.com', 'The Hunger Games', 'Suzanne Collins', 'Dystopian', 374, 22, 23, 54),
    (1278, 'pagez@example.com', 'Star Wars', 'George Lucas', 'Sci-fi', 872, 33, 0, 66),
    (8912, 'awesome-books@example.com', 'And then there were none', 'Agatha Christie', 'Mystery', 502, 89, 12, 7),
    (8740, 'omt@example.com', 'A brief history of time', 'Stephen Hawking', 'Educational', 489, 103, 8, 99),
    (2007, 'omt@example.com', 'The Martian', 'Andy Weir', 'Sci-fi', 459, 15, 45, 300),
    (2020, 'pagez@example.com', 'Murder on the Orient Express', 'Agatha Christie', 'Mystery', 500, 43, 9, 22),
    (1333, 'omt@example.com', 'The Hunger Games: Catching Fire', 'Suzanne Collins', 'Dystopian', 302, 25, 35, 98),
    (2097, 'tss@example.com', 'Relational Databases', 'Sea Quill', 'Educational', 1398, 700, 0, 287);

--Order
create table book_order (
    order_number integer,
    account_email varchar ( 50 ) references account,
    ISBN integer references book,
    order_location varchar ( 50 ) not null,
    issue_date date not null,
    shipping_address varchar not null,
    billing_address varchar not null,
    quantity integer not null,
    total float not null
);

insert into book_order
values
    (1, 'bob@example.com', 3394, 'Austin, TX', '2021-10-31', '123 main street', '123 main street', 2, 59),
    (1, 'bob@example.com', 2007, 'Austin, TX', '2021-10-31', '123 main street', '123 main street', 1, 59),
    (2, 'alice@example.com', 8740, 'Paris, FR', '2020-04-01', '123 main street', '123 main street', 1, 103),
    (3, 'bob@example.com', 2097, 'Out for Delivery', '2021-12-17', '123 main street', '123 main street', 3, 798),
    (3, 'bob@example.com', 1333, 'Shanghai, CN', '2021-12-13', '123 main street', '123 main street', 1, 798),
    (4, 'alice@example.com', 1278, 'Cairo, EG', '2021-12-01', '123 main street', '123 main street', 1, 109),
    (4, 'alice@example.com', 2020, 'Out for Delivery', '2021-12-19', '123 main street', '123 main street', 1, 109);
