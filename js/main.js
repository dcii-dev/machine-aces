(function () {
  "use strict";

  /**
   * Wires the mobile menu button to the header nav.
   * @return {void}
   */
  function initNav() {
    const toggle = document.querySelector(".ma-header__toggle");
    const nav = document.getElementById("ma-nav");
    if (!toggle || !nav) {
      return;
    }
    const icon = toggle.querySelector(".material-symbols-outlined");

    /**
     * Opens or closes the menu and syncs the button state.
     * @param {boolean} open Whether the menu should be open.
     * @return {void}
     */
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (icon) {
        icon.textContent = open ? "close" : "menu";
      }
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /**
   * Writes the current year into the footer copyright.
   * @return {void}
   */
  function initYear() {
    const year = document.querySelector("[data-year]");
    if (year) {
      year.textContent = `${new Date().getFullYear()}`;
    }
  }

  /**
   * Starts every component on the page.
   * @return {void}
   */
  function initializeApp() {
    initNav();
    initYear();
  }

  if (document.readyState === "complete") {
    initializeApp();
  } else {
    window.addEventListener("load", initializeApp, { once: true });
  }
})();
