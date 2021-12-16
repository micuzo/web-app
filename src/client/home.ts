const dummy = {
    Author: "Suzanne Collins",
    Genre: "Romance",
    ISBN: "9332HBS"
}

const createAddToCartButton  = () => {

}

const createBookListItemSm = () => {
    const root = document.querySelector("#bookList");

    const containerSm = basicElement({
        type: "div",
        parent: root,
        className: "book-li-sm"
    });
    
    //Tile, book image, price, author
    const leftCol = basicElement({
        type: "div",
        parent: containerSm,
        className: "li-left-col"
    })
    
    const bookImg = basicElement({type: "img", parent: leftCol});
    
    const info = basicElement({
        type: "div",
        parent: leftCol,
        className: "info"
    });

    const title = basicElement({
        type: "h3",
        parent: info,
        innerHTML: "The Hunger Games"
    });
    
    const author = basicElement({
        type: "p",
        parent: info,
        innerHTML: dummy.Author
    });

    const price = basicElement({
        type: "p",
        parent: leftCol,
        innerHTML: "$22",
        className: "price"
    });

    const rightCol = basicElement({
        type: "div",
        parent: containerSm,
        className: "li-right-col"
    });
    const moreInfoButton = createButton(ButtonType.SECONDARY, rightCol, "More Info");
    const addToCartButton = createButton(ButtonType.PRIMARY, rightCol, "Add to cart");
    

    //Append info table
    root.appendChild(containerSm);

}

window.onload = () => {
    //fetch from db
    createBookListItemSm();
}