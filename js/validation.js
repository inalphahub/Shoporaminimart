document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("newsletterForm");
  const input = document.getElementById("emailInput");
  const message = document.getElementById("newsletterMessage");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    message.classList.remove("success");
    if (!email) {
      message.textContent = "Please enter your email address.";
      return;
    }
    if (!valid) {
      message.textContent = "Please enter a valid email address.";
      return;
    }
    message.textContent = "✓ You're subscribed! Watch your inbox for Shopora Mini Mart updates.";
    message.classList.add("success");
    input.value = "";
  });
});
