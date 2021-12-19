var _a, _b;
var cartItemsUI = [];
var countByISBN = {};
var ISBNBookMap = {};
var continueButton;
var billingForm = (_a = {
        Name: "",
        City: "",
        Country: "",
        Email: ""
    },
    _a["Postal Code"] = "",
    _a);
var shippingForm = (_b = {
        Name: "",
        City: "",
        Country: "",
        Email: ""
    },
    _b["Postal Code"] = "",
    _b);
var createContinueButton = function () {
    var root = document.querySelector("#cartItems");
    var buttonsContainer = basicElement({
        type: "div",
        parent: root,
        id: "buttons-container"
    });
    continueButton = buttonsContainer;
    if (cartItemsUI.length > 0)
        createButton(ButtonType.PRIMARY, buttonsContainer, "Continue", checkoutForm);
};
var renderCartList = function () {
    var root = document.querySelector("#cartItems");
    root.innerHTML = "";
    cartItemsUI.forEach(function (li) {
        root.appendChild(li);
    });
    createContinueButton();
};
var checkoutForm = function (title) {
    var _a;
    var root = document.querySelector("#checkoutForm");
    if (continueButton) {
        continueButton.remove();
        continueButton = null;
    }
    var labelTypeMap = (_a = {
            Name: "string",
            City: "string",
            Country: "string",
            Email: "email"
        },
        _a["Postal Code"] = "string",
        _a);
    basicElement({
        type: "h2",
        parent: root,
        innerHTML: "Shipping information"
    });
    createFormInputs(labelTypeMap, root, shippingForm);
    basicElement({
        type: "h2",
        parent: root,
        innerHTML: "Billing information"
    });
    createFormInputs(labelTypeMap, root, billingForm);
    var submit = createButton(ButtonType.PRIMARY, root, "Confirm Order", function () {
        var user = getUser();
        var cart = getCart();
        var bookByISBN = [];
        var payload = {
            email: user.email,
            bookCount: countByISBN,
            shipping_address: JSON.stringify(shippingForm),
            billing_address: JSON.stringify(billingForm)
        };
        post("/api/order", payload)
            .then(function (res) { return res.json(); })
            .then(function (res) {
            alert(res.res);
            initCart();
            location.reload();
        });
    });
};
window.onload = function () {
    var cart = getCart();
    cart.forEach(function (book) {
        if (countByISBN[book.ISBN])
            countByISBN[book.ISBN]++;
        else
            countByISBN[book.ISBN] = 1;
        ISBNBookMap[book.ISBN] = book;
    });
    cartItemsUI = Object.keys(countByISBN).map(function (ISBN) { return createCartItem(ISBNBookMap[ISBN], countByISBN[ISBN]); });
    basicElement({
        type: "h2",
        parent: document.querySelector("#total"),
        innerHTML: "Total:  $".concat(cart.reduce(function (prev, curr, index) { return prev + curr.price; }, 0))
    });
    renderCartList();
};
