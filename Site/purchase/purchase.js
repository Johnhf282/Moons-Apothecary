// purchase.js

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const productPrice = parseFloat(button.getAttribute('data-price'));
            const quantitySelect = document.getElementById('quantity');
            const quantity = parseInt(quantitySelect.value);

            if (!isNaN(quantity) && quantity > 0) {
                const cartItem = {
                    name: productName,
                    price: productPrice,
                    quantity: quantity
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));

                alert(`${quantity} ${productName}(s) added to cart.`);
            } else {
                alert('Please select a valid quantity.');
            }
        });
    });

    // Other cart-related functionalities...

});
