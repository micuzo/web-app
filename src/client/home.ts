let bookListItems = [];

const search = (event) => {
    const searchText = (document.querySelector("#searchInput") as HTMLInputElement).value;
    fetch("/api/book/" + searchText)
    .then((res) => res.json())
    .then((data) => {
        const root = document.querySelector("#bookList");
        bookListItems = data.map(book => createBookListItemSm(book));
        renderList();
    });
}

const createBookListItemSm = (book:Book) => {

    const containerSm = basicElement({
        type: "div",
        parent: null,
        className: "book-li book-li-sm",
    });
    
    //Tile, book image, price, author
    const leftCol = basicElement({
        type: "div",
        parent: containerSm,
        className: "li-left-col"
    });
    
    const rand = Math.floor(Math.random() * 3 + 1);
    const bookImg = basicElement({
        type: "img", 
        parent: leftCol,
        src: `/static/images/book-${rand}.png`,
        className: "li-img-sm"
    });
    
    const info = basicElement({
        type: "div",
        parent: leftCol,
        className: "info"
    });

    const title = basicElement({
        type: "h3",
        parent: info,
        innerHTML: book.title
    });
    
    const author = basicElement({
        type: "p",
        parent: info,
        innerHTML: book.author
    });

    const price = basicElement({
        type: "p",
        parent: leftCol,
        innerHTML: `$${book.price}`,
        className: "price"
    });

    const rightCol = basicElement({
        type: "div",
        parent: containerSm,
        className: "li-right-col"
    });
    const moreInfoButton = createButton(ButtonType.SECONDARY, rightCol, "More Info", () => {
        bookListItems.splice(bookListItems.indexOf(containerSm), 1, createBookListItemLg(book));
        renderList();
    });
    const addToCartButton = createButton(ButtonType.PRIMARY, rightCol, "Add to cart", () => {
        store.addToCart(book);
        alert(`${book.title} added to cart`);
    });
    
    return containerSm;
}

const createBookListItemLg = (book:Book) => {
   
    const container = basicElement({
        type: "div",
        parent: null,
        className: "book-li book-li-lg"
    });

    const leftCol = basicElement({
        type: "div",
        parent: container,
        className: "li-col-lg li-col-lg-left"
    });

    const rand = Math.floor(Math.random() * 3 + 1);
    const bookImg = basicElement({
        type: "img", 
        parent: leftCol,
        src: `/static/images/book-${rand}.png`,
        className: "li-img-lg"
    });

    const info = basicElement({
        type: "div",
        parent: leftCol,
        className: "info-lg"
    });

    const title = basicElement({
        type: "h2",
        parent: info,
        innerHTML: book.title
    });

    const author = basicElement({
        type: "p",
        parent: info,
        innerHTML: book.author
    });

    const genre = basicElement({
        type: "p",
        parent: info,
        innerHTML: book.genre
    });

    const price = basicElement({
        type: "p",
        parent: info,
        className: "price",
        innerHTML: `$${book.price}`
    });

    //More Info Column
    const middeCol = basicElement({
        type: "p",
        parent: container,
        className: "li-col-lg li-col-lg-middle"
    });

    const moreInfoTitle = basicElement({
        type: "h4",
        parent: middeCol,
        innerHTML: "More information"
    });

    const moreInfoContent = basicElement({
        type: "div",
        parent: middeCol,
        className: "more-info-content"
    });

    const bookLabelMap = {
        ISBN: "ISBN",
        publisher: "Publisher",
        pages: "Pages",
    }

    Object.keys(bookLabelMap).forEach((key) => {
        const outer = basicElement({
            type: "span",
            parent: moreInfoContent,
        });

        const label = basicElement({
            type: "span",
            parent: outer,
            innerHTML: `${bookLabelMap[key]}: `,
            className: "bold"
        });

        const data = basicElement({
            type: "span",
            parent: outer,
            innerHTML: book[key]
        })
    })

    const addToCartButton = createButton(ButtonType.PRIMARY, middeCol, "Add to cart", () => {
        store.addToCart(book);
    });

    const rightCol = basicElement({
        type: "div",
        parent: container,
        className: "li-col-lg li-col-lg-right"
    });

    const collapseButton = basicElement({
        type: "button",
        parent: rightCol,
        innerHTML: "^",
        className: "btn-collapse",
        onclick: () => {
            bookListItems.splice(bookListItems.indexOf(container), 1, createBookListItemSm(book));
            renderList();
        }
    });

    return container;
    
}

const renderList = () => {
    const root = document.querySelector("#bookList");
    root.innerHTML = "";
    console.log(root);
    bookListItems.forEach((li) => {
        root.appendChild(li);
    });
}

window.onload = () => {
    const root = document.querySelector("#bookList");
    root.appendChild(basicElement({
        type: "img",
        parent: root,
        src: "static/images/search-placeholder.png",
        id: "search-placeholder-img"
    }));

}