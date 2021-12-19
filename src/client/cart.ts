let cartItemsUI = [];
const countByISBN = {};
const ISBNBookMap = {};
let continueButton;
const billingForm = {
    Name: "",
    City: "",
    Country: "",
    Email: "",
    ["Postal Code"]: ""
}

const shippingForm = {
    Name: "",
    City: "",
    Country: "",
    Email: "",
    ["Postal Code"]: ""
};


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

    const labelTypeMap = {
        Name: "string",
        City: "string",
        Country: "string",
        Email: "email",
        ["Postal Code"]: "string"
    }

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

    const submit = createButton(ButtonType.PRIMARY, root, "Confirm Order", () => {
        const user = getUser();
        const cart = getCart();
        const bookByISBN = [];
        const payload = {
            email: user.email,
            bookCount: countByISBN,
            shipping_address: JSON.stringify(shippingForm),
            billing_address: JSON.stringify(billingForm)
        }
        post("/api/order", payload)
        .then((res) => res.json())
        .then(res => alert(res.res));
    });
}


window.onload = () => {
    const cart = getCart();
    cart.forEach((book) => {
        if (countByISBN[book.ISBN]) countByISBN[book.ISBN]++;
        else countByISBN[book.ISBN] = 1;
        ISBNBookMap[book.ISBN] = book;
    });
    
    cartItemsUI = Object.keys(countByISBN).map((ISBN: any) => createCartItem(ISBNBookMap[ISBN], countByISBN[ISBN]))

    basicElement({
        type: "h2",
        parent: document.querySelector("#total"),
        innerHTML:`Total:  $${(cart as any[]).reduce((prev, curr, index) => prev + curr.price, 0)}`
    });

    renderCartList();
}