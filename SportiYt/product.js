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
  
  const slug = new URLSearchParams(location.search).get("id");
  const product = products.find(p => p.slug === slug);
  const container = document.getElementById("productContainer");
  
  if (!product) {
    container.innerHTML = `<div class="text-red-500 text-xl font-semibold">Product not found.</div>`;
  } else {
    container.innerHTML = `
      <div class="flex flex-col md:flex-row gap-8 bg-white p-6 rounded shadow">
        <img src="${product.image}" alt="${product.name}" class="w-full md:w-1/2 rounded-lg object-cover" />
        <div class="flex flex-col justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">${product.name}</h1>
            <span class="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full mb-2">${product.tag}</span>
            <p class="text-lg text-indigo-600 font-semibold mb-4">${product.price}</p>
            <p class="text-gray-700 text-sm mb-6">This is a premium ${product.category.toLowerCase()} product designed for both performance and comfort.</p>
          </div>
          <button onclick="addToCart()" class="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  }
  
  function addToCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === product.name);
  
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart.`);
  }
  