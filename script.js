/* ────────────────────────────────────────────────────────────────
   dark-mode-starter · script.js
   The toggle button. Three lines of state-changing logic.
   Persistence + initial read happens in the inline script in <head>.
   ──────────────────────────────────────────────────────────────── */

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});
