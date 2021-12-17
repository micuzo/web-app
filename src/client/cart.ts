let cartItemsUI = [];
const countByISBN = {};
const ISBNBookMap = {};

const renderCartList = () => {
    const root = document.querySelector("#cartItems");
    root.innerHTML = "";
    cartItemsUI.forEach((li) => {
        root.appendChild(li);
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
    renderCartList();
}