const products = [
    {
        id: 1,
        name: 'Nike Phantom GX Elite',
        price: 275,
        brand: 'Nike',
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ed02a76a-c35d-4bb7-93b8-e9b4c85803a0/PHANTOM+LUNA+II+ELITE+FG.png'
    },
    {
        id: 2,
        name: 'Adidas X Messi',
        price: 599,
        brand: 'Adidas',
        image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/695697f10f154c34825f5fc9c1a59f69_9366/Messi_F50_League_Firm-Multi-Ground_Boots_Gold_IG9274_HM1.jpg'
    },
    {
        id: 3,
        name: 'Puma Future Ultimate',
        price: 230,
        brand: 'Puma',
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107916/02/sv01/fnd/IND/fmt/png/FUTURE-7-ULTIMATE-FG/AG-Unisex-Football-Boots'
    },
    {
        id: 4,
        name: 'Nike Mercurial Vapor',
        price: 245,
        brand: 'Nike',
        image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/dd2cf418-491b-4726-9902-6aef07af8d8c/ZM+SUPERFLY+10+ELITE+KM+FG.png'
    },
    {
        id: 5,
        name: 'Adidas Predator Edge',
        price: 799,
        brand: 'Adidas',
        image: 'https://media.gq-magazine.co.uk/photos/65a52fa39c885038c71335a6/master/w_1600,c_limit/20231211_predator_Foto_Lukas_Schulze_0066.jpg'
    },
    {
        id: 6,
        name: 'Puma Ultra Ultimate',
        price: 220,
        brand: 'Puma',
        image: 'https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/107165/01/sv01/fnd/IND/fmt/png/FUTURE-ULTIMATE-FG/AG-Unisex-Soccer-Cleats'
    }
];

let cart = [];

// Initialize products
function initializeProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <p class="product-brand">${product.brand}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Quantity: ${item.quantity}</p>
                <p>$${item.price * item.quantity}</p>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Toggle cart
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = cartModal.style.display === 'block' ? 'none' : 'block';
}

// Toggle checkout form
function toggleCheckoutForm() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.style.display = checkoutModal.style.display === 'block' ? 'none' : 'block';
}

// Format card number with spaces
function formatCardNumber(input) {
    const value = input.value.replace(/\s/g, '').replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    input.value = formattedValue.substring(0, 19); // Limit to 16 digits + 3 spaces
}

// Format expiry date
function formatExpiryDate(input) {
    const value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        input.value = value.substring(0, 2) + '/' + value.substring(2, 4);
    } else {
        input.value = value;
    }
}

// Validate form
function validateCheckoutForm() {
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    const name = document.getElementById('card-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Simple validation
    if (cardNumber.length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Please enter a valid expiry date (MM/YY)');
        return false;
    }
    if (cvv.length !== 3) {
        alert('Please enter a valid 3-digit CVV');
        return false;
    }
    if (name.length < 3) {
        alert('Please enter the cardholder name');
        return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    if (address.length < 10) {
        alert('Please enter a complete shipping address');
        return false;
    }
    return true;
}

// Process checkout
function processCheckout(event) {
    event.preventDefault();
    
    if (validateCheckoutForm()) {
        alert('Payment successful! Thank you for your purchase.');
        cart = [];
        updateCartUI();
        toggleCheckoutForm();
        toggleCart();
    }
}

// Scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    toggleCheckoutForm();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeProducts();
    
    // Add event listeners for form formatting
    document.getElementById('card-number').addEventListener('input', function() {
        formatCardNumber(this);
    });
    
    document.getElementById('expiry').addEventListener('input', function() {
        formatExpiryDate(this);
    });
    
    document.getElementById('cvv').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').substring(0, 3);
    });
});