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

    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.src = `/assets/js/main.js?t=${Date.now()}`; // cache-bust so the browser re-fetches/re-executes
      script.setAttribute('data-legacy-init', 'main');
      script.async = false;

      // main.js creates every ScrollTrigger (including the "fade-slide" hero animations)
      // based on element positions AT THE MOMENT IT RUNS. If images (hero photo, avatar
      // icon, etc.) haven't finished loading yet, the page is shorter/shifted than its final
      // layout, so ScrollTrigger can compute the wrong "has this already scrolled past?"
      // state for above-the-fold content — leaving it stuck at its hidden opacity:0 starting
      // point forever. This is why the hero sometimes renders fine and sometimes doesn't: it
      // depends on how fast images happen to load relative to this script running.
      // Fix: once images are actually loaded, force ScrollTrigger to recompute (refresh)
      // against the real, final layout so already-visible content gets its visible state.
      const refreshScrollTrigger = () => {
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      };
      script.onload = () => {
        if (window.jQuery && window.jQuery.fn.imagesLoaded) {
          window.jQuery(document.body).imagesLoaded(refreshScrollTrigger);
        } else {
          // Fallback if the imagesLoaded plugin isn't available for some reason.
          setTimeout(refreshScrollTrigger, 400);
        }
        // Safety-net second refresh in case something (a late-arriving image, a slow
        // network) still shifted layout after the first refresh ran.
        setTimeout(refreshScrollTrigger, 1000);
      };

      document.body.appendChild(script);

      if (window.AOS) {
        window.AOS.init({ duration: 800, once: true });
        window.AOS.refreshHard();
      }
    }, 50); // small delay lets React finish committing the new DOM first

    cleanupTimers.push(timer);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, ...deps]);
};