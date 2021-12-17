let orderItemsUI = [];
const countByISBNOrder = {};
const ISBNBookMapOrder = {};

const renderOrder = () => {
    const root = document.querySelector("#order");
    root.innerHTML = "";
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
        innerHTML: "Paris France"
    });

    orderItemsUI.forEach((li) => {
        root.appendChild(li);
    });
}


const displayOrder = () => {
    const cart = getCart();
    cart.forEach((book) => {
        if (countByISBNOrder[book.ISBN]) countByISBNOrder[book.ISBN]++;
        else countByISBNOrder[book.ISBN] = 1;
        ISBNBookMapOrder[book.ISBN] = book;
    });
    
    orderItemsUI = Object.keys(countByISBNOrder).map((ISBN: any) => createCartItem(ISBNBookMapOrder[ISBN], countByISBNOrder[ISBN], false));
    renderOrder();
}