var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var getBookTable = function (books) {
    var headers = Object.keys(books[0]);
    var data = books.map(function (book) { return Object.values(book); });
    return __spreadArray([headers], data, true);
};
var logout = function () {
    if (!confirm("Are you sure you want to log out?") || !store.getUser())
        return;
    store.clear();
    window.location.href = "/";
};
var post = function (url, data) { return (fetch(url, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
})); };
