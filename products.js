const products = [
    [
        { id: 1, name: 'Samsung F54 5G', price: '₹22,849', image: 'https://m.media-amazon.com/images/I/81cjnxL6jbL._SX679_.jpg', url: 'product1.html' },
        { id: 2, name: 'Apple Iphone 15', price: '₹71,290', image: 'https://m.media-amazon.com/images/I/71d7rfSl0wL._SX979_.jpg', url: 'product2.html' },
        { id: 3, name: 'OnePlus 9', price: '₹24,999', image: 'https://m.media-amazon.com/images/I/61HrWjOTJiL._SX679_.jpg', url: 'product3.html' },
        { id: 4, name: 'Samsung M32', price: '₹15,499', image: 'https://m.media-amazon.com/images/I/81Jov18YvpL._SX679_.jpg', url: 'product4.jpg' }
    ]
];

const categories = [
    {
        id: 1,
        name: 'Electronics',
        image: 'https://via.placeholder.com/150'    },
    {
        id: 2,
        name: 'Clothing',
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 3,
        name: 'Home Appliances',
        image: 'https://via.placeholder.com/150'
    }
    // Add more categories as needed
];

function loadCategories() {
    const dropdown = document.getElementById('categories-dropdown');
    categories.forEach(category => {
        const categoryElement = document.createElement('a');
        categoryElement.href = '#';
        categoryElement.textContent = category.name;
        dropdown.appendChild(categoryElement);
    });
}

loadCategories();