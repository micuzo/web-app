interface BasicElConfig {
    type: string,
    parent: any,
    className?: string,
    id?: string,
    innerHTML?: string,
    src?: string,
    for?: string,
    inputType?: string,
    onclick?: Function,
    onchange?: Function
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
        if (key === "inputType"){
            el["type"] = config.inputType;
            return;
        }
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

const createFormInputs = (labelTypeMap: any, parent: any, dataObj: any) => {
    Object.keys(labelTypeMap).forEach((label) => {
        const container = basicElement({
            type: "div",
            parent: parent,
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
            id: label,
            onchange: (e) => formElOnChange(dataObj, label, e.target.value),
            inputType: labelTypeMap[label]
        });
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
        innerHTML: book.title
    });

    const author = basicElement({
        type: "p",
        parent: container,
        innerHTML: book.author
    });

    const price = basicElement({
        type: "p",
        parent: container,
        innerHTML: `$${book.price}`,
        className: "price"
    })

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

const createTable = (data: any[], parent, isDouble?) => {
    const table = basicElement({
        type: "table",
        parent
    });
    
    data.forEach((row: any[], index) => {
        const rowUI = basicElement({
            type: "tr",
            parent: table
        });
        if (isDouble && index === 0) {
            const empty = basicElement({
                type: "th",
                parent: rowUI
            })
        }
        row.forEach((cell, cellIndex) => {
            const cellUI = basicElement({
                type: index === 0 || (cellIndex === 0 && isDouble) ? "th" : "td",
                parent: rowUI,
                innerHTML: cell
            });
        })
    })
}

const formElOnChange = (dataObj:any, key:string, value: any) => {
    dataObj[key] = value;
}