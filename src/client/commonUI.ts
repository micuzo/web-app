interface BasicElConfig {
    type: string,
    parent: any,
    className?: string,
    id?: string,
    innerHTML?: string,
    src?: string
}

enum ButtonType {
    PRIMARY =  "PRIMARY",
    SECONDARY = "SECONDARY"
}

const basicElement = (config: BasicElConfig) => {
    const el = document.createElement(config.type);
    Object.keys(config).forEach((key) => {
        if (key === "type") return;
        el[key] = config[key];
    });
    
    config.parent.appendChild(el);
    return el;
}

const createButton = (btnType: ButtonType, parent: any, innerHTML: string) => {
    const className = btnType === ButtonType.PRIMARY ? "btn btn-primary" : "btn btn-secondary";
    return basicElement({
        type: "button",
        parent: parent,
        innerHTML: innerHTML,
        className: className
    });
}