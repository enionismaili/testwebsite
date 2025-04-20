const products = [
  { name: "Yoga Mat", slug: "yoga-mat", category: "Fitness", price: "$19.99", tag: "-20%", image: "images/yoga_mat.png" },
  { name: "Basketball", slug: "basketball", category: "Basketball", price: "$29.99", tag: "Bestseller", image: "images/wearings.png" },
  { name: "Football Shoes", slug: "football-shoes", category: "Football", price: "$49.99", tag: "New", image: "images/football_shoes.png" },
  { name: "Men's Running Shorts", slug: "mens-running-shorts", category: "Men", price: "$15.99", tag: "New", image: "images/fitness gear.png" },
  { name: "Tennis Racket", slug: "tennis-racket", category: "Tennis", price: "$59.99", tag: "Hot", image: "images/tennis_racket.png" },
  { name: "Water Bottle", slug: "water-bottle", category: "Accessories", price: "$9.99", tag: "Popular", image: "images/watter_bottle.png" },
  { name: "Basic Jersey", slug: "jersey", category: "Men", price: "$24.99", tag: "Trending", image: "images/basic_jersey.png" }
];

let modalOpenTriggeredByClick = false;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentSlide = 0;

function renderProducts(filtered = products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card relative cursor-pointer";
    card.addEventListener("click", () => {
      modalOpenTriggeredByClick = true;
      openModal(product);
      modalOpenTriggeredByClick = false;
    });
    card.innerHTML = `
      <span class="tag">${product.tag}</span>
      <img src="${product.image}" alt="${product.name}" />
      <h4 class="font-semibold">${product.name}</h4>
      <p class="text-indigo-600">${product.price}</p>
      <button class="add-to-cart-btn mt-2 px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
        Add to Cart
      </button>
    `;
    card.querySelector(".add-to-cart-btn").addEventListener("click", e => {
      e.stopPropagation();
      addToCart(product);
    });
    grid.appendChild(card);
  });
}

function openModal(product) {
  if (!modalOpenTriggeredByClick) return;
  const modal = document.getElementById("productModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalPrice").textContent = product.price;
  document.getElementById("modalDescription").textContent = `This is a great ${product.category} product.`;
}

function closeModal() {
  const modal = document.getElementById("productModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function updateCartCount() {
  const span = document.getElementById("cartCount");
  const total = cart.reduce((acc, item) => acc + item.quantity, 0);
  span.textContent = `(${total})`;
}

function addToCart(product) {
  const existing = cart.find(i => i.name === product.name);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function showNextSlide() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  slides[currentSlide].classList.remove('active');
  slides[currentSlide].querySelectorAll('.fade-in').forEach(el => el.style.animation = 'none');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
  slides[currentSlide].querySelectorAll('.fade-in').forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = '';
  });
}

function renderScrollingProducts() {
  const track = document.querySelector(".product-track");
  if (!track) return;
  const full = products.map(p => `
    <a href="product.html?id=${p.slug}" class="product-item">
      <img src="${p.image}" alt="${p.name}" />
      <h4 class="product-name">${p.name}</h4>
      <p class="product-price">${p.price}</p>
    </a>
  `).join("");
  track.innerHTML = full + full;
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial UI
  renderProducts();
  updateCartCount();
  renderScrollingProducts();
  setInterval(showNextSlide, 5000);

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }
  themeToggle.addEventListener("click", () => {
    const dark = document.body.classList.toggle("dark");
    themeIcon.classList.replace(dark ? "fa-moon" : "fa-sun", dark ? "fa-sun" : "fa-moon");
    localStorage.setItem("theme", dark ? "dark" : "light");
  });

  
  const header = document.querySelector("header");
  const sidebar = document.getElementById("mobileSidebar");
  
  sidebar.style.top = `${header.getBoundingClientRect().height}px`;
  
  window.addEventListener("resize", () => {
    sidebar.style.top = `${header.getBoundingClientRect().height}px`;
  });

  document.getElementById("toggleSidebar").addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("translate-x-0");
  });
  
  document.getElementById("closeSidebar").addEventListener("click", () => {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("-translate-x-full");
  });
  
  

});
