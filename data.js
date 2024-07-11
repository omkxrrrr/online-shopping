const products = {
    Electronics: [
        { id: 1, name: 'Samsung F54 5G', price: '₹22,849', image: 'https://m.media-amazon.com/images/I/81cjnxL6jbL._SX679_.jpg', url: 'product1.html' },
        { id: 2, name: 'Apple iPhone 15', price: '₹71,290', image: 'https://m.media-amazon.com/images/I/71d7rfSl0wL._SX1679_.jpg', url: 'product2.html' },
        { id: 3, name: 'OnePlus 9', price: '₹24,999', image: 'https://m.media-amazon.com/images/I/61HrWjOTJiL._SX679_.jpg', url: 'product3.html' },
        { id: 4, name: 'Samsung M32', price: '₹15,499', image: 'https://m.media-amazon.com/images/I/81Jov18YvpL._SX679_.jpg', url: 'product4.html' }
    ],
    Clothing: [
        { id: 5, name: 'T-Shirt', price: '₹499', image: 'https://via.placeholder.com/150', url: 'product5.html' }
    ],
    'Home Appliances': [
        { id: 6, name: 'Air Conditioner', price: '₹29,999', image: 'https://via.placeholder.com/150', url: 'product6.html' }
    ]
};

const categories = [
    { id: 1, name: 'Electronics', image: 'https://via.placeholder.com/150', url: 'cate-electronics.html' },
    { id: 2, name: 'Clothing', image: 'https://via.placeholder.com/150', url: 'cate-clothing.html' },
    { id: 3, name: 'Home Appliances', image: 'https://via.placeholder.com/150', url: 'cate-home-appliances.html' }
];

const suggestions = [
    { id: 7, name: 'Bluetooth Speaker', price: '₹1,999', image: 'https://via.placeholder.com/150', url: 'product7.html' },
    { id: 8, name: 'Wrist Watch', price: '₹2,499', image: 'https://via.placeholder.com/150', url: 'product8.html' },
    { id: 9, name: 'Sunglasses', price: '₹999', image: 'https://via.placeholder.com/150', url: 'product9.html' },
    { id: 10, name: 'Backpack', price: '₹1,499', image: 'https://via.placeholder.com/150', url: 'product10.html' }
];

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the product by productId in all categories
    const allProducts = Object.values(products).flat();
    const product = allProducts.find(p => p.id == productId);

    if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
    }

    // Check if the product is already in the cart
    let cartItem = cart.find(item => item.id == productId);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count displayed in the UI
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function loadSuggestions() {
    const container = document.getElementById('suggestion-container');
    container.innerHTML = ''; // Clear previous suggestions

    // Load all suggestions by default
    suggestions.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });

    // Add event listeners to "Add to Cart" buttons in suggestions
    addAddToCartListeners();
}

function loadProducts(categoryName = null) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Clear previous products

    // Determine which products to load based on categoryName
    let categoryProducts = [];
    if (categoryName) {
        categoryProducts = products[categoryName] || [];
    } else {
        // Load all products if no category is specified
        categoryProducts = Object.values(products).flat();
    }

    // Display message if no products found
    if (categoryProducts.length === 0) {
        container.innerHTML = '<p>No products available in this category.</p>';
        return;
    }

    // Render each product in the container
    categoryProducts.forEach(product => {
        const productElement = createProductElement(product);
        container.appendChild(productElement);
    });

    // Add event listeners to "Add to Cart" buttons in products
    addAddToCartListeners();
}

function createProductElement(product) {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.setAttribute('data-id', product.id);
    productElement.innerHTML = `
        <a href="${product.url}" class="product-link">
        <img src="${product.image}" alt="${product.name}">
        <div>
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
        </div></a>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    return productElement;
}

function addAddToCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    function loadCategories() {
        const dropdown = document.getElementById('categories-container');
        dropdown.innerHTML = ''; // Clear previous categories

        categories.forEach(category => {
            const categoryElement = document.createElement('a');
            categoryElement.href = category.url;
            categoryElement.textContent = category.name;
            dropdown.appendChild(categoryElement);
        });
    }

    const categoriesButton = document.getElementById('categories-btn');
    const categoriesContainer = document.getElementById('categories-container');
    categoriesButton.addEventListener('click', () => {
        if (categoriesContainer.style.display === 'none' || categoriesContainer.style.display === '') {
            categoriesContainer.style.display = 'block';
        } else {
            categoriesContainer.style.display = 'none';
        }
    });

    loadCategories();
    updateCartCount();
    loadSuggestions();
});
