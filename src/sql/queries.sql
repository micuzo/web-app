-- Get all books
select * from book;

-- Get specific book by search - string
select * from book
where title = <search> or genre = <search> or author = <search>;

-- Get specific book by search - id
select * from book
where isbn = <search>;