let orderItemsUI = [];
const countByISBNOrder = {};
const ISBNBookMapOrder = {};

const renderOrder = (order_location) => {
    const root = document.querySelector("#order");
    const locationContainer = basicElement({
        type: "span",
        parent: root,
        id: "location-container"
    });
    const locationLabel = basicElement({
        type: "span",
        parent: locationContainer,
        className: "bold",
        innerHTML: "Current order location: "
    });
    const location = basicElement({
        type: "span",
        parent: locationContainer,
        innerHTML: order_location
    });

    orderItemsUI.forEach((li) => {
        root.appendChild(li);
    });
}


const displayOrder = () => {
    document.querySelector("#order").innerHTML = "";
    fetch("/api/order/" + (document.querySelector("#order-input") as HTMLInputElement).value)
    .then(res => res.json())
    .then(data => {
        if(data.length === 0){
            alert("No order was found with that order number");
            return;
        }
        orderItemsUI = data.map(order => createCartItem(order, order.quantity, false));
        renderOrder(data[0].order_location);
    });

    return;
}