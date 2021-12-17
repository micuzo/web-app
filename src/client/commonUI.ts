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