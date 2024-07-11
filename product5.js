document.addEventListener('DOMContentLoaded', () => {
    
    // Update cart count
    updateCartCount();

    // Load product details
    loadProductDetails(5);

    // Initialize the product slider
    initializeSlider();
});

function loadProductDetails(productId) {
    // Find the product with the given ID
    const product = products.Clothing.find(p => p.id === productId);

    if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
    }

    // Populate product details in the HTML
    document.querySelector('.product-slider img').src = product.image;
    document.querySelector('.product-info h2').textContent = product.name;
    document.querySelector('.product-info h5').textContent = product.description || 'No description available.';
}

// Slider functionality
function initializeSlider() {
    const slides = document.querySelectorAll('.product-slider img');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    });

    // Initially show the first slide
    showSlide(currentSlide);
}
