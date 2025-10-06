
const API_URL = "https://api.futureplayground.se/products";

const productsList = document.getElementById
("products-list");


const getProducts = async () => {

    const response = await fetch(API_URL);

    const parsedData = await response.json();

    return parsedData;
};

const displayProducts = async () => {
    const products = await getProducts();

    for (const product of products) {

        const name = product.name;

        const image = product.options.primary_options[0]?.image;

        const description = product.description;

        const price = product.price;

        const productDiv = document.createElement("div");

        productDiv.classList.add("product-item");

        const productImg = document.createElement("img");
        productImg.src = image;
        productImg.alt = `Image of the product ${name}`;

        const productTitle = document.createElement("h3");
        productTitle.textContent = name;

        const productPrice = document.createElement("p");
        productPrice.textContent = price;

        const productDescription = document.createElement("p");
        productDescription.textContent = description;

        productDiv.appendChild(productImg);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productDescription);

        productsList.appendChild(productDiv);

    }
};

displayProducts()

