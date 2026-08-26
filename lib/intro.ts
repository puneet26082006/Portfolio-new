/* ------------------------------------------------------------------ *
 * awrs.me intro timeline — extracted verbatim from their bundled Hero
 * component (expc_08u~9bq9d2pze.js) and converted from GSAP's relative
 * timeline positions into absolute delays for framer-motion.
 *
 * Their source:
 *   gsap.timeline({defaults:{ease:"power3.out"}})
 *     .fromTo(".hero-marquee",      {opacity:0},                                  {opacity:1,duration:1,ease:"power2.out"})
 *     .fromTo(".hero-greeting",     {y:30,opacity:0,filter:"blur(8px)"},          {y:0,opacity:1,filter:"blur(0px)",duration:.7},                              "-=0.6")
 *     .fromTo(".hero-greeting-line",{scaleX:0,opacity:0},                         {scaleX:1,opacity:1,duration:.5,ease:"power2.out"},                          "-=0.2")
 *     .fromTo(".hero-char",         {y:60,opacity:0,rotationX:90,filter:"blur(4px)"},{y:0,opacity:1,rotationX:0,filter:"blur(0px)",duration:.5,stagger:.04,ease:"back.out(1.7)"},"-=0.2")
 *     .fromTo(".hero-tagline",      {y:20,opacity:0,filter:"blur(6px)"},          {y:0,opacity:1,filter:"blur(0px)",duration:.7},                              "-=0.3")
 *     .fromTo(".hero-particle",     {opacity:0},                                  {opacity:1,duration:.8,stagger:.05},                                         "-=0.4")
 *
 * GSAP appends each tween at (previous timeline end + offset), so the
 * absolute start times below are the resolved positions of that chain.
 * ------------------------------------------------------------------ */

export const NAME = "Puneet Saxena";

/** Characters that actually animate (the inter-word space is not a char span). */
export const NAME_CHARS = NAME.replace(/\s/g, "").length;

export const CHAR_DUR = 0.5;
export const CHAR_STAGGER = 0.04;

/** Absolute start times (seconds) resolved from the GSAP chain above. */
export const T_STRIPS = 0; // ends 1.0
export const T_GREETING = 0.4; // 1.0 - 0.6 ; ends 1.1
export const T_LINE = 0.9; // 1.1 - 0.2 ; ends 1.4
export const T_CHARS = 1.2; // 1.4 - 0.2

/** When the final character has finished settling. */
export const T_NAME_END = T_CHARS + CHAR_STAGGER * (NAME_CHARS - 1) + CHAR_DUR;

export const T_TAGLINE = T_NAME_END - 0.3;
export const T_PARTICLES = T_TAGLINE + 0.7 - 0.4;

/**
 * The moment the floating nav swaps its greeting pill for the page links —
 * awrs.me does this as the name lands, so the two reads as one motion.
 */
export const T_NAV_SWAP = T_NAME_END + 0.1;

/* GSAP easing curves as cubic-beziers. `back.out(1.7)` is framer's "backOut". */
export const EASE_POWER3: [number, number, number, number] = [0.215, 0.61, 0.355, 1];
export const EASE_POWER2: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
