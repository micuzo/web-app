let cartItemsUI = [];
const countByISBN = {};
const ISBNBookMap = {};

const createCartItem = (book:Book, count:number) => {
    const container = basicElement({
        type: "div",
        parent: null,
        className: "cart-item"
    });

    const rand = Math.floor(Math.random() * 3 + 1)
    const bookImg = basicElement({
        type: "img", 
        parent: container,
        src: `/static/images/book-${rand}.png`,
        className: "li-img-sm"
    });

    const name = basicElement({
        type: "h3",
        parent: container,
        innerHTML: book.name
    });

    const author = basicElement({
        type: "p",
        parent: container,
        innerHTML: book.author
    });

    const quantity = basicElement({
        type: "p",
        parent: container,
        innerHTML: `x${count.toString()}`,
        className: "quantity"
    });

    const removeButton = createButton(ButtonType.SECONDARY_SM, container, "Remove", () => {
        if (countByISBN[book.ISBN] === 0) return;
        
        countByISBN[book.ISBN]--;
        if (countByISBN[book.ISBN] === 0) {
            delete ISBNBookMap[book.ISBN];
            delete countByISBN[book.ISBN];
        }

        cartItemsUI = Object.keys(countByISBN).map((ISBN: any) => createCartItem(ISBNBookMap[ISBN], countByISBN[ISBN]))
        renderCartList();
        store.removeFromCart(book.ISBN);
    });

    // const table = basicElement({
    //     type: "table",
    //     parent: container,
    //     className: "table"
    // });

    // for (let i = 0; i < 2; i++) {
    //     const row = basicElement({
    //         type: "tr",
    //         parent: table
    //     });

    //     Object.keys(book).forEach(key => {
    //         const cell = basicElement({
    //             type: i === 0 ? "th" : "td",
    //             parent: row,
    //             innerHTML: i === 0 ? key : book[key]
    //         });
    //     })
    // }

    return container;
}

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