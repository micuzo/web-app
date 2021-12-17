const dummyUser = {
    username: "bob@example.com",
    password: "123",
    name: "bob smith",
    address: "321 street nyc"

}
const storage = window.sessionStorage;

const clear = () => storage.clear();
const getItem = (item) => JSON.parse(storage.getItem(item));
const setItem = (key, val) => storage.setItem(key, JSON.stringify(val));

const getUser = () => JSON.parse(storage.getItem("user"));
const setUser = (user?) => storage.setItem("user", user ? JSON.stringify(user) : JSON.stringify(dummyUser));

const initCart = () => setItem("cart", []);
const getCart = () => getItem("cart");
const setCart = (newCart) => setItem("cart", newCart);
const addToCart = (book) => {
    const curCart = getCart();
    setCart([...curCart, book]);
}
const removeFromCart = (ISBN: number) => {
    const curCart = getCart();
    setCart(curCart.filter((book) => book.ISBN === ISBN));
}

const store = {
    clear,
    getUser,
    setUser,
    initCart,
    addToCart,
    removeFromCart,
    clearCart: initCart
}

