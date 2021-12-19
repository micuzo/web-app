var formCatalog = {
    ISBN: -1,
    action: "add",
    quantity: 0
};
window.onload = function () {
    var root = document.querySelector("#container");
    fetch("/api/book")
        .then(function (res) { return res.json(); })
        .then(function (books) {
        var tableData = getBookTable(books);
        createTable(tableData, root);
    });
};
