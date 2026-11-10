/* FOSS Commons: progressive enhancement, with no runtime dependencies. */
(() => {
  "use strict";
  document.documentElement.classList.add("js");

  const config = window.FOSS_COMMONS || {};
  const safeWebUrl = (value) => {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const url = new URL(value);
      return url.protocol === "https:" ? url.href : null;
    } catch { return null; }
  };

  const communityUrl = safeWebUrl(config.communityUrl);
  if (communityUrl) {
    document.querySelectorAll("[data-community-link]").forEach((link) => {
      link.href = communityUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.querySelector("[data-community-label]").textContent = config.communityLabel || "Join the commons";
    });
    document.querySelector("[data-community-note]").textContent = config.communityNote || "All levels of experience are welcome.";
  }
  const githubUrl = safeWebUrl(config.githubUrl);
  if (githubUrl) {
    document.querySelector("[data-github-link]").href = githubUrl;
    document.querySelector("[data-github-label]").textContent = config.githubLabel || "Find us on GitHub";
  }

  // Mobile navigation: keyboard-friendly, with Escape and outside-click dismissal.
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  const closeMenu = (returnFocus = false) => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    if (returnFocus) menuButton.focus();
  };
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
    navigation.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".site-header")) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu(true);
  });
  window.matchMedia("(min-width: 601px)").addEventListener("change", event => { if (event.matches) closeMenu(); });

  // Accessible tabs: click/tap, arrow keys, Home and End.
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  const selectTab = (selected, focus = false) => {
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
    });
    if (focus) selected.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
    });
  });
  if (tabs.length) selectTab(tabs[0]);

  // A native dialog supplies focus containment and Escape handling.
  const dialog = document.querySelector("#values-dialog");
  document.querySelectorAll("[data-open-values]").forEach((button) => {
    button.addEventListener("click", () => {
      dialog.showModal();
      document.body.classList.add("modal-open");
    });
  });
  dialog.querySelectorAll(".dialog-close, .dialog-done").forEach(button => button.addEventListener("click", () => dialog.close()));
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
  document.querySelector("#year").textContent = new Date().getFullYear();
})();
