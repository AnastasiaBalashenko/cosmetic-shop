const items = [{
        title: "Miss Dior",
        description: "Miss Dior was born of those Provençal evenings filled with fireflies when green jasmine serves as a counterpoint to the melody of the night and the earth.",
        price: 138,
        img: "./img/1.jpeg",
        rating: 4.4,
    },
    {
        title: "Kérastase Blond Absolu Bain Ultra-Violet",
        description: "Maintaining the cool shade of your blonde hair is easier than you might think!",
        price: 28,
        img: "./img/2.jpeg",
        rating: 3.1,
    },
    {
        title: "GUERLAIN KissKiss Bee Glow",
        description: "Looking for a fantastic lip-care product that gives you a touch of colour? GUERLAIN KissKiss Bee Glow KissKiss Bee Glow tinted lip balm can do it with the power of honey.",
        price: 25,
        img: "./img/3.jpeg",
        rating: 5.0,
    },
    {
        title: "Sol de Janeiro Brazilian Bum Bum Cream",
        description: "Effective treatments are the secret to Brazilian women’s beautiful and firm skin. Now you can try one out for yourself.",
        price: 47,
        img: "./img/4.jpeg",
        rating: 4.7,
    },
    {
        title: "Sol de Janeiro Rio Radiance",
        description: "Summer – a time when the sun shines, the waves crash, and adventure calls. But don’t forget one thing: suntan care!",
        price: 40,
        img: "./img/5.jpeg",
        rating: 4.9,
    },
    {
        title: "Dior Addict Lip Glow Oil",
        description: "This nourishing glossy lip oil enhances, intensifies and protects the lips, providing long-lasting wear that brings out their natural colour.",
        price: 32,
        img: "./img/6.jpeg",
        rating: 3.2,
    },
    {
        title: "LAMEL Insta BB Blush",
        description: "Experience the refreshing and rejuvenating effects of this lightweight cream blush.",
        price: 6,
        img: "./img/7.jpeg",
        rating: 3,
    },
    {
        title: "Maybelline Lash Sensational Sky High",
        description: "For lashes that rise to the heavens from every conceivable angle, just use the Maybelline Lash Sensational Sky High waterproof mascara.",
        price: 9,
        img: "./img/8.jpeg",
        rating: 3.4,
    },
    {
        title: "Maybelline Instant Perfector 4-in-1",
        description: "You don't want to waste time with a lengthy makeup routine, but you have the feeling that your skin needs primer, concealer, BB cream and powder? The 4-in-1 Maybelline Instant Age Rewind Perfector 4-IN-1 mattifying foundation brings you the benefits of all these products!",
        price: 11,
        img: "./img/9.jpeg",
        rating: 4.8,
    },
    {
        title: "Moroccanoil Treatment",
        description: "Discover your best hair day yet with a true icon in hair treatment. Moroccanoil Treatment Original is enriched with antioxidant-rich argan oil and shine-boosting vitamins to hydrate, smooth, and improve the manageability of all hair types.",
        price: 25,
        img: "./img/10.jpeg",
        rating: 3.2,
    },
    {
        title: "Sol de Janeiro Brazilian Joia Conditioner",
        description: "The Sol de Janeiro Brazilian Joia™ Conditioner to smooth and restore damaged hair is not heavy and leaves your hair silky and soft to the touch.",
        price: 11,
        img: "./img/11.jpeg",
        rating: 3.7,
    },
    {
        title: "NYX Professional Makeup Pore Filler",
        description: "A perfectly smooth surface is essential for perfect, long-lasting makeup.",
        price: 14,
        img: "./img/12.jpeg",
        rating: 4.1,
    },
];


let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {

    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";

    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Unfortunately, nothing was found 🥲";
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }

    if (a.title < b.title) {
        return -1;
    }

    return 0;
}


renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));


function prepareShopItem(shopItem) {

    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price} $`;

    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    return item;
}

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

function applySearch() {

    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));

    renderItems(currentState);
    sortControl.selectedIndex = 0;

}

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {

    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);

});