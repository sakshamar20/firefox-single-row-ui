# Compatibility and validation

The project uses the internal `-moz-pref()` media condition, modern Firefox CSS nesting, `:has()`, container queries, `color-mix()`, `@starting-style`, and internal browser selectors. It is designed for macOS, LTR interfaces and horizontal tabs. The compact rules fall back to native layout for Customize Toolbar, vertical tabs, forced-colors mode, webpage fullscreen and windows below 1000 CSS pixels.

Validation used an isolated headless Firefox 158.0.1 instance. No active user profile was modified by those tests. This is not a compatibility guarantee for every release, ESR branch, fork or experimental Firefox design.

## Checks completed

- Shrinking tabs, favicon-only presentation, and native overflow with 2, 8, 16 and 32 tabs in earlier layout iterations.
- Address field focus and preservation of typed values.
- Vertical hover actions with native icons and labels; moving from the handle onto an action kept the list visible.
- Account/profile button visible beside the menu handle.
- Keyboard focus revealing the actions and native Downloads popup behavior.
- Flat theme-relative fills, rounded close-button CSS, and reduced-motion rules.
- Normal, narrow and fullscreen-attribute geometry in isolated windows.
- Optional preview centering: actual hovered-tab and popup centers both measured x=811 in a controlled test.
- Optional Google helper: Firefox's actual new-tab command opened a browser whose current URI was `https://www.google.com/`.
- Search prompt visible only with an empty address field; typing removed it and preserved the input value.
- Public sample captures rendered from the packaged stylesheet with neutral tabs.

- Corner radius: native menu creation, preset commands at 0/4/8/12/16/24, live computed address/tab corners, Reset, helper removal, and a saved 7px value after restarting without loading the helper.
- Custom value validation through the real menu command with a test prompt service: valid integers accepted; negative, fractional, out-of-range and nonnumeric values rejected; cancel preserved the value. The native macOS menu appearance was not captured by headless screenshots.

- Search-engine selector: verified its actual shadow-DOM background at 0/4/16/24px; the native search-engine popup remains functional. The magnifying-glass artwork retains its circular lens.

- Collapsible search: actual pointer click expanded 32px to 260px; typed text was preserved; the native location command expanded it; returning focus to the page collapsed it. Tabs gained 228px, native overflow remained active with 32 tabs, fullscreen-state geometry did not overlap controls, and a narrow window used native layout.

- Search behavior fix: CSS idle toggle tested at 0/1; helper kept the actual new-tab command collapsed despite automatic focus; native pointer click opened engine selection without collapsing; native typing was preserved. Focused input/background and pseudo-element radii verified at 0/4/16px. Strict new-tab closure requires the session helper.

- Three-stage tab sizing: measured 220px with native titles (4 tabs), 102px and 64px with left favicons/faded labels (10 and 16 tabs), and 40px with icons/native overflow (32 tabs). Captures use neutral titles and built-in generic favicons.

- Complete replacement with the 420px expanded field: tab and navigation rows both at y=0, no horizontal page overflow at 1440px and 1000px, native engine picker stayed open, idle toggle and typed text retained, focus-corner checks passed, and 32-tab native overflow remained available. The reported two-row screenshot was not reproduced with the packaged full stylesheet; the installed local file/version was not available for comparison.

- Collapsed security: actual HTTPS trust popup and granted-permission popup opened through pointer clicks while the strip stayed collapsed. HTTP Not Secure text plus a granted-permission indicator fit in 192px. New-tab generic favicon rendered at 16px, and search still expanded to 420px. Permissions were added only in the disposable test profile and then removed.
- Drag repair: reproduced native dragstart/dragover with pointer actions. Before repair the row moved from y=7 to y=14.5 and non-dragged tab widths changed. After repair y stayed at 7 and widths stayed at 108px. The headless Mac driver did not deliver the OS drop event, so final edge dragover/drop handlers were invoked with the same live native DataTransfer; order changed from [0,1,2,3,4,5,6,7] to [1,2,3,4,5,6,7,0], drag state cleared and transform cleanup completed. This is not a full visual macOS drag-and-release certification, nor coverage of every pinned/grouped-tab case.

## Limits

- Real macOS fullscreen/Spaces animation, native traffic-light rendering, and every combination of tab groups/media controls have not been visually validated by these headless checks.
- The radius menu uses privileged Browser Console code. Its entries are session-only; the saved integer is read directly by CSS using an internal media condition verified on Firefox 158.0.1. Older releases may need a fixed `--uc-corner-radius` edit instead.
- Firefox UI selectors and native services can change. The console helpers are session-only and depend on internal APIs.
- Special toolbar widgets can differ from ordinary icon-and-label buttons. The vertical list supplies 24 row positions and is intended for a toolbar short enough to fit the screen.
- Keyboard traversal follows Firefox's original DOM order, which can differ from the visual layout.
- The visible Search prompt is CSS presentation. The native input and its accessible name remain intact.
- A theme with poor contrast can still require its own adjustment. No fixed color theme, glass material or desktop-wallpaper transparency is bundled.
- Native popup anchoring can be clamped by screen boundaries even with the optional centering helper.

Firefox does not officially support profile UI stylesheets. See [Mozilla's customization notes](https://support.mozilla.org/en-US/kb/firefox-advanced-customization-and-configuration).
