let cartItemsUI = [];
const countByISBN = {};
const ISBNBookMap = {};
let continueButton;
const form = {
    Name: "",
    City: "",
    Country: "",
    Email: "",
    ["Postal Code"]: ""
}

const createContinueButton = () => {
    const root = document.querySelector("#cartItems");
    const buttonsContainer = basicElement({
        type: "div",
        parent: root,
        id: "buttons-container"
    });
    continueButton = buttonsContainer;

    if (cartItemsUI.length > 0) createButton(ButtonType.PRIMARY, buttonsContainer, "Continue", checkoutForm);
}

const renderCartList = () => {
    const root = document.querySelector("#cartItems");
    root.innerHTML = "";
    cartItemsUI.forEach((li) => {
        root.appendChild(li);
    });
    createContinueButton();
}

const checkoutForm = (title) => {
    
    const root = document.querySelector("#checkoutForm");
    if (continueButton){
        continueButton.remove();
        continueButton = null;
    }

    ["Name", "City", "Country", "Email", "Postal Code"].forEach((label) => {
        const container = basicElement({
            type: "div",
            parent: root,
            className: "inputContainer"
        });

        const labelUI = basicElement({
            type: "label",
            parent: container,
            innerHTML: label
        });

        const input = basicElement({
            type: "input",
            parent: container,
            id: label
        });
    });

    const submit = createButton(ButtonType.PRIMARY, root, "Confirm Order", () => alert("order confirmed"));
}


window.onload = () => {
    const cart = getCart();
    cart.forEach((book) => {
        if (countByISBN[book.ISBN]) countByISBN[book.ISBN]++;
        else countByISBN[book.ISBN] = 1;
        ISBNBookMap[book.ISBN] = book;
    });
    
    cartItemsUI = Object.keys(countByISBN).map((ISBN: any) => createCartItem(ISBNBookMap[ISBN], countByISBN[ISBN]))
    renderCartList();
}