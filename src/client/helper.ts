interface Book{
    ISBN: number,
    publisherEmail: string,
    name: string,
    author: string,
    genre: string,
    numberPages: number,
    price: number
}

const dummyBooks: Book[] = [
    {
        ISBN: 0,
        publisherEmail: "kest@example.com",
        author: "Suzanne Collins",
        genre: "Romance",
        name: "The Hunger Games",
        numberPages: 374,
        price: 22
    },
    {
        ISBN: 1,
        publisherEmail: "dfef@example.com",
        author: "George Lucas",
        genre: "Fantasy",
        name: "Star Wars",
        numberPages: 872,
        price: 33
    },
    {
        ISBN: 2,
        publisherEmail: "alexa@example.com",
        author: "Agatha Christie",
        genre: "Detective",
        name: "And then they were none",
        numberPages: 502,
        price: 89
    },
    {
        ISBN: 3,
        publisherEmail: "MRBOOKS@example.com",
        author: "Stephen Hawking",
        genre: "Educational",
        name: "A brief history of time",
        numberPages: 489,
        price: 103
    },
    {
        ISBN: 4,
        publisherEmail: "redhot@example.com",
        author: "Andy Weir",
        genre: "Sci-fi",
        name: "The Martian",
        numberPages: 450,
        price: 15
    }
]

const logout = () => {
    if (!confirm("Are you sure you want to log out?") || !store.getUser()) return;
    store.clear();
    window.location.href = "/";
}
