var orderItemsUI = [];
var countByISBNOrder = {};
var ISBNBookMapOrder = {};
var renderOrder = function (order_location) {
    var root = document.querySelector("#order");
    var locationContainer = basicElement({
        type: "span",
        parent: root,
        id: "location-container"
    });
    var locationLabel = basicElement({
        type: "span",
        parent: locationContainer,
        className: "bold",
        innerHTML: "Current order location: "
    });
    var location = basicElement({
        type: "span",
        parent: locationContainer,
        innerHTML: order_location
    });
    orderItemsUI.forEach(function (li) {
        root.appendChild(li);
    });
};
var displayOrder = function () {
    document.querySelector("#order").innerHTML = "";
    fetch("/api/order/" + document.querySelector("#order-input").value)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        if (data.length === 0) {
            alert("No order was found with that order number");
            return;
        }
        basicElement({
            type: "h2",
            parent: document.querySelector("#order"),
            innerHTML: "Total:  $".concat(data[0].total)
        });
        orderItemsUI = data.map(function (order) { return createCartItem(order, order.quantity, false); });
        renderOrder(data[0].order_location);
    });
    return;
};
