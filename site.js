/* Digirella docs — shell behaviour: mobile nav, table-of-contents scrollspy,
   and the live demo control bar. Component behaviour lives in interactive.js. */

(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Mobile navigation ---------------------------------------------------- */

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-nav-toggle]");
    if (!t) return;
    var nav = $("#sidenav");
    var open = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", open ? "false" : "true");
    t.setAttribute("aria-expanded", open ? "false" : "true");
  });

  /* Table of contents scrollspy ------------------------------------------ */

  var links = $$(".toc a");
  if (links.length && "IntersectionObserver" in window) {
    var targets = links
      .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
      .filter(Boolean);

    var seen = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen[en.target.id] = en.isIntersecting; });
      var active = targets.filter(function (t) { return seen[t.id]; })[0];
      links.forEach(function (a) {
        a.setAttribute(
          "aria-current",
          active && a.getAttribute("href") === "#" + active.id ? "true" : "false"
        );
      });
    }, { rootMargin: "-68px 0px -70% 0px" });

    targets.forEach(function (t) { spy.observe(t); });
  }

})();
