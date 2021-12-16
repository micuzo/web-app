const dummy = {
    Author: "Suzanne Collins",
    Genre: "Romance",
    ISBN: "9332HBS",
    Publisher: "Scholastic Press",
    NumPages: 374
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
        className: "book-li book-li-sm"
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

const createListItemLg = () => {
    const root = document.querySelector("#bookList");
    const container = basicElement({
        type: "div",
        parent: root,
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
        innerHTML: "The Hunger Games"
    });

    const author = basicElement({
        type: "p",
        parent: info,
        innerHTML: "Suzanne Collins"
    });

    const genre = basicElement({
        type: "p",
        parent: info,
        innerHTML: "Romance"
    });

    const price = basicElement({
        type: "p",
        parent: info,
        className: "price",
        innerHTML: "$22"
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

    ["ISBN", "Publisher", "NumPages"].forEach((key) => {
        const outer = basicElement({
            type: "span",
            parent: moreInfoContent,
        });

        const label = basicElement({
            type: "span",
            parent: outer,
            innerHTML: `${key}: `,
            className: "bold"
        });

        const data = basicElement({
            type: "span",
            parent: outer,
            innerHTML: dummy[key]
        })
    })

    const addToCartButton = createButton(ButtonType.PRIMARY, middeCol, "Add to cart");

    const rightCol = basicElement({
        type: "div",
        parent: container,
        className: "li-col-lg li-col-lg-right"
    });

    const collapseButton = basicElement({
        type: "button",
        parent: rightCol,
        innerHTML: "^",
        className: "btn-collapse"
    });
    
}

window.onload = () => {
    //fetch from db
    //createBookListItemSm();
    const root = document.querySelector("#bookList");
    createListItemLg();
    createBookListItemSm();
    return;
    root.appendChild(basicElement({
        type: "img",
        parent: root,
        src: "static/images/search-placeholder.png",
        id: "search-placeholder-img"
    }));

}