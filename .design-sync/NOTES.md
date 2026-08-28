# design-sync NOTES

## Global fixes (applied in config)

- [GENERAL] **cssEntry required**: `vite.config.ts` uses `cssCodeSplit: false` + `assetFileNames` that funnels ALL CSS (tokens + all CSS modules) into `dist/tokens/index.css` (127KB). The storybook's `iframe-*.css` (13KB) only has tokens — components render completely unstyled without `cfg.cssEntry: "./dist/tokens/index.css"`.

- [GENERAL] **FontAwesome must be in extraEntries**: All FA packages (`@fortawesome/react-fontawesome`, `@fortawesome/fontawesome-svg-core`, `@fortawesome/free-solid-svg-icons`, `@fortawesome/free-regular-svg-icons`) are peerDependencies and are marked `external` in `vite.config.ts`, so they're absent from `dist/index.js`. Add all four to `cfg.extraEntries`. Add the icon-data packages to `cfg.storyImports.bundle` so story `import { faHouse }` resolves to the bundled global instead of the shim.

- [GENERAL] **Foundations stories excluded**: `Foundations/Borders`, `Foundations/Color Tokens`, `Foundations/Shadow`, `Foundations/Sizing`, `Foundations/Spacing`, `Foundations/Typography` are documentation-only (no component exports) — excluded via `cfg.titleMap: null`. `Templates` story is a composition example, also excluded.

- [GENERAL] **cardMode overrides**: Many components have stories wider than their grid cells or use portal/fixed positioning. All overrides are set in `cfg.overrides`. Column-mode (full-width cards): Button, ButtonGroup, Card, ChartCard, DataGrid, DateField, FileUploader, FileUploaderListItem, GlobalToolbar, KpiCard, ListGroup, ListItem, NumberField, Pagination, PasswordField, ProgressBar, SelectField, Stepper, StatusChip, Table, TextArea, TextField, Toast. Single-story mode (portal/fixed): Dialog, Drawer, NavDrawer all use `cardMode: "single"`, `primaryStory: "Default"`. The first-sync validator run (after fresh build) revealed new GRID_OVERFLOW flags for ButtonGroup, StatusChip, KpiCard, ListGroup, ListItem, Pagination, GlobalToolbar, Stepper, Dialog, Drawer — all resolved by adding to config before close-out.

## Re-sync risks

- `cssEntry` and `extraEntries` are stable as long as `vite.config.ts` keeps `cssCodeSplit: false` — if that changes, component CSS may move into separate files.
- FA versions: extraEntries bundles the devDep versions; if peerDep version ranges diverge from devDeps, icons may behave differently in consumers.
- Google Fonts are loaded via `@import url(...)` in `styles.css` — designs require network access to fonts.googleapis.com. If previews ever render with fallback fonts, check egress.
- `[RENDER_THIN]` components (Logo, Icon, IconButton, RadioButton) were NOT fixed via owned previews — they render SVG/CSS visual content with no text. All graded `match` by image comparison. These flag `[RENDER_THIN]` on every sync — expected, not a regression. Consider owned previews only if this becomes a problem.
- `readmeHeader` → `.design-sync/conventions.md` (added 2026-08-28). Hand-authored, human-editable. On each re-sync, re-validate the token/prop/component names it enumerates against the fresh build (grep `_ds_bundle.css` `:root` block + `components/<group>/<Name>/` dirs); never rewrite it.
- Stale remote file `_preview/PopOver.js` (wrong casing, alongside the correct `_preview/Popover.js`) has been in the project since an earlier sync. The anchor diff doesn't flag it, so the atomic-path upload can't clean it (deletes come verbatim from `.sync-diff.json`, which lists none). Harmless. To remove: a future sync would need it added to the plan's `deletes` manually.

## Build notes for re-sync
- `resync.mjs` now accepts `--entry`, so the driver works in this source repo (where `node_modules/@josephavelez77/charter-design-system` does not exist). The old `[NO_DIST]` workaround is obsolete. Run from repo root:
  1. `npm run build`
  2. `npx storybook build -c .storybook -o "$(git rev-parse --show-toplevel)/.design-sync/sb-reference"` (rebuild whenever DS source changed)
  3. Fetch `_ds_sync.json` from the project → `.design-sync/.cache/remote-sync.json`
  4. `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./dist/index.cjs --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json`
- `--node-modules ./node_modules` = repo root (React lives there; the DS package has no own node_modules).
