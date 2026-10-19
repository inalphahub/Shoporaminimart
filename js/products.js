let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("data/products.json");
    if (!response.ok) throw new Error("Unable to load product data");
    allProducts = await response.json();
    renderAllProductSections();
    setupProductInteractions();
    setupSearch();
  } catch (error) {
    console.error(error);
    document.querySelectorAll(".product-grid").forEach(grid => grid.innerHTML = '<div class="no-results">Product data could not be loaded. If you opened this file directly, run it through VS Code Live Server so fetch() can read products.json.</div>');
  }
});

function formatPrice(value){ return `₹${Number(value).toLocaleString("en-IN")}`; }

function productCard(product, rank = null, variant = "") {
  const wished = App.wishlist.includes(product.id);
  const badge = rank ? `#${rank}` : product.badge;
  return `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-badge">${badge || ""}</span>
        <button class="wishlist-btn ${wished ? "active" : ""}" data-id="${product.id}" aria-label="${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist">${wished ? "♥" : "♡"}</button>
      </div>
      <div class="product-content">
        <h3>${product.name}</h3>
        <div class="product-rating">${"★".repeat(Math.round(product.rating))}<span>${product.rating} (${product.reviewCount})</span></div>
        <div class="product-price">
          <strong>${formatPrice(product.price)}</strong>
          <del>${formatPrice(product.originalPrice)}</del>
          <span class="discount">${product.discount}% OFF</span>
        </div>
        ${variant === "best" ? `<p style="font-size:.7rem;margin:-5px 0 12px">${Number(product.soldCount).toLocaleString("en-IN")}+ sold</p>` : ""}
        <div class="product-actions">
          <button class="btn btn-primary add-cart" data-id="${product.id}">Add to Cart</button>
          <a class="btn btn-outline view-demo" data-id="${product.id}" href="product.html?id=${product.id}">View details</a>
        </div>
      </div>
    </article>`;
}

function renderProducts(selector, products, variant=""){
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = products.length ? products.map((p,i)=>productCard(p, variant==="best" ? i+1 : null, variant)).join("") : '<div class="no-results">No products found.</div>';
}

function renderAllProductSections(){
  renderProducts("#flashProducts", allProducts.filter(p=>p.flashDeal).slice(0,4));
  renderProducts("#featuredProducts", allProducts.filter(p=>p.featured).slice(0,8));
  renderProducts("#trendingProducts", allProducts.filter(p=>p.trending).slice(0,8));
  renderProducts("#newProducts", allProducts.filter(p=>p.newArrival).slice(0,4));
  renderProducts("#bestProducts", [...allProducts].filter(p=>p.bestSeller).sort((a,b)=>b.soldCount-a.soldCount).slice(0,4),"best");
}

function setupProductInteractions(){
  document.addEventListener("click", e => {
    const wish = e.target.closest(".wishlist-btn");
    const cart = e.target.closest(".add-cart");
    const view = e.target.closest(".view-demo");
    if (wish) {
      const id = Number(wish.dataset.id);
      const product = allProducts.find(p=>p.id===id);
      App.toggleWishlist(id, product?.name || "Product");
      wish.classList.toggle("active", App.wishlist.includes(id));
      wish.textContent = App.wishlist.includes(id) ? "♥" : "♡";
    }
    if (cart) {
      const id = Number(cart.dataset.id);
      const product = allProducts.find(p=>p.id===id);
      App.addToCart(id, product?.name || "Product");
      cart.classList.add("added");
      cart.textContent = "Added";
      setTimeout(()=>{cart.classList.remove("added");cart.textContent="Add to Cart"},1200);
    }
    if (view) {
      const product = allProducts.find(p=>p.id===Number(view.dataset.id));
      if (product) App.showToast(`${product.name} • ${formatPrice(product.price)}`);
    }
  });

  document.getElementById("shuffleTrending")?.addEventListener("click", () => {
    const picks = allProducts.filter(p=>p.trending).sort(()=>Math.random()-.5).slice(0,8);
    renderProducts("#trendingProducts", picks);
  });
}

function setupSearch(){
  const input = document.getElementById("searchInput");
  const suggestions = document.getElementById("searchSuggestions");
  const clear = document.getElementById("searchClear");
  const searchTerms = ["Laptop","Laptop Bag","Laptop Stand","Gaming Laptop","Laptop Accessories","Wireless Headphones","Smart Watch","Running Shoes","Coffee Maker","Skincare Set"];

  function update(){
    const q = input.value.trim().toLowerCase();
    clear.classList.toggle("hidden", !q);
    if (!q) { suggestions.classList.remove("show"); return; }
    const matches = searchTerms.filter(term=>term.toLowerCase().includes(q)).slice(0,5);
    const products = allProducts.filter(p=>p.name.toLowerCase().includes(q)).map(p=>p.name).slice(0,5);
    const combined = [...new Set([...products,...matches])].slice(0,6);
    suggestions.innerHTML = combined.length ? combined.map(s=>`<button type="button">${s}</button>`).join("") : `<div style="padding:10px;color:#6f7484;font-size:.8rem">No suggestions</div>`;
    suggestions.classList.add("show");
    suggestions.querySelectorAll("button").forEach(btn=>btn.addEventListener("click",()=>{input.value=btn.textContent; runSearch();}));
  }
  function runSearch(){
    const q=input.value.trim().toLowerCase();
    suggestions.classList.remove("show");
    if(!q) return;
    const results=allProducts.filter(p=>`${p.name} ${p.category}`.toLowerCase().includes(q));
    document.getElementById("featuredProducts").innerHTML=results.length ? results.map(p=>productCard(p)).join("") : '<div class="no-results">No matching products found.</div>';
    document.getElementById("featured")?.scrollIntoView({behavior:"smooth"});
    App.showToast(`${results.length} product${results.length===1?"":"s"} found for "${input.value}"`);
  }
  input.addEventListener("input",update);
  input.addEventListener("keydown",e=>{if(e.key==="Enter")runSearch(); if(e.key==="Escape")suggestions.classList.remove("show")});
  clear.addEventListener("click",()=>{input.value="";update();input.focus()});
  document.addEventListener("click",e=>{if(!e.target.closest(".search-wrap")) suggestions.classList.remove("show")});
}
