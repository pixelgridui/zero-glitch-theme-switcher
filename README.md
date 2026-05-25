# zero-glitch-theme-switcher

> Dark mode the right way — CSS variables + a tiny bit of JS.
> Zero flash. Zero glitch. Zero frameworks.
>
> Companion code for the [Pixel Grid UI](https://www.youtube.com/@pixelgridui) video.

A complete reference implementation of theme toggling in **three files**.

- ✅ Respects the OS preference by default (`prefers-color-scheme`)
- ✅ Persists user choice across reloads (`localStorage`)
- ✅ **No flash of wrong theme** on reload (inline script in `<head>`)
- ✅ Uses native `light-dark()` — one line, both modes
- ✅ Tokens scale across cards, buttons, forms, alerts, badges
- ✅ WCAG AA contrast in both themes
- ✅ Handles `forced-colors` accessibility mode
- ✅ Five lines of JavaScript. That's the whole system.

## Run it

```bash
npx live-server .
# or any static file server. file:// also works.
```

Click the moon/sun icon top-right. Page toggles. Reload. **No flash.**

---

## The 5-line system

The whole thing fits in your head:

```
1.  :root tokens          — the names your components reach for
2.  light-dark()          — both modes in one value
3.  [data-theme]          — manual override for the toggle
4.  inline <script> head  — runs before body parses · no flash
5.  5 lines of JS         — read localStorage, set data-theme
```

Open `index.html`. Open `styles.css`. Open `script.js`. The whole theming system is in those three files.

## File breakdown

| File | What | Lines |
|---|---|---|
| [`index.html`](index.html) | The page + the **inline script in `<head>`** that prevents the flash | ~195 |
| [`styles.css`](styles.css) | `:root` tokens · `light-dark()` · `[data-theme]` override · `color-scheme` · `forced-colors` handling | ~440 |
| [`script.js`](script.js) | The toggle handler — read current `data-theme`, flip it, save to `localStorage` | 14 |

---

## The 5 gotchas (from the video)

These are the ones that will bite you if you skip the basics.

### 1. Hardcoded colors will betray you

You'll add a one-off color for a button shadow, ship it, and six months later you'll switch themes and that shadow will look broken on dark.

**Rule:** every color goes through a variable. No exceptions.

```css
/* WRONG */
.card { box-shadow: 6px 6px 0 #1a1510; }

/* RIGHT */
.card { box-shadow: 6px 6px 0 var(--text); }
```

### 2. Respect the OS preference by default

If the user hasn't toggled anything, you should NOT default to light. Default to whatever their OS says. That's what `prefers-color-scheme` is for.

The inline script does this in one line:

```js
const theme = saved ?? (prefersDark ? "dark" : "light");
```

### 3. Test contrast in both themes

WCAG ratios you nailed in light might fail in dark. White text on dark gray is not automatically accessible. Accent colors can drop below the 4.5:1 ratio without you noticing.

Run the contrast checker. Both themes. Every time. (DevTools → Accessibility panel.)

### 4. Don't animate `color` transitions across the entire page

Looks expensive. Costs frame time. Most users don't want their whole screen fading for half a second.

A snap is fine. Honest is fine. If you must transition, transition the body background only — see `html, body` in `styles.css`.

### 5. `light-dark()` needs `color-scheme` set

This is the one that catches everyone. Your dark mode won't work at all — and the fix is one line:

```css
:root { color-scheme: light dark; }
```

Without that line, `light-dark()` falls back to the LIGHT value every time, regardless of OS preference. Native form controls (inputs, scrollbars, date pickers) also won't pick up the dark variant.

---

## The 4 ways to do dark mode (ranked)

The video walks through this in detail. Short version:

| Approach | Verdict |
|---|---|
| `prefers-color-scheme` alone | OK · for sites with no toggle |
| `[data-theme]` alone | ⚠ flashes on reload |
| `light-dark()` alone | OK · if you never override the OS |
| **`light-dark()` + `[data-theme]` + inline script** | **✅ what you ship** |

This starter ships the last one — the hybrid. That's the zero-glitch path.

---

## Why most tutorials get the flash wrong

They put the theme logic in the **main JavaScript bundle**, which loads AFTER `<body>` renders. By the time the script runs, the page has already painted in the default (light) theme — and now it has to flip. That flip is the flash.

**The fix:** move the read-and-set logic to an inline `<script>` in `<head>`, BEFORE `<body>` parses. Runs synchronously, blocks render for microseconds, sets the theme on `<html>` before the first paint.

In `index.html`:

```html
<head>
  <script>
    (() => {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = saved ?? (prefersDark ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", theme);
    })();
  </script>
  <!-- ...the rest of head... -->
</head>
```

That's the fix. That's the whole fix.

---

## Use this as a starter

1. Clone or copy the three files into your project
2. Replace the demo content with your own
3. Keep the inline `<script>` in `<head>` exactly where it is
4. Keep `color-scheme: light dark` on `:root`
5. Add your own tokens to `:root` and the `[data-theme]` blocks — same pattern (semantic names, never raw colors)

That's it.

---

## Credits

Built for the [Pixel Grid UI](https://www.youtube.com/@pixelgridui) long-form video on dark mode the right way.

**Follow:**
- YouTube → [@pixelgridui](https://www.youtube.com/@pixelgridui)
- Instagram → [@pixel.grid.ui](https://instagram.com/pixelgridui)
- Codepen → [@pixelgridui](https://codepen.io/pixelgridui)

## License

MIT — use it however you want.
