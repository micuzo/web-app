var bookListItems = [];
var search = function (event) {
    var searchText = document.querySelector("#searchInput").value;
    fetch("/api/book/" + searchText)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var root = document.querySelector("#bookList");
        bookListItems = data.map(function (book) { return createBookListItemSm(book); });
        renderList();
    });
};
var createBookListItemSm = function (book) {
    var containerSm = basicElement({
        type: "div",
        parent: null,
        className: "book-li book-li-sm",
    });
    //Tile, book image, price, author
    var leftCol = basicElement({
        type: "div",
        parent: containerSm,
        className: "li-left-col"
    });
    var rand = Math.floor(Math.random() * 3 + 1);
    var bookImg = basicElement({
        type: "img",
        parent: leftCol,
        src: "/static/images/book-".concat(rand, ".png"),
        className: "li-img-sm"
    });
    var info = basicElement({
        type: "div",
        parent: leftCol,
        className: "info"
    });
    var title = basicElement({
        type: "h3",
        parent: info,
        innerHTML: book.title
    });
    var author = basicElement({
        type: "p",
        parent: info,
        innerHTML: book.author
    });
    var price = basicElement({
        type: "p",
        parent: leftCol,
        innerHTML: "$".concat(book.price),
        className: "price"
    });
    var rightCol = basicElement({
        type: "div",
        parent: containerSm,
        className: "li-right-col"
    });
    var moreInfoButton = createButton(ButtonType.SECONDARY, rightCol, "More Info", function () {
        bookListItems.splice(bookListItems.indexOf(containerSm), 1, createBookListItemLg(book));
        renderList();
    });
    var addToCartButton = createButton(ButtonType.PRIMARY, rightCol, "Add to cart", function () {
        store.addToCart(book);
        alert("".concat(book.title, " added to cart"));
    });
    return containerSm;
};
var createBookListItemLg = function (book) {
    var container = basicElement({
        type: "div",
        parent: null,
        className: "book-li book-li-lg"
    });
    var leftCol = basicElement({
        type: "div",
        parent: container,
        className: "li-col-lg li-col-lg-left"
    });
    var rand = Math.floor(Math.random() * 3 + 1);
    var bookImg = basicElement({
        type: "img",
        parent: leftCol,
        src: "/static/images/book-".concat(rand, ".png"),
        className: "li-img-lg"
    });
    var info = basicElement({
        type: "div",
        parent: leftCol,
        className: "info-lg"
    });
    var title = basicElement({
        type: "h2",
        parent: info,
        innerHTML: book.title
    });
    var author = basicElement({
        type: "p",
        parent: info,
        innerHTML: book.author
    });
    var genre = basicElement({
        type: "p",
        parent: info,
        innerHTML: book.genre
    });
    var price = basicElement({
        type: "p",
        parent: info,
        className: "price",
        innerHTML: "$".concat(book.price)
    });
    //More Info Column
    var middeCol = basicElement({
        type: "p",
        parent: container,
        className: "li-col-lg li-col-lg-middle"
    });
    var moreInfoTitle = basicElement({
        type: "h4",
        parent: middeCol,
        innerHTML: "More information"
    });
    var moreInfoContent = basicElement({
        type: "div",
        parent: middeCol,
        className: "more-info-content"
    });
    var bookLabelMap = {
        ISBN: "ISBN",
        publisher: "Publisher",
        pages: "Pages",
    };
    Object.keys(bookLabelMap).forEach(function (key) {
        var outer = basicElement({
            type: "span",
            parent: moreInfoContent,
        });
        var label = basicElement({
            type: "span",
            parent: outer,
            innerHTML: "".concat(bookLabelMap[key], ": "),
            className: "bold"
        });
        var data = basicElement({
            type: "span",
            parent: outer,
            innerHTML: book[key]
        });
    });
    var addToCartButton = createButton(ButtonType.PRIMARY, middeCol, "Add to cart", function () {
        store.addToCart(book);
    });
    var rightCol = basicElement({
        type: "div",
        parent: container,
        className: "li-col-lg li-col-lg-right"
    });
    var collapseButton = basicElement({
        type: "button",
        parent: rightCol,
        innerHTML: "^",
        className: "btn-collapse",
        onclick: function () {
            bookListItems.splice(bookListItems.indexOf(container), 1, createBookListItemSm(book));
            renderList();
        }
    });
    return container;
};
var renderList = function () {
    var root = document.querySelector("#bookList");
    root.innerHTML = "";
    console.log(root);
    bookListItems.forEach(function (li) {
        root.appendChild(li);
    });
};
window.onload = function () {
    var root = document.querySelector("#bookList");
    root.appendChild(basicElement({
        type: "img",
        parent: root,
        src: "static/images/search-placeholder.png",
        id: "search-placeholder-img"
    }));
};
