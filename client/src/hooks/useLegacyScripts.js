import { useEffect } from 'react';

/**
 * The original template's per-page animation/plugin setup (GSAP/ScrollTrigger/SplitText,
 * AOS, WOW.js, counterup, meanmenu, magnific-popup, paroller/parallax, one-page-nav,
 * scrollUp, isotope, swiper) all lives inside js/main.js, wrapped in a single IIFE that
 * historically ran once on plain HTML page-load ($(document).ready / $(window).on('load')).
 *
 * In an SPA that file only executes once (on the very first route), so every subsequent
 * route change would render with dead animations / unbound sliders.
 *
 * To keep main.js byte-for-byte identical to the original (per the "reuse as-is" requirement)
 * rather than rewriting its internals into exported functions, this hook re-injects a fresh
 * <script> tag pointing at the same unmodified /assets/js/main.js file on every route change
 * and after async content finishes loading. Re-inserting a <script> tag forces the browser to
 * re-execute it, which re-runs every jQuery selector-based init in the file against whatever
 * is currently in the DOM — the same effect as a full page reload, without one.
 *
 * `ready` should be true once the API data this page depends on has actually rendered, so we
 * don't run animations (SplitText, counters, AOS, etc.) against empty placeholder markup.
 *
 * IMPORTANT — why we wait for images before running main.js at all:
 * main.js runs top-to-bottom the instant the <script> tag executes, and it computes every
 * animation's starting position (GSAP ScrollTrigger's "fade-slide"/"text-anime" hero reveals,
 * WOW.js's "wow fadeInUp/fadeInLeft/..." reveals used across the site, etc.) based on the
 * page's layout AT THAT EXACT MOMENT. If the hero photo, avatar icons, etc. haven't finished
 * loading yet, the page is shorter/shifted than its true final layout, so those positions get
 * computed wrong — and the affected content can end up stuck invisible, because:
 *   - WOW.js only re-checks visibility on a scroll/resize event, never on its own.
 *   - GSAP ScrollTrigger's refresh() *should* catch this, but re-triggering an already-fired
 *     ScrollTrigger's "from" state after the fact isn't reliable in every case.
 * Trying to patch this up with a refresh/resize *after* running main.js early turned out not
 * to fix it consistently. The reliable fix is to simply not run main.js until every image
 * already in the DOM has finished loading, so the very first computation main.js ever does
 * happens against the final, correct layout — nothing to "fix up" afterward.
 */
let cleanupTimers = [];

export const useLegacyScripts = (ready = true, deps = []) => {
  useEffect(() => {
    if (!ready) return undefined;

    // Remove any previously-injected copy so we don't stack duplicate bindings/listeners.
    document.querySelectorAll('script[data-legacy-init="main"]').forEach((el) => el.remove());

    // Also reset a couple of plugins that keep external DOM/CSS state across runs.
    if (window.jQuery) {
      const $ = window.jQuery;
      // meanmenu injects a mobile nav clone; drop it so it isn't re-created twice.
      $('.mean-container .mean-bar').remove();
      $('nav').removeClass('mean-container');
    }
    if (window.ScrollTrigger) {
      window.ScrollTrigger.getAll().forEach((t) => t.kill());
    }

    let cancelled = false;
    let injected = false;

    const injectMainScript = () => {
      if (cancelled || injected) return;
      injected = true;

      const script = document.createElement('script');
      script.src = `/assets/js/main.js?t=${Date.now()}`; // cache-bust so the browser re-fetches/re-executes
      script.setAttribute('data-legacy-init', 'main');
      script.async = false;

      // Belt-and-suspenders: even though main.js now only runs once images are loaded, still
      // do a follow-up nudge shortly after in case something else (a web font swapping in and
      // reflowing text, a very late-arriving image) shifts the layout right after main.js ran.
      script.onload = () => {
        const nudge = () => {
          if (window.ScrollTrigger) window.ScrollTrigger.refresh();
          window.dispatchEvent(new Event('resize'));
        };
        setTimeout(nudge, 300);
        setTimeout(nudge, 1000);
      };

      document.body.appendChild(script);

      if (window.AOS) {
        window.AOS.init({ duration: 800, once: true });
        window.AOS.refreshHard();
      }
    };

    // Give React a moment to finish committing the new DOM (so <img> tags with their real
    // src attributes actually exist), then wait for every image currently on the page to
    // finish loading before letting main.js compute any layout-based animation positions.
    const startTimer = setTimeout(() => {
      if (window.jQuery && window.jQuery.fn.imagesLoaded) {
        window.jQuery(document.body).imagesLoaded(injectMainScript);
        // Don't wait forever if some image never fires a load/error event — run anyway
        // after a couple of seconds so the page doesn't stay un-animated indefinitely.
        const forceTimer = setTimeout(injectMainScript, 2500);
        cleanupTimers.push(forceTimer);
      } else {
        // Fallback if the imagesLoaded plugin isn't available for some reason.
        injectMainScript();
      }
    }, 50);

    cleanupTimers.push(startTimer);
    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, ...deps]);
};