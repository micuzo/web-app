var ButtonType;
(function (ButtonType) {
    ButtonType["PRIMARY"] = "PRIMARY";
    ButtonType["SECONDARY"] = "SECONDARY";
    ButtonType["SECONDARY_SM"] = "SECONDARY_SM";
})(ButtonType || (ButtonType = {}));
var basicElement = function (config) {
    var el = document.createElement(config.type);
    Object.keys(config).forEach(function (key) {
        if (key === "type")
            return;
        if (key === "inputType") {
            el["type"] = config.inputType;
            return;
        }
        el[key] = config[key];
    });
    if (config.parent)
        config.parent.appendChild(el);
    return el;
};
var createButton = function (btnType, parent, innerHTML, onClick) {
    var _a;
    var classMap = (_a = {},
        _a[ButtonType.PRIMARY] = "btn btn-primary",
        _a[ButtonType.SECONDARY] = "btn btn-secondary",
        _a[ButtonType.SECONDARY_SM] = "btn-sm btn-secondary",
        _a);
    var className = classMap[btnType];
    return basicElement({
        type: "button",
        parent: parent,
        innerHTML: innerHTML,
        className: className,
        onclick: onClick
    });
};
var createFormInputs = function (labelTypeMap, parent, dataObj) {
    Object.keys(labelTypeMap).forEach(function (label) {
        var container = basicElement({
            type: "div",
            parent: parent,
            className: "inputContainer"
        });
        var labelUI = basicElement({
            type: "label",
            parent: container,
            innerHTML: label
        });
        var input = basicElement({
            type: "input",
            parent: container,
            id: label,
            onchange: function (e) { return formElOnChange(dataObj, label, e.target.value); },
            inputType: labelTypeMap[label]
        });
    });
};
var createCartItem = function (book, count, hasRemoveButton) {
    if (hasRemoveButton === void 0) { hasRemoveButton = true; }
    var container = basicElement({
        type: "div",
        parent: null,
        className: "cart-item"
    });
    var rand = Math.floor(Math.random() * 3 + 1);
    var bookImg = basicElement({
        type: "img",
        parent: container,
        src: "/static/images/book-".concat(rand, ".png"),
        className: "li-img-sm"
    });
    var name = basicElement({
        type: "h3",
        parent: container,
        innerHTML: book.title
    });
    var author = basicElement({
        type: "p",
        parent: container,
        innerHTML: book.author
    });
    var price = basicElement({
        type: "p",
        parent: container,
        innerHTML: "$".concat(book.price),
        className: "price"
    });
    var quantity = basicElement({
        type: "p",
        parent: container,
        innerHTML: "x".concat(count.toString()),
        className: "quantity"
    });
    if (hasRemoveButton) {
        var removeButton = createButton(ButtonType.SECONDARY_SM, container, "Remove", function () {
            if (countByISBN[book.ISBN] === 0)
                return;
            countByISBN[book.ISBN]--;
            if (countByISBN[book.ISBN] === 0) {
                delete ISBNBookMap[book.ISBN];
                delete countByISBN[book.ISBN];
            }
            cartItemsUI = Object.keys(countByISBN).map(function (ISBN) { return createCartItem(ISBNBookMap[ISBN], countByISBN[ISBN]); });
            renderCartList();
            store.removeFromCart(book.ISBN);
        });
    }
    return container;
};
var createTable = function (data, parent, isDouble) {
    var table = basicElement({
        type: "table",
        parent: parent
    });
    data.forEach(function (row, index) {
        var rowUI = basicElement({
            type: "tr",
            parent: table
        });
        if (isDouble && index === 0) {
            var empty = basicElement({
                type: "th",
                parent: rowUI
            });
        }
        row.forEach(function (cell, cellIndex) {
            var cellUI = basicElement({
                type: index === 0 || (cellIndex === 0 && isDouble) ? "th" : "td",
                parent: rowUI,
                innerHTML: cell
            });
        });
    });
};
var formElOnChange = function (dataObj, key, value) {
    dataObj[key] = value;
};
