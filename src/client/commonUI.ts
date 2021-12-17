interface BasicElConfig {
    type: string,
    parent: any,
    className?: string,
    id?: string,
    innerHTML?: string,
    src?: string,
    onclick?: Function
}

enum ButtonType {
    PRIMARY =  "PRIMARY",
    SECONDARY = "SECONDARY",
    SECONDARY_SM = "SECONDARY_SM"
}

const basicElement = (config: BasicElConfig) => {
    const el = document.createElement(config.type);
    Object.keys(config).forEach((key) => {
        if (key === "type") return;
        el[key] = config[key];
    });
    
    if(config.parent) config.parent.appendChild(el);
    return el;
}

const createButton = (btnType: ButtonType, parent: any, innerHTML: string, onClick: Function) => {
    const classMap = {
        [ButtonType.PRIMARY]: "btn btn-primary",
        [ButtonType.SECONDARY]: "btn btn-secondary",
        [ButtonType.SECONDARY_SM]: "btn-sm btn-secondary"
    };
    const className = classMap[btnType];
    return basicElement({
        type: "button",
        parent: parent,
        innerHTML: innerHTML,
        className: className,
        onclick: onClick
    });
}

const createCartItem = (book:Book, count:number, hasRemoveButton: boolean = true) => {
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

    if (hasRemoveButton){
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
    }

   

    return container;
}