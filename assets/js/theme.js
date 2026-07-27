/**
 * Light/dark theme toggle. The initial theme is set synchronously by an
 * inline script in <head> (before CSS paints) to avoid a flash of the
 * wrong theme — this file only wires up the toggle button afterwards.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "site_theme";

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    document.querySelectorAll(".theme-toggle i").forEach((icon) => {
      icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
    });
  }

  function initThemeToggle() {
    setTheme(currentTheme()); // sync icon with whatever the anti-FOUC script already set
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        setTheme(currentTheme() === "dark" ? "light" : "dark");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", initThemeToggle);
})();
