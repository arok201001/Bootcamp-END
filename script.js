

// Fetch API Data
const API_URL = "https://api.futureplayground.se/products";

const productsList = document.getElementById
("products-list");

const cart = {};
const cartItemsList = document.getElementById("cart-items");
const cartTotal = document.getElementById("total-sum");

const getProducts = async () => {

    const response = await fetch(API_URL);

    const parsedData = await response.json();

    return parsedData;
};

// Shopping Cart

function updateCart() {
    cartItemsList.innerHTML = "";
    let totalPrice = 0;
    let totalItems = 0;

    for (const [name, item] of Object.entries(cart)) {
        const li = document.createElement("li");
        li.textContent = `${name} x ${item.quantity} - ${item.price * item.quantity}kr`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Ta bort";
        removeBtn.classList.add("remove-btn");
        removeBtn.style.marginleft = "10px";
        removeBtn.addEventListener("click", () => {
            delete cart[name];
            updateCart();
        })


        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);

        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
    }
        
    cartTotal.textContent = `Totalt: ${totalPrice}kr (${totalItems} Produkter)`;

    }
    


    // Display Product List from API
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
        
        // Add to Cart btn
        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Lägg till i kundvagn";
        addToCartBtn.classList.add("add-to-cart");
        addToCartBtn.addEventListener("click", () => {
            if (!cart[name]) {
                cart[name] = {price: price, quantity: 1};
            } else {
                cart[name].quantity++;
            }
            updateCart();
        console.log(`Added to cart: ${name}`);
        


    });

        productDiv.appendChild(productImg);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(addToCartBtn);

        productsList.appendChild(productDiv);

    }
};

displayProducts()


