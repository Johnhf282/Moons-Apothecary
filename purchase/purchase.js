// purchase.js

// Initialize cart from localStorage or start with an empty array
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add or update product in the cart
function addToCart(product) {
    let cart = getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === product.name);

    if (existingItemIndex > -1) {
        // Item exists, update quantity
        cart[existingItemIndex].quantity += product.quantity;
    } else {
        // Item doesn't exist, add it to the cart
        cart.push(product);
    }

    saveCart(cart);
    updateCartUI();
}

// Aggregate and calculate total cost of items in the cart
function aggregateCart(cart) {
    return cart.reduce((acc, item) => {
        if (acc[item.name]) {
            acc[item.name].quantity += item.quantity;
        } else {
            acc[item.name] = { ...item };
        }
        return acc;
    }, {});
}

// Calculate total cost of items in cart
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Update the cart UI
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = getCart();
    const aggregatedCart = aggregateCart(cart);
    const totalElement = document.getElementById('cart-total');

    // Clear current cart display
    cartItemsContainer.innerHTML = '';

    // Display aggregated cart items
    Object.values(aggregatedCart).forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="cart-item-details">
                <p class="item-name">${item.name}</p>
                <p class="item-price">Price: $${item.price.toFixed(2)}</p>
                <p class="item-quantity">Quantity: ${item.quantity}</p>
            </div>
            <p class="item-total">Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update total price
    totalElement.textContent = `$${calculateTotal(Object.values(aggregatedCart))}`;
}

// Event listener for DOMContentLoaded to attach event handlers
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI(); // Show cart items on load

    // Add event listener for Confirm Purchase button
    const confirmPurchaseButton = document.getElementById('confirm-purchase');
    if (confirmPurchaseButton) {
        confirmPurchaseButton.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length > 0) {
                // Handle the purchase process
                alert('Purchase confirmed!');
                
                // Clear the cart after purchase
                saveCart([]);
                updateCartUI();
            } else {
                alert('Your cart is empty.');
            }
        });
    }
});
