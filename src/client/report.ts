window.onload = () => {
    const fetchAuthor = fetch("/api/report/per-author");
    const fetchGenre = fetch("/api/report/per-genre");

    Promise.all([fetchAuthor, fetchGenre])
    .then((res) => Promise.all(res.map(res => res.json()))
    .then(data => {
        data.forEach((tableDataRaw: any[], index) => {
            let root = index === 0 ? "#author-report" : "#genre-report";
            let key = index === 0 ? "author" : "genre";
            const headers = tableDataRaw.map(el => el[key]);
            const rows = tableDataRaw.map(el => `$${el.sales}`);
            rows.splice(0, 0, "sales");
            createTable([headers, rows], document.querySelector(root), true);
        });
    }));

}