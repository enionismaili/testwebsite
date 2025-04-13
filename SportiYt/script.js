const products = [
  { name: "Football Shoes", category: "Football", price: "$49.99", tag: "New", image: "images/football_shoes.png" },
  { name: "Yoga Mat", category: "Fitness", price: "$19.99", tag: "-20%", image: "images/yoga_mat.png" },
  { name: "Basketball", category: "Basketball", price: "$29.99", tag: "Bestseller", image: "images/wearings.png" },
  { name: "Tennis Racket", category: "Tennis", price: "$59.99", tag: "Hot", image: "images/tennis_racket.png" },
  { name: "Men's Running Shorts", category: "Men", price: "$15.99", tag: "New", image: "images/fitness gear.png" }
];

let modalOpenTriggeredByClick = false;

function renderProducts(filtered = products) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card relative cursor-pointer";
    card.onclick = () => {
      modalOpenTriggeredByClick = true;
      openModal(product);
      modalOpenTriggeredByClick = false;
    };
    card.innerHTML = `
    <span class="tag">${product.tag}</span>
    <img src="${product.image}" alt="${product.name}" />
    <h4 class="font-semibold">${product.name}</h4>
    <p class="text-indigo-600">${product.price}</p>
    <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
  `;

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

// Dark mode toggle
const toggleBtn = document.getElementById("themeToggle");
toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "Light" : "Dark";
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const countSpan = document.getElementById("cartCount");
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  countSpan.textContent = `(${totalCount})`;
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


// Initial render
renderProducts();
updateCartCount(); // show cart count when page loads
