const dummy = {
    Author: "Suzanne Collins",
    Genre: "Romance",
    ISBN: "9332HBS"
}

const bookListItems = [];

const search = (event) => {
    const searchText = (document.querySelector("#searchInput") as HTMLInputElement).value;
    //document.querySelector("#bookList").innerHTML = "";
    bookListItems.push(createBookListItemSm());
    console.log(searchText);
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

    return containerSm;
}

window.onload = () => {
    //fetch from db
    //createBookListItemSm();
    const root = document.querySelector("#bookList");
    createBookListItemSm();
    return;
    root.appendChild(basicElement({
        type: "img",
        parent: root,
        src: "static/images/search-placeholder.png",
        id: "search-placeholder-img"
    }));

}