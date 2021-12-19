window.onload = () => {
    const tableData = [["agatha", "george"], ["sales", 33, 53]];
    createTable(tableData, document.querySelector("#author-report"), true);

    const tableData2 = [["agatha", "george"], ["sales", 33, 53]];
    createTable(tableData, document.querySelector("#genre-report"), true);

}