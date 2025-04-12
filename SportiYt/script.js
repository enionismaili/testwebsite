const products = [
    { name: "Football Shoes", category: "Football", price: "$49.99", tag: "New", image: "images/football_shoes.png" },
    { name: "Yoga Mat", category: "Fitness", price: "$19.99", tag: "-20%", image: "images/yoga_mat.png" },
    { name: "Basketball", category: "Basketball", price: "$29.99", tag: "Bestseller", image: "images/wearings.png" },
    { name: "Tennis Racket", category: "Tennis", price: "$59.99", tag: "Hot", image: "images/tennis_racket.png" },
    { name: "Men's Running Shorts", category: "Men", price: "$15.99", tag: "", image: "images/fitness gear.png" },
    { name: "Different Balls", category: "Women", price: "$22.99", tag: "New", image: "images/team sports.png" },
  ];
  
  function renderProducts(filter = null) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";
    const filtered = filter ? products.filter(p => p.category === filter) : products;
    
    filtered.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        ${product.tag ? `<span class='product-tag'>${product.tag}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" class="mb-3 w-full rounded" />
        <h4 class="font-semibold">${product.name}</h4>
        <p class="text-sm text-gray-600 mb-1">${product.price}</p>
        <button class="bg-indigo-600 text-white px-4 py-1 rounded mt-2">Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  }
  
  function filterCategory(category, el) {
    document.querySelectorAll("aside li").forEach(li => li.classList.remove("sidebar-active"));
    el.classList.add("sidebar-active");
    renderProducts(category);
  }
  
  window.onload = () => renderProducts();