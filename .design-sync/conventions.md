# Charter Design System — build conventions

`@josephavelez77/charter-design-system` — 62 React components for enterprise
software tools. Dark-first; light is opt-in.

## Setup — no provider

There is **no React context provider and no i18n layer**. Components read their
styling entirely from CSS custom properties, so setup is three steps:

1. **Link `styles.css` once.** It `@import`s the three Google Fonts and
   `_ds_bundle.css` (which carries the `:root` token block, the `[data-theme]`
   overrides, and every component's styles). Without it, components render
   unstyled and text falls back to the browser serif.
2. **Set the app background.** `--container-color-themeable-primary` is the
   page/app background token — put it on `<html>`, `<body>`, and every page or
   `<main>` wrapper. Leaving it at the browser default (white) is the most
   common integration bug.
3. **Theme is one attribute on the root element** — no JS, no provider:
   - dark (default): no attribute, or `data-theme="dark"` on `<html>`
   - light: `data-theme="light"` on `<html>`
   - a dark region inside a light page: `data-theme="dark"` on that subtree

(The per-component `.prompt.md` files mention "theme/i18n providers" — that
boilerplate overstates it; the `data-theme` attribute is the whole story.)

```jsx
const { Button, Icon, faArrowRight } = window.Josephavelez77CharterDesignSystem;

// Your own layout glue — styled with tokens, never hardcoded values.
<main style={{
  background: 'var(--container-color-themeable-primary)',
  color: 'var(--text-color-themeable-primary)',
  padding: 'var(--container-padding-static-primary)',
  display: 'flex', gap: 'var(--container-gap-static-small)',
}}>
  <Button variant="brandPrimary" emphasis="primary"
          trailingIcon={<Icon icon={faArrowRight} />}>
    Continue
  </Button>
</main>
```

## Styling idiom — CSS custom properties only

No utility classes, no style props, no CSS-in-JS. Component internals are styled
by the bundle; **for your own layout glue use `var(--token)`** and nothing else.
Every family has two axes:
- `themeable` — flips with `data-theme` (surfaces, text, borders, icons)
- `static` — identical in both themes (brand / status / priority palettes; all
  spacing, sizing, radii, and type)

| Need | Token family | Example suffixes |
|---|---|---|
| Background | `--container-color-themeable-*` | `primary` (app bg), `secondary` (card/recessed), `tertiary`, `disabled` |
| Text color | `--text-color-themeable-*` | `primary`, `secondary`, `tertiary`, `disabled`, `state-error` |
| Border color | `--border-color-themeable-*`, `--border-color-static-*` | `themeable-primary`; `static-brand-primary`, `static-status-negative1` |
| Icon color | `--icon-color-themeable-*`, `--icon-color-static-*` | mirrors text / brand |
| Gap & padding | `--container-gap-static-*`, `--container-padding-static-*` | `xxs xs small primary large xl 2xl 3xl` |
| Radius | `--border-radius-static-*` | `none`, `small` (4px), `primary` (8px), `circle` (9999px) |
| Font family | `--text-family-static-*` | `body` (DM Sans), `headline` (DM Serif Display), `mono` (JetBrains Mono) |
| Font size / line height | `--text-size-static-*`, `--text-line-static-*` | `caption body1 body2 headline1..3 display1..3` |
| Font weight | `--text-weight-static-*` | `regular medium semibold` |
| Fixed sizing | `--container-height-static-*`, `--container-width-static-*`, `--icon-width-static-*`, `--icon-height-static-*` | `xs small medium large xl` |

Authoritative list: the `:root` block of `_ds_bundle.css` — 180 properties,
names verbatim from upstream.

## Component API conventions

- Boolean props are plain: `disabled`, `loading`, `fullWidth`, `dismissible`
  (never `isDisabled`).
- Event handlers follow React: `onClick`, `onChange`, `onDismiss`, `onClose`.
- Icon props take a FontAwesome `IconDefinition`. The `free-solid` and
  `free-regular` icon sets plus `FontAwesomeIcon` are re-exported on the same
  global (`faHouse`, `faXmark`, `faArrowRight`, …). Always pass `aria-label` to
  `Icon` / `IconButton` when the icon carries meaning on its own.
- Compound components are exported separately and composed in JSX:
  `AccordionGroup`+`AccordionItem`, `Menu`+`MenuItem`,
  `RadioButtonGroup`+`RadioButtonItem`, `SwitchGroup`+`SwitchItem`,
  `CheckboxGroup`+`Checkbox`, `TabGroup`.
- Component groups in this bundle: `brand`, `buttons`, `chips`, `data-display`,
  `feedback`, `inputs`, `navigation`, `overlay`.

## Where the truth lives

- `styles.css` → `_ds_bundle.css` — tokens, theme overrides, and all component
  CSS. Read it before writing any styling.
- `components/<group>/<Name>/<Name>.prompt.md` — example JSX and the variant
  list; `<Name>.d.ts` — the prop contract. Read a component's `.prompt.md`
  before composing it.
