document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".has-dropdown, .has-mega");
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  dropdowns.forEach(item => {
    const trigger = item.querySelector("button");
    trigger?.addEventListener("click", e => {
      e.stopPropagation();
      const wasOpen = item.classList.contains("open");
      dropdowns.forEach(d => d.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
      trigger.setAttribute("aria-expanded", String(!wasOpen));
    });
  });

  document.addEventListener("click", e => {
    if (!e.target.closest(".has-dropdown,.has-mega")) {
      dropdowns.forEach(d => {
        d.classList.remove("open");
        d.querySelector("button")?.setAttribute("aria-expanded","false");
      });
    }
    if (!e.target.closest(".account-button,.account-menu")) {
      document.getElementById("accountMenu")?.classList.remove("open");
      document.getElementById("accountButton")?.setAttribute("aria-expanded","false");
    }
  });

  mobileBtn?.addEventListener("click", e => {
    e.stopPropagation();
    const open = mobileMenu.classList.toggle("open");
    mobileBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  document.querySelectorAll(".mobile-accordion").forEach(button => {
    button.addEventListener("click", () => {
      const submenu = button.nextElementSibling;
      const open = submenu.classList.toggle("open");
      button.querySelector("span").textContent = open ? "−" : "+";
    });
  });

  document.querySelectorAll("#mobileMenu a").forEach(link => link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    mobileBtn?.setAttribute("aria-expanded","false");
    document.body.classList.remove("menu-open");
  }));

  document.getElementById("mobileSearchLink")?.addEventListener("click", () => {
    document.getElementById("searchInput")?.focus();
  });

  document.getElementById("accountButton")?.addEventListener("click", e => {
    e.stopPropagation();
    const menu = document.getElementById("accountMenu");
    const open = menu.classList.toggle("open");
    document.getElementById("accountButton").setAttribute("aria-expanded", String(open));
  });

  const loggedIn = localStorage.getItem("shopora_logged_in") === "true";
  const savedUser = JSON.parse(localStorage.getItem("shopora_user") || "{}");
  const accountUserName = document.getElementById("accountUserName");
  if (accountUserName && savedUser.name) accountUserName.textContent = `Hi, ${savedUser.name}`;
  document.getElementById("loggedOutMenu")?.classList.toggle("hidden", loggedIn);
  document.getElementById("loggedInMenu")?.classList.toggle("hidden", !loggedIn);
  document.getElementById("logoutButton")?.addEventListener("click", () => {
    localStorage.removeItem("shopora_logged_in");
    document.getElementById("loggedOutMenu")?.classList.remove("hidden");
    document.getElementById("loggedInMenu")?.classList.add("hidden");
    App.showToast("You have been logged out");
  });

  document.getElementById("wishlistNav")?.addEventListener("click", () => document.getElementById("featured")?.scrollIntoView({behavior:"smooth"}));
  document.getElementById("cartNav")?.addEventListener("click", () => document.getElementById("flash-deals")?.scrollIntoView({behavior:"smooth"}));
});
