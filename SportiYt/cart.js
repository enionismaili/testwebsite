let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const countSpan = document.getElementById("cartCount");
  if (countSpan) {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    countSpan.textContent = `(${totalCount})`;
  }
}

function renderCart() {
  const container = document.getElementById("cartContainer");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cartTotal").textContent = "";
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="flex items-center justify-between border-b py-4">
      <div class="flex items-center gap-4">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-contain rounded" />
        <div>
          <h4 class="font-semibold">${item.name}</h4>
          <p class="text-sm text-gray-500 flex items-center gap-2">
            <button onclick="decreaseQuantity('${item.name}')" class="bg-gray-200 px-2 rounded hover:bg-gray-300">−</button>
            ${item.quantity}
            <button onclick="increaseQuantity('${item.name}')" class="bg-gray-200 px-2 rounded hover:bg-gray-300">+</button>
          </p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <p class="text-indigo-600 font-medium">${item.price}</p>
        <button onclick="removeFromCart('${item.name}')" class="text-red-500 hover:underline text-sm">Remove</button>
      </div>
    </div>
  `).join("");

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + item.quantity * price;
  }, 0);

  document.getElementById("cartTotal").textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function checkout() {
  alert("Thank you for your purchase! This is a demo checkout.");
  clearCart();
}

function increaseQuantity(name) {
  const item = cart.find(p => p.name === name);
  if (item) item.quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function decreaseQuantity(name) {
  const item = cart.find(p => p.name === name);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(p => p.name !== name);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});
