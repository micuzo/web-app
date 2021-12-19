window.onload = function () {
    var fetchAuthor = fetch("/api/report/per-author");
    var fetchGenre = fetch("/api/report/per-genre");
    Promise.all([fetchAuthor, fetchGenre])
        .then(function (res) { return Promise.all(res.map(function (res) { return res.json(); }))
        .then(function (data) {
        data.forEach(function (tableDataRaw, index) {
            var root = index === 0 ? "#author-report" : "#genre-report";
            var key = index === 0 ? "author" : "genre";
            var headers = tableDataRaw.map(function (el) { return el[key]; });
            var rows = tableDataRaw.map(function (el) { return "$".concat(el.sales); });
            rows.splice(0, 0, "sales");
            createTable([headers, rows], document.querySelector(root), true);
        });
    }); });
};
