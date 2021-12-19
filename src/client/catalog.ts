const formCatalog = {
    ISBN: -1,
    action: "add",
    quantity: 0
}

window.onload = () => {
    const root = document.querySelector("#container");
    const tableData =getBookTable();
    createTable(tableData, root);

    const formRoot = document.querySelector("#edit-catalog-inputs");
    createFormInputs({
        ISBN: "number",
        action: "text",
        quantity: "number"
    }, formRoot, formCatalog);
    
    createButton(ButtonType.PRIMARY, formRoot, "Make order", () => console.log(formCatalog));
}