var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var dummyUser = {
    email: "bob@example.com",
    name: "bob smith",
    address: "321 street nyc"
};
var storage = window.sessionStorage;
var clear = function () { return storage.clear(); };
var getItem = function (item) { return JSON.parse(storage.getItem(item)); };
var setItem = function (key, val) { return storage.setItem(key, JSON.stringify(val)); };
var getUser = function () { return JSON.parse(storage.getItem("user")); };
var setUser = function (user) { return storage.setItem("user", user ? JSON.stringify(user) : JSON.stringify(dummyUser)); };
var initCart = function () { return setItem("cart", []); };
var getCart = function () { return getItem("cart"); };
var setCart = function (newCart) { return setItem("cart", newCart); };
var addToCart = function (book) {
    var curCart = getCart();
    setCart(__spreadArray(__spreadArray([], curCart, true), [book], false));
};
var removeFromCart = function (ISBN) {
    var curCart = getCart();
    var firstOccurenceIndex = curCart.findIndex(function (item) { return item.ISBN === ISBN; });
    curCart.splice(firstOccurenceIndex, 1);
    setCart(curCart);
};
var store = {
    clear: clear,
    getUser: getUser,
    setUser: setUser,
    initCart: initCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    clearCart: initCart
};
