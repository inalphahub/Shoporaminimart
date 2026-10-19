if (typeof window.expandCatalog !== "function") document.write('<script src="js/catalog.js"><\/script>');
const App = {
  cart: JSON.parse(localStorage.getItem("shopora_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("shopora_wishlist") || "[]"),
  showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  },
  save() {
    localStorage.setItem("shopora_cart", JSON.stringify(this.cart));
    localStorage.setItem("shopora_wishlist", JSON.stringify(this.wishlist));
    this.updateCounts();
  },
  updateCounts() {
    const cartCount = document.getElementById("cartCount");
    const wishlistCount = document.getElementById("wishlistCount");
    const mobileCart = document.querySelector("#mobileCart b");
    const mobileWishlist = document.querySelector("#mobileWishlist b");
    const cartTotal = this.cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    if (cartCount) cartCount.textContent = cartTotal;
    if (wishlistCount) wishlistCount.textContent = this.wishlist.length;
    if (mobileCart) mobileCart.textContent = cartTotal;
    if (mobileWishlist) mobileWishlist.textContent = this.wishlist.length;
  },
  addToCart(id, name) {
    const existing = this.cart.find(item => item.id === id);
    if (existing) existing.qty += 1;
    else this.cart.push({id, name, qty: 1});
    this.save();
    this.showToast(`${name} added to cart`);
  },
  toggleWishlist(id, name) {
    const index = this.wishlist.indexOf(id);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast(`${name} removed from wishlist`);
    } else {
      this.wishlist.push(id);
      this.showToast(`${name} added to wishlist`);
    }
    this.save();
    document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`).forEach(btn => btn.classList.toggle("active", this.wishlist.includes(id)));
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("error", event => { const image = event.target; if (image?.tagName === "IMG" && !image.dataset.fallback) { image.dataset.fallback = "true"; image.src = `https://picsum.photos/seed/${encodeURIComponent(image.alt || "shoporaminimart")}/700/700`; } }, true);
  if (document.getElementById("productPage")) { ["product-related.js","product-specs.js"].forEach(file=>{const script=document.createElement("script");script.src=`js/${file}`;document.body.appendChild(script)}); }
  if (document.querySelector(".account-page")) { const script=document.createElement("script");script.src="js/account-cancelled.js";document.body.appendChild(script); }
  App.updateCounts();

  const announcement = document.getElementById("announcementBar");
  const closeAnnouncement = document.getElementById("announcementClose");
  closeAnnouncement?.addEventListener("click", () => announcement.remove());

  const messages = [
    "🎉 Free Shipping on Orders Above ₹999",
    "↩ Easy 7-Day Returns",
    "🔒 Secure Payments",
    "✨ Special Weekend Offers",
    "🎁 New Customers Get 10% Off"
  ];
  let messageIndex = 0;
  const messageEl = document.getElementById("announcementMessage");
  setInterval(() => {
    if (!document.body.contains(messageEl)) return;
    messageIndex = (messageIndex + 1) % messages.length;
    messageEl.style.opacity = "0";
    setTimeout(() => {
      messageEl.textContent = messages[messageIndex];
      messageEl.style.opacity = "1";
    }, 180);
  }, 3500);

  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", () => {
    backTop?.classList.toggle("show", window.scrollY > 500);
    document.getElementById("siteHeader")?.classList.toggle("scrolled", window.scrollY > 20);
  });
  backTop?.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, {threshold:.12});
  document.querySelectorAll(".section, .promo-section, .newsletter-section").forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
});
