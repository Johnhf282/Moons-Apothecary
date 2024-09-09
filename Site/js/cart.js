// cart.js

// Initialize the cart from localStorage or start with an empty array
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
    const cartCount = cart.length;
    const cartIcon = document.getElementById('view-cart');

    if (cartIcon) {
        if (cartCount > 0) {
            cartIcon.classList.add('cart-filled');
        } else {
            cartIcon.classList.remove('cart-filled');
        }
    }
}

// Event listener for DOMContentLoaded to attach event handlers
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const product = {
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                quantity: parseInt(button.dataset.quantity, 10),
            };
            addToCart(product);
        });
    });

    updateCartUI();
});
