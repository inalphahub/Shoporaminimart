document.addEventListener("DOMContentLoaded", () => {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dotsWrap = document.getElementById("heroDots");
  const prev = document.getElementById("heroPrev");
  const next = document.getElementById("heroNext");
  const pause = document.getElementById("heroPause");
  if (!slides.length) return;
  let index = 0, paused = false, timer;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", `Go to slide ${i+1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function render() {
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
  }
  function goTo(i) { index = (i + slides.length) % slides.length; render(); restart(); }
  function restart() { clearInterval(timer); if (!paused) timer = setInterval(() => goTo(index + 1), 5000); }
  prev.addEventListener("click", () => goTo(index - 1));
  next.addEventListener("click", () => goTo(index + 1));
  pause.addEventListener("click", () => {
    paused = !paused; pause.textContent = paused ? "▶" : "Ⅱ";
    if (paused) clearInterval(timer); else restart();
  });
  document.querySelector(".hero")?.addEventListener("mouseenter", () => clearInterval(timer));
  document.querySelector(".hero")?.addEventListener("mouseleave", restart);

  let touchStart = 0;
  document.querySelector(".hero")?.addEventListener("touchstart", e => touchStart = e.changedTouches[0].screenX, {passive:true});
  document.querySelector(".hero")?.addEventListener("touchend", e => {
    const distance = e.changedTouches[0].screenX - touchStart;
    if (Math.abs(distance) > 50) goTo(index + (distance < 0 ? 1 : -1));
  }, {passive:true});
  render(); restart();
});
