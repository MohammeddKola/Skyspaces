// =====================
// Product Data
// =====================
const products = [
  { name: "Crew Air Freshener", price: "199", image: "images/Bathroom Cleaner.webp" },
  { name: "Crew Toilet Cleaner", price: "149", image: "images/Air Freshner.webp" },
  { name: "Crew Floor Cleaner", price: "299", image: "images/diversey Cleaning Chemicals.webp" },
  { name: "Crew Glass Cleaner", price: "179", image: "images/Household Cleaner.webp" },
  { name: "Liquid Hand Wash", price: "179", image: "images/Liquid Hand Wash.webp" },
  { name: "Taski Chemicals", price: "179", image: "images/Taski Chemicals.webp" },
  { name: "Toilet Cleaner", price: "5", image: "images/Toilet Cleaner.webp" },
  { name: "Crew Room Cleaner", price: "65", image: "images/Crew Room Cleaner.webp" }
];

// =====================
// CART helpers
// =====================
function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}
function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.name === product.name);
  if (idx > -1) {
    cart[idx].qty += qty;
  } else {
    cart.push({ ...product, qty });
  }
  saveCart(cart);
  alert(`${product.name} added to cart`);
}
function clearCart() {
  localStorage.removeItem('cart');
}

// =====================
// Render Products
// =====================
function renderProducts(containerId, productArray) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  productArray.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.setAttribute('data-index', i);
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:8px">
        <button class="add-btn">Add to Cart</button>
        <button class="view-btn">View</button>
      </div>
    `;
    container.appendChild(div);

    // click handlers
    div.querySelector('.add-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(p, 1);
    });

    div.querySelector('.view-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(p);
    });

    // click whole card
    div.addEventListener('click', () => openModal(p));
  });
}

// =====================
// Modal logic
// =====================
let currentProduct = null;
const modal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalName = document.getElementById('modalName');
const modalPrice = document.getElementById('modalPrice');
const closeBtn = document.querySelectorAll('.close');

function openModal(product) {
  currentProduct = product;
  modalImage.src = product.image;
  modalName.textContent = product.name;
  modalPrice.textContent = `₹${product.price}`;
  modal.style.display = 'block';
}
function closeModal() {
  modal.style.display = 'none';
}
closeBtn.forEach(btn => btn && btn.addEventListener('click', closeModal));
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// Modal button actions
document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'addToCartBtn') {
    if (currentProduct) addToCart(currentProduct, 1);
    closeModal();
  }
  if (e.target && e.target.id === 'buyNowBtn') {
    if (currentProduct) {
      addToCart(currentProduct, 1);
      window.location.href = 'checkout.html'; // Go directly to checkout
    }
  }
});

// =====================
// Slider controls
// =====================
function attachSliderButtons(sliderId, leftBtnClass, rightBtnClass) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;
  const productCard = slider.querySelector(".product");
  const scrollAmount = productCard ? productCard.offsetWidth + 20 : 250;
  document.querySelector(leftBtnClass).addEventListener("click", () => {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
  document.querySelector(rightBtnClass).addEventListener("click", () => {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
}

// =====================
// Page-specific rendering
// =====================
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById("home-featured-slider")) {
    renderProducts("home-featured-slider", products);
    attachSliderButtons("home-featured-slider", ".home-left-btn", ".home-right-btn");
  }
  if (document.getElementById("products-featured-slider")) {
    renderProducts("products-featured-slider", products);
    attachSliderButtons("products-featured-slider", ".prod-left-btn", ".prod-right-btn");
  }
  if (document.getElementById("all-products")) {
    renderProducts("all-products", products);
    attachSliderButtons("all-products", ".prod-left-btns", ".prod-right-btns");
  }

});
// Buy Now button logic
document.getElementById("buyNowBtn").addEventListener("click", function () {
    // Redirect to checkout page with all cart items
    window.location.href = "checkout.html";
});
