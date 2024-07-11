document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('products-container');
    const categoryName = 'Electronics'; // Specify the category name here

    // Function to load products based on category name
    function loadProducts(categoryName) {
        container.innerHTML = ''; // Clear previous products

        const categoryProducts = products[categoryName];
        if (!categoryProducts || categoryProducts.length === 0) {
            container.innerHTML = '<p>No products available in this category.</p>';
            return;
        }

        categoryProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.setAttribute('data-id', product.id);
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <a href="${product.url}">
                        <h3>${product.name}</h3>
                    </a>
                    <p>Price: ${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            container.appendChild(productElement);
        });

        // Add event listeners to Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                addToCart(productId);
            });
        });
    }

    // Function to add item to cart
    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const allProducts = Object.values(products).flat();
        const product = allProducts.find(p => p.id == productId);
        if (!product) {
            console.error(`Product with ID ${productId} not found.`);
            return;
        }

        let cartItem = cart.find(item => item.id == productId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    // Function to update cart count
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    // Function to load categories into dropdown
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

    // Load categories and products when DOM content is loaded
    loadCategories();
    loadProducts(categoryName);
    updateCartCount();
});
