interface Book{
    ISBN: number,
    publisher: string,
    title: string,
    author: string,
    genre: string,
    pages: number,
    price: number,
    quantity: number
}

interface User{
    email: string,
    password?: string,
    name: string,
    address: string
}

const getBookTable = (books: Book[]) => {
    const headers = Object.keys(books[0]);
    const data = books.map((book) => Object.values(book));
    return [headers, ...data];
}

const logout = () => {
    if (!confirm("Are you sure you want to log out?") || !store.getUser()) return;
    store.clear();
    window.location.href = "/";
}

const post = (url, data) => (
    fetch(url, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
);
