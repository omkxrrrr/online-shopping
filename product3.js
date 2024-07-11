document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.product-slider img');
    const prevSlide = document.getElementById('prev-slide');
    const nextSlide = document.getElementById('next-slide');

    function changeSlide(direction) {
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        updateSlide();
    }

    function updateSlide() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    prevSlide.addEventListener('click', () => changeSlide(-1));
    nextSlide.addEventListener('click', () => changeSlide(1));

    updateSlide();

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const product = products.find(p => p.id == productId);
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

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        }
    }

    document.querySelector('.add-to-cart').addEventListener('click', () => {
        addToCart(3);
    });

    updateCartCount();
});