// script.js
const products = [
    { id: 1, name: 'JavaScript Book', price: 29.99, category: 'Books' },
    { id: 2, name: 'Python Course', price: 49.99, category: 'Courses' },
    { id: 3, name: 'React Tutorial', price: 39.99, category: 'Courses' },
    { id: 4, name: 'Laptop Stand', price: 24.99, category: 'Accessories' },
    { id: 5, name: 'Mechanical Keyboard', price: 89.99, category: 'Hardware' },
    { id: 6, name: 'Mouse Pad', price: 12.99, category: 'Accessories' },
    { id: 7, name: 'USB-C Cable', price: 9.99, category: 'Accessories' },
    { id: 8, name: 'Deep Learning Book', price: 59.99, category: 'Books' },
    { id: 9, name: 'Web Development Bootcamp', price: 79.99, category: 'Courses' },
    { id: 10, name: 'SSD 1TB', price: 99.99, category: 'Hardware' },
    { id: 11, name: 'Monitor', price: 199.99, category: 'Hardware' },
    { id: 12, name: 'Docker Handbook', price: 34.99, category: 'Books' }
];

let cart = [];

function renderProducts() {
    const container = document.getElementById('productsGrid');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-category">${product.category}</div>
            <button class="product-btn" onclick="toggleCart(${product.id})">
                ${isInCart(product.id) ? 'Remove' : 'Add to Cart'}
            </button>
        </div>
    `).join('');
}

function isInCart(productId) {
    return cart.some(item => item.productId === productId);
}

function toggleCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        cart = cart.filter(item => item.productId !== productId);
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    renderProducts();
    renderCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        renderCart();
        renderProducts();
    }
}

function removeItem(productId) {
    cart = cart.filter(item => item.productId !== productId);
    renderCart();
    renderProducts();
}

function calculateDiscounts() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems >= 10) return 0.20;
    if (totalItems >= 5) return 0.15;
    if (totalItems >= 3) return 0.10;
    return 0;
}

function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountRate = calculateDiscounts();
    const discountAmount = subtotal * discountRate;
    const finalTotal = subtotal - discountAmount;
    
    // Update totals
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('discountAmount').textContent = `-${discountAmount.toFixed(2)} (${(discountRate*100).toFixed(0)}%)`;
    document.getElementById('finalTotal').textContent = `$${finalTotal.toFixed(2)}`;
    cartCount.textContent = cart.length;
    
    // Render cart items
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p style="text-align: center; color: #666;">Your cart is empty. Add products from the catalog above!</p>';
        return;
    }
    
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-row">
                <div class="item-name">${item.name}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="btn btn-primary" onclick="updateQuantity(${item.productId}, -1)">−</button>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantityManual(${item.productId}, this.value)">
                    <button class="btn btn-primary" onclick="updateQuantity(${item.productId}, 1)">+</button>
                </div>
                <div style="flex: 1; text-align: right;">
                    $${(item.price * item.quantity).toFixed(2)}
                </div>
                <button class="btn btn-danger" onclick="removeItem(${item.productId})">Remove</button>
            </div>
        </div>
    `).join('');
}

function updateQuantityManual(productId, newQty) {
    const qty = parseInt(newQty);
    if (qty >= 1) {
        const item = cart.find(item => item.productId === productId);
        if (item) {
            item.quantity = qty;
            renderCart();
            renderProducts();
        }
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const discount = calculateDiscounts();
    const summary = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
    
    alert(`✅ Checkout Successful!\n\nProducts:\n${summary}\n\nTotal Items: ${totalItems}\nDiscount: ${discount*100}%\nThank you for shopping!`);
    cart = [];
    renderCart();
    renderProducts();
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderCart();
});
