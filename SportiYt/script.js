const products = [
  {
    name: "Yoga Mat",
    slug: "yoga-mat",
    category: "Fitness",
    price: "$19.99",
    tag: "-20%",
    image: "images/yoga_mat.png"
  },
  {
    name: "Basketball",
    slug: "basketball",
    category: "Basketball",
    price: "$29.99",
    tag: "Bestseller",
    image: "images/wearings.png"
  },
  {
    name: "Football Shoes",
    slug: "football-shoes",
    category: "Football",
    price: "$49.99",
    tag: "New",
    image: "images/football_shoes.png"
  },
  {
    name: "Men's Running Shorts",
    slug: "mens-running-shorts",
    category: "Men",
    price: "$15.99",
    tag: "New",
    image: "images/fitness gear.png"
  },
  {
    name: "Tennis Racket",
    slug: "tennis-racket",
    category: "Tennis",
    price: "$59.99",
    tag: "Hot",
    image: "images/tennis_racket.png"
  },
  {
    name: "Water Bottle",
    slug: "water-bottle",
    category: "Accessories",
    price: "$9.99",
    tag: "Popular",
    image: "images/watter_bottle.png"
  },
  {
    name: "Basic Jersey",
    slug: "jersey",
    category: "Men",
    price: "$24.99",
    tag: "Trending",
    image: "images/basic_jersey.png"
  }
];


let modalOpenTriggeredByClick = false;

function renderProducts(filtered = products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card relative cursor-pointer";

    // Modal open only on card click (not button)
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

    // Prevent modal from opening when clicking the button
    const btn = card.querySelector(".add-to-cart-btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // 🚫 stop modal from opening
      addToCart(product);
    });

    grid.appendChild(card);
  });
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  renderProducts(filtered);
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



// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const countSpan = document.getElementById("cartCount");
  if (countSpan) {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    countSpan.textContent = `(${totalCount})`;
  }
}

function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slider .slide');

function showNextSlide() {
  // Remove active + reset animations
  slides[currentSlide].classList.remove('active');
  const texts = slides[currentSlide].querySelectorAll('.fade-in');
  texts.forEach(el => el.style.animation = 'none'); // Reset animation

  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');

  // Trigger animation after short delay
  const newTexts = slides[currentSlide].querySelectorAll('.fade-in');
  newTexts.forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight; // Trigger reflow
    el.style.animation = '';
  });
}

setInterval(showNextSlide, 5000);


function renderScrollingProducts() {
  const track = document.querySelector(".product-track");
  if (!track) return;

  // Add two rows (for looping)
  const fullRow = products.map(product => `
    <a href="product.html?id=${product.slug}" class="product-item">
      <img src="${product.image}" alt="${product.name}" />
      <h4 class="product-name">${product.name}</h4>
      <p class="product-price">${product.price}</p>
    </a>
  `).join("");

  // Set innerHTML with duplicated row
  track.innerHTML = fullRow + fullRow;
}



document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeIcon.classList.toggle("fa-moon", !isDark);
    themeIcon.classList.toggle("fa-sun", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // Sidebar toggle
  const sidebar = document.getElementById("mobileSidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const closeBtn = document.getElementById("closeSidebar");

toggleBtn?.addEventListener("click", () => {
  sidebar.classList.remove("-translate-x-full");
  sidebar.classList.add("translate-x-0");
});

closeBtn?.addEventListener("click", () => {
  sidebar.classList.remove("translate-x-0");
  sidebar.classList.add("-translate-x-full");
});


  // Initial UI
  renderProducts();
  updateCartCount();
  renderScrollingProducts();
});
