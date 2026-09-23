/* ==========================================================================
   Digirella — interactive runtime
   Vanilla, no dependencies, no build step. Event-delegated, so markup added
   after load works without re-initialising.

   Every behaviour is driven by a data-attribute on the markup:
     data-tabs / data-tab / data-panel      view switching
     data-acc                               accordion
     data-open="dialogId"                   open a dialog or drawer
     data-close                             close nearest overlay
     data-pop                               popover / menu / listbox trigger
     data-seg                               segmented control
     data-pager                             pagination
     data-stepper                           quantity stepper
     data-rating-input                      star input
     data-sort-table                        sortable table
     data-toast='{"title":"…"}'             fire a toast
     data-dismiss                           remove nearest alert
     data-counter                           textarea character count
   ========================================================================== */

(function () {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ---------------------------------------------------------------------
     Tabs
     --------------------------------------------------------------------- */

  function selectTab(group, value) {
    $$('[data-tab]', group).forEach((t) => {
      const on = t.dataset.tab === value;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    $$("[data-panel]", group).forEach((p) => {
      p.hidden = p.dataset.panel !== value;
    });
  }

  document.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-tab]");
    if (!tab) return;
    const group = tab.closest("[data-tabs]");
    if (!group) return;
    selectTab(group, tab.dataset.tab);
  });

  // Left/right arrow navigation, the expected keyboard model for tabs.
  document.addEventListener("keydown", (e) => {
    const tab = e.target.closest("[data-tab]");
    if (!tab || !["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    const group = tab.closest("[data-tabs]");
    const tabs = $$("[data-tab]", group);
    const i = tabs.indexOf(tab);
    let next =
      e.key === "ArrowRight" ? i + 1 :
      e.key === "ArrowLeft" ? i - 1 :
      e.key === "Home" ? 0 : tabs.length - 1;
    next = (next + tabs.length) % tabs.length;
    e.preventDefault();
    tabs[next].focus();
    selectTab(group, tabs[next].dataset.tab);
  });

  /* ---------------------------------------------------------------------
     Accordion — one panel open at a time
     --------------------------------------------------------------------- */

  document.addEventListener("click", (e) => {
    const trig = e.target.closest(".acc__trigger");
    if (!trig) return;
    const acc = trig.closest("[data-acc]");
    const wasOpen = trig.getAttribute("aria-expanded") === "true";
    const single = acc.dataset.acc !== "multi";

    if (single) {
      $$(".acc__trigger", acc).forEach((t) => {
        t.setAttribute("aria-expanded", "false");
        const p = t.nextElementSibling;
        if (p) p.dataset.expanded = "false";
      });
    }
    trig.setAttribute("aria-expanded", wasOpen ? "false" : "true");
    const panel = trig.nextElementSibling;
    if (panel) panel.dataset.expanded = wasOpen ? "false" : "true";
  });

  /* ---------------------------------------------------------------------
     Overlays — dialog + drawer
     --------------------------------------------------------------------- */

  const FOCUSABLE =
    'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';
  let lastTrigger = null;

  function openOverlay(el, trigger) {
    lastTrigger = trigger || null;
    el.hidden = false;
    document.body.dataset.locked = "true";
    const first = $(FOCUSABLE, el);
    if (first) first.focus();
  }

  function closeOverlay(el) {
    if (!el || el.hidden) return;
    el.hidden = true;
    if (!$$(".scrim:not([hidden]), .drawer:not([hidden])").length) {
      delete document.body.dataset.locked;
    }
    if (lastTrigger) {
      lastTrigger.focus();
      lastTrigger = null;
    }
  }

  document.addEventListener("click", (e) => {
    const opener = e.target.closest("[data-open]");
    if (opener) {
      const target = document.getElementById(opener.dataset.open);
      if (target) {
        e.preventDefault();
        openOverlay(target, opener);
      }
      return;
    }

    const closer = e.target.closest("[data-close]");
    if (closer) {
      e.preventDefault();
      closeOverlay(closer.closest(".scrim, .drawer"));
      return;
    }

    // Clicking the scrim itself, not the panel inside it, dismisses.
    if (e.target.classList.contains("scrim")) closeOverlay(e.target);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const open = $$(".scrim:not([hidden]), .drawer:not([hidden])").pop();
    if (open) {
      e.preventDefault();
      closeOverlay(open);
    }
  });

  // Focus trap: Tab cycles inside the topmost overlay.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const open = $$(".scrim:not([hidden]), .drawer:not([hidden])").pop();
    if (!open) return;
    const items = $$(FOCUSABLE, open).filter((n) => n.offsetParent !== null);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* ---------------------------------------------------------------------
     Popovers — menu, combobox, multiselect, tree
     --------------------------------------------------------------------- */

  function closeAllPops(except) {
    $$("[data-pop]").forEach((t) => {
      const pop = document.getElementById(t.dataset.pop);
      if (pop && pop !== except) {
        pop.hidden = true;
        t.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.addEventListener("click", (e) => {
    const trig = e.target.closest("[data-pop]");
    if (trig) {
      const pop = document.getElementById(trig.dataset.pop);
      if (!pop) return;
      e.preventDefault();
      const willOpen = pop.hidden;
      closeAllPops(willOpen ? pop : null);
      pop.hidden = !willOpen;
      trig.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (willOpen) {
        const search = $("input", pop);
        if (search) search.focus();
      }
      return;
    }
    if (!e.target.closest(".pop")) closeAllPops();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && $$(".pop:not([hidden])").length) closeAllPops();
  });

  /* ---------------------------------------------------------------------
     Single-select listbox (combobox / menu)
     --------------------------------------------------------------------- */

  document.addEventListener("click", (e) => {
    const opt = e.target.closest(".opt");
    if (!opt || opt.disabled || opt.getAttribute("aria-disabled") === "true") return;
    const pop = opt.closest(".pop");
    if (!pop || pop.dataset.multi === "true") return;

    const trig = $(`[data-pop="${pop.id}"]`);
    $$(".opt", pop).forEach((o) => o.setAttribute("aria-selected", "false"));
    opt.setAttribute("aria-selected", "true");

    const label = $(".opt__label", opt) || opt;
    const out = trig && $("[data-value]", trig);
    if (out) {
      out.textContent = label.textContent.trim();
      out.classList.remove("msbox__placeholder");
    }
    pop.hidden = true;
    if (trig) {
      trig.setAttribute("aria-expanded", "false");
      trig.focus();
    }
    document.dispatchEvent(
      new CustomEvent("ix:select", { detail: { pop: pop.id, value: opt.dataset.value } })
    );
  });

  /* ---------------------------------------------------------------------
     Multi-select listbox
     --------------------------------------------------------------------- */

  function renderMulti(pop) {
    const trig = $(`[data-pop="${pop.id}"]`);
    if (!trig) return;
    const box = $("[data-value]", trig);
    if (!box) return;
    const chosen = $$('.opt[aria-selected="true"]', pop);
    const max = parseInt(trig.dataset.maxTags || "3", 10);

    if (!chosen.length) {
      box.innerHTML = `<span class="msbox__placeholder">${trig.dataset.placeholder || "Select"}</span>`;
      return;
    }
    if (trig.dataset.display === "count") {
      box.innerHTML = `<span>${chosen.length} selected</span>`;
      return;
    }
    const shown = chosen.slice(0, max);
    box.innerHTML =
      shown
        .map(
          (o) =>
            `<span class="tag" aria-pressed="true">${
              ($(".opt__label", o) || o).textContent.trim()
            }</span>`
        )
        .join("") +
      (chosen.length > max ? `<span class="msbox__more">+${chosen.length - max}</span>` : "");
  }

  document.addEventListener("click", (e) => {
    const opt = e.target.closest(".opt");
    if (!opt) return;
    const pop = opt.closest(".pop");
    if (!pop || pop.dataset.multi !== "true") return;
    e.stopPropagation();
    const on = opt.getAttribute("aria-selected") === "true";
    opt.setAttribute("aria-selected", on ? "false" : "true");
    const mark = $(".opt__check", opt);
    if (mark) mark.textContent = on ? "" : "✓";
    renderMulti(pop);
  });

  /* ---------------------------------------------------------------------
     Combobox filtering
     --------------------------------------------------------------------- */

  document.addEventListener("input", (e) => {
    const search = e.target.closest("[data-filter]");
    if (!search) return;
    const pop = search.closest(".pop");
    const q = search.value.trim().toLocaleLowerCase("tr");
    let visible = 0;
    $$(".opt", pop).forEach((o) => {
      const hit = o.textContent.toLocaleLowerCase("tr").includes(q);
      o.hidden = !hit;
      if (hit) visible++;
    });
    const empty = $(".pop__empty", pop);
    if (empty) empty.hidden = visible > 0;
  });

  /* ---------------------------------------------------------------------
     Tree — expand / collapse
     --------------------------------------------------------------------- */

  document.addEventListener("click", (e) => {
    const tw = e.target.closest(".tree__twisty");
    if (!tw) return;
    e.stopPropagation();
    const open = tw.getAttribute("aria-expanded") === "true";
    tw.setAttribute("aria-expanded", open ? "false" : "true");
    const kids = document.getElementById(tw.dataset.controls);
    if (kids) kids.hidden = open;
  });

  /* ---------------------------------------------------------------------
     Tag — toggle + remove
     --------------------------------------------------------------------- */

  document.addEventListener("click", (e) => {
    const x = e.target.closest(".tag__x");
    if (x) {
      e.stopPropagation();
      x.closest(".tag").remove();
      return;
    }
    const tag = e.target.closest("button.tag[aria-pressed]");
    if (tag) tag.setAttribute("aria-pressed", tag.getAttribute("aria-pressed") === "true" ? "false" : "true");
  });

  /* ---------------------------------------------------------------------
     Segmented control
     --------------------------------------------------------------------- */

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-seg] button");
    if (!btn) return;
    $$("button", btn.closest("[data-seg]")).forEach((b) =>
      b.setAttribute("aria-pressed", b === btn ? "true" : "false")
    );
  });

  /* ---------------------------------------------------------------------
     Pagination
     --------------------------------------------------------------------- */

  function renderPager(pager) {
    const page = parseInt(pager.dataset.page, 10);
    const count = parseInt(pager.dataset.count, 10);
    const sib = parseInt(pager.dataset.siblings || "1", 10);

    const nums = new Set([1, count]);
    for (let i = page - sib; i <= page + sib; i++) if (i >= 1 && i <= count) nums.add(i);
    const list = Array.from(nums).sort((a, b) => a - b);

    let html = `<button type="button" data-page="${page - 1}" ${page === 1 ? "disabled" : ""} aria-label="Previous page">‹</button>`;
    let prev = 0;
    for (const n of list) {
      if (n - prev > 1) html += `<span class="pager__gap">…</span>`;
      html += `<button type="button" data-page="${n}" ${n === page ? 'aria-current="page"' : ""}>${n}</button>`;
      prev = n;
    }
    html += `<button type="button" data-page="${page + 1}" ${page === count ? "disabled" : ""} aria-label="Next page">›</button>`;
    pager.innerHTML = html;
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-pager] button[data-page]");
    if (!btn || btn.disabled) return;
    const pager = btn.closest("[data-pager]");
    const n = parseInt(btn.dataset.page, 10);
    const count = parseInt(pager.dataset.count, 10);
    if (n < 1 || n > count) return;
    pager.dataset.page = String(n);
    renderPager(pager);
    const out = document.getElementById(pager.dataset.output || "");
    if (out) out.textContent = `Page ${n} of ${count}`;
  });

  /* ---------------------------------------------------------------------
     Quantity stepper
     --------------------------------------------------------------------- */

  function stepperField(box) {
    return $(".stepper__value", box) || $("input", box);
  }

  function stepperValue(box) {
    const el = stepperField(box);
    const raw = el.tagName === "INPUT" ? el.value : el.textContent;
    const n = parseInt(String(raw).replace(/[^\d-]/g, ""), 10);
    return Number.isNaN(n) ? parseInt(box.dataset.min || "0", 10) : n;
  }

  function setStepper(box, v) {
    const min = parseInt(box.dataset.min || "0", 10);
    const max = parseInt(box.dataset.max || "999999", 10);
    const el = stepperField(box);
    v = Math.min(max, Math.max(min, v));

    if (el.tagName === "INPUT") {
      el.value = String(v);
      el.setAttribute("aria-valuenow", String(v));
    } else {
      el.textContent = String(v);
    }
    // Documented as required on the Number input page, so the demo has to do it.
    if (el.getAttribute("role") === "spinbutton" || el.tagName === "INPUT") {
      el.setAttribute("aria-valuenow", String(v));
      el.setAttribute("aria-valuemin", String(min));
      el.setAttribute("aria-valuemax", String(max));
    }
    $$("button[data-step]", box).forEach((b) => {
      b.disabled =
        (b.dataset.step === "-1" && v <= min) || (b.dataset.step === "1" && v >= max);
    });
    return v;
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-stepper] button[data-step]");
    if (!btn || btn.disabled) return;
    const box = btn.closest("[data-stepper]");
    setStepper(box, stepperValue(box) + parseInt(btn.dataset.step, 10));
    const f = stepperField(box);
    if (f.tagName === "INPUT") f.focus();
  });

  // Arrow keys, on the value itself or in the field. Without this a stepper is
  // mouse-only, which is the failure the docs call out as high risk.
  document.addEventListener("keydown", (e) => {
    const box = e.target.closest("[data-stepper]");
    if (!box) return;
    if (!e.target.matches('.stepper__value[role="spinbutton"], [data-stepper] input')) return;
    const min = parseInt(box.dataset.min || "0", 10);
    const max = parseInt(box.dataset.max || "999999", 10);
    const cur = stepperValue(box);
    let next = null;
    if (e.key === "ArrowUp") next = cur + 1;
    else if (e.key === "ArrowDown") next = cur - 1;
    else if (e.key === "Home") next = min;
    else if (e.key === "End") next = max;
    if (next === null) return;
    e.preventDefault();
    setStepper(box, next);
  });

  // Typing stays first-class: clamp on blur rather than fighting the keystroke.
  document.addEventListener("blur", (e) => {
    const box = e.target.closest("[data-stepper]");
    if (box && e.target.tagName === "INPUT") setStepper(box, stepperValue(box));
  }, true);

  /* ---------------------------------------------------------------------
     Slider live value
     --------------------------------------------------------------------- */

  document.addEventListener("input", (e) => {
    const s = e.target.closest(".slider");
    if (!s) return;
    const out = document.getElementById(s.dataset.output || "");
    if (out) out.textContent = Number(s.value).toLocaleString("tr-TR") + (s.dataset.unit || "");
  });


  /* ---------------------------------------------------------------------
     Slider bound to a number field
     Both drive the same value: the slider to explore, the field to be exact.
     data-bind on the slider names the input's id, and vice versa.
     --------------------------------------------------------------------- */

  function syncPair(source) {
    const partner = document.getElementById(source.dataset.bind || "");
    if (!partner) return;
    const min = Number(source.min || partner.min || 0);
    const max = Number(source.max || partner.max || 100);
    let v = Number(String(source.value).replace(/[^\d.-]/g, ""));
    if (Number.isNaN(v)) return;
    v = Math.min(max, Math.max(min, v));
    partner.value = String(v);
    if (partner.type === "range" || source.type === "range") {
      const out = document.getElementById(source.dataset.output || partner.dataset.output || "");
      if (out) out.textContent = v.toLocaleString("en-US") + (source.dataset.unit || "");
    }
  }

  document.addEventListener("input", (e) => {
    const el = e.target.closest("[data-bind]");
    if (el) syncPair(el);
  });

  document.addEventListener("blur", (e) => {
    const el = e.target.closest("[data-bind]");
    if (el && el.type !== "range") {
      const min = Number(el.min || 0);
      const max = Number(el.max || 100);
      let v = Number(String(el.value).replace(/[^\d.-]/g, ""));
      if (Number.isNaN(v)) v = min;
      el.value = String(Math.min(max, Math.max(min, v)));
      syncPair(el);
    }
  }, true);


  /* ---------------------------------------------------------------------
     Password visibility
     Documented as required, so the demo has to actually do it: the type
     flips, aria-pressed tracks the state, and the accessible name says what
     the next press will do.
     --------------------------------------------------------------------- */

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-reveal]");
    if (!btn) return;
    const field = document.getElementById(btn.dataset.reveal);
    if (!field) return;
    const shown = field.type === "text";
    field.type = shown ? "password" : "text";
    btn.setAttribute("aria-pressed", shown ? "false" : "true");
    btn.setAttribute("aria-label", shown ? "Show password" : "Hide password");
    field.focus();
  });


  /* ---------------------------------------------------------------------
     Range slider — two handles over one track
     Each handle is a real <input type="range">, so keyboard support comes
     from the browser. This only stops the two crossing, paints the fill, and
     keeps any bound number fields in step.
     --------------------------------------------------------------------- */

  function paintRange(box) {
    const lo = $('[data-role="min"]', box);
    const hi = $('[data-role="max"]', box);
    const fill = $(".rangeslider__fill", box);
    if (!lo || !hi) return;

    const min = Number(lo.min || 0);
    const max = Number(lo.max || 100);
    const span = max - min || 1;
    const a = Number(lo.value);
    const b = Number(hi.value);

    if (fill) {
      fill.style.left = ((a - min) / span) * 100 + "%";
      fill.style.width = ((b - a) / span) * 100 + "%";
    }
    // announce the pair's own bounds, not just the global ones
    lo.setAttribute("aria-valuemax", String(b));
    hi.setAttribute("aria-valuemin", String(a));

    const lof = document.getElementById(box.dataset.fieldMin || "");
    const hif = document.getElementById(box.dataset.fieldMax || "");
    if (lof && document.activeElement !== lof) lof.value = String(a);
    if (hif && document.activeElement !== hif) hif.value = String(b);
  }

  document.addEventListener("input", (e) => {
    const input = e.target.closest(".rangeslider__input");
    if (input) {
      const box = input.closest(".rangeslider");
      const lo = $('[data-role="min"]', box);
      const hi = $('[data-role="max"]', box);
      // the handles may meet but never cross
      if (input.dataset.role === "min" && Number(lo.value) > Number(hi.value)) lo.value = hi.value;
      if (input.dataset.role === "max" && Number(hi.value) < Number(lo.value)) hi.value = lo.value;
      paintRange(box);
      return;
    }

    const field = e.target.closest("[data-range-field]");
    if (field) {
      const box = document.getElementById(field.dataset.rangeField);
      if (!box) return;
      const target = $('[data-role="' + field.dataset.role + '"]', box);
      const n = Number(String(field.value).replace(/[^\d.-]/g, ""));
      if (!Number.isNaN(n)) {
        target.value = String(n);
        const lo = $('[data-role="min"]', box);
        const hi = $('[data-role="max"]', box);
        if (Number(lo.value) > Number(hi.value)) {
          // entering a minimum above the maximum means swapping, not erroring
          const t = lo.value; lo.value = hi.value; hi.value = t;
        }
        paintRange(box);
      }
    }
  });


  /* ---------------------------------------------------------------------
     Rating input
     --------------------------------------------------------------------- */

  function paintStars(box, n) {
    $$(".rating__star", box).forEach((s, i) => (s.dataset.on = i < n ? "true" : "false"));
  }

  document.addEventListener("click", (e) => {
    const star = e.target.closest("[data-rating-input] .rating__star");
    if (!star) return;
    const box = star.closest("[data-rating-input]");
    const n = $$(".rating__star", box).indexOf(star) + 1;
    box.dataset.value = String(n);
    paintStars(box, n);
    const out = document.getElementById(box.dataset.output || "");
    if (out) out.textContent = `${n} / 5`;
  });

  document.addEventListener("mouseover", (e) => {
    const star = e.target.closest("[data-rating-input] .rating__star");
    if (!star) return;
    const box = star.closest("[data-rating-input]");
    paintStars(box, $$(".rating__star", box).indexOf(star) + 1);
  });

  document.addEventListener("mouseout", (e) => {
    const box = e.target.closest("[data-rating-input]");
    if (box) paintStars(box, parseInt(box.dataset.value || "0", 10));
  });

  /* ---------------------------------------------------------------------
     Table — sort + row selection
     --------------------------------------------------------------------- */

  document.addEventListener("click", (e) => {
    const th = e.target.closest("[data-sort-table] th[data-sort]");
    if (!th) return;
    const table = th.closest("table");
    const body = $("tbody", table);
    const idx = Array.from(th.parentNode.children).indexOf(th);
    const dir = th.getAttribute("aria-sort") === "ascending" ? "descending" : "ascending";

    $$("th[data-sort]", table).forEach((h) => h.setAttribute("aria-sort", "none"));
    th.setAttribute("aria-sort", dir);

    const numeric = th.dataset.sort === "number";
    const rows = $$("tr", body).sort((a, b) => {
      const x = a.children[idx].textContent.trim();
      const y = b.children[idx].textContent.trim();
      const r = numeric
        ? parseFloat(x.replace(/[^\d.-]/g, "")) - parseFloat(y.replace(/[^\d.-]/g, ""))
        : x.localeCompare(y, "tr");
      return dir === "ascending" ? r : -r;
    });
    rows.forEach((r) => body.appendChild(r));
  });

  document.addEventListener("change", (e) => {
    const cb = e.target.closest('[data-sort-table] tbody input[type="checkbox"]');
    if (cb) {
      const row = cb.closest("tr");
      row.setAttribute("aria-selected", cb.checked ? "true" : "false");
      const table = row.closest("table");
      const all = $$('tbody input[type="checkbox"]', table);
      const head = $('thead input[type="checkbox"]', table);
      if (head) {
        const on = all.filter((i) => i.checked).length;
        head.checked = on === all.length;
        head.indeterminate = on > 0 && on < all.length;
      }
      return;
    }
    const head = e.target.closest('[data-sort-table] thead input[type="checkbox"]');
    if (head) {
      const table = head.closest("table");
      $$('tbody input[type="checkbox"]', table).forEach((i) => {
        i.checked = head.checked;
        i.closest("tr").setAttribute("aria-selected", head.checked ? "true" : "false");
      });
    }
  });

  /* ---------------------------------------------------------------------
     Alert dismiss
     --------------------------------------------------------------------- */

  document.addEventListener("click", (e) => {
    const x = e.target.closest("[data-dismiss]");
    if (x) x.closest(".alert").remove();
  });

  /* ---------------------------------------------------------------------
     Toast
     --------------------------------------------------------------------- */

  function toaster() {
    let t = $(".toaster");
    if (!t) {
      t = document.createElement("div");
      t.className = "toaster";
      document.body.appendChild(t);
    }
    return t;
  }

  function showToast({ tone = "success", title = "", message = "", duration = 4000 } = {}) {
    const el = document.createElement("div");
    el.className = "toast";
    el.dataset.tone = tone;
    el.setAttribute("role", "status");
    el.innerHTML = `<div style="flex:1">${
      title ? `<div class="toast__title">${title}</div>` : ""
    }${message ? `<div class="toast__msg">${message}</div>` : ""}</div>
      <button type="button" class="alert__x" aria-label="Close">✕</button>`;
    toaster().appendChild(el);

    const kill = () => {
      el.dataset.leaving = "true";
      setTimeout(() => el.remove(), 200);
    };
    $("button", el).addEventListener("click", kill);
    if (duration) setTimeout(kill, duration);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-toast]");
    if (!btn) return;
    let cfg = {};
    try {
      cfg = JSON.parse(btn.dataset.toast || "{}");
    } catch (err) {
      cfg = { title: btn.dataset.toast };
    }
    showToast(cfg);
  });

  /* ---------------------------------------------------------------------
     Textarea counter
     --------------------------------------------------------------------- */

  document.addEventListener("input", (e) => {
    const ta = e.target.closest("[data-counter]");
    if (!ta) return;
    const out = document.getElementById(ta.dataset.counter);
    if (!out) return;
    const max = parseInt(ta.getAttribute("maxlength") || "0", 10);
    out.textContent = max ? `${ta.value.length} / ${max}` : String(ta.value.length);
    out.dataset.over = max && ta.value.length >= max ? "true" : "false";
  });

  /* ---------------------------------------------------------------------
     Progress demo control
     --------------------------------------------------------------------- */

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-progress]");
    if (!btn) return;
    const bar = document.getElementById(btn.dataset.progress);
    if (!bar) return;
    const next = Math.min(100, Math.max(0, parseInt(bar.dataset.value || "0", 10) + parseInt(btn.dataset.by || "20", 10)));
    bar.dataset.value = String(next);
    bar.style.width = next + "%";
    const label = document.getElementById(bar.dataset.output || "");
    if (label) label.textContent = next + "%";
  });

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */

  function init() {
    $$("[data-pager]").forEach(renderPager);
    $$(".rangeslider").forEach(paintRange);
    $$("[data-stepper]").forEach((b) => setStepper(b, parseInt($(".stepper__value", b).textContent, 10)));
    $$('.pop[data-multi="true"]').forEach(renderMulti);
    $$("[data-rating-input]").forEach((b) => paintStars(b, parseInt(b.dataset.value || "0", 10)));
    document.documentElement.classList.add("ix-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.Digirella = { showToast, selectTab, openOverlay, closeOverlay };
})();
