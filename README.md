# Firefox Single Row UI

A compact Firefox toolbar for macOS, built with original `userChrome.css`.

Navigation and the address field stay on the left, tabs share a rounded capsule in the middle, and secondary actions appear as a vertical list when you hover the menu handle. The account/profile icon stays visible on the right.

![Single-row toolbar with navigation, a short Search field, grouped tabs, and separate menu and account icons](assets/screenshots/toolbar.png)

## Features

- One compact row with a collapsed security/search strip that expands into a 420px address field.
- Shared tab capsule with rounded selection and theme-relative translucent fills.
- Tabs progress through roomy titles, lighter titles that fade rightward beside a left favicon, then favicon-only tabs at 56px and below; native scrolling handles overflow.
- Vertical hover actions with icons and native button labels; keyboard focus also reveals the list.
- Persistent account/profile button beside the hover handle.
- Navigation, tab-close, audio, Downloads and popup controls use Firefox's original elements.
- Native connection, tracking and permission controls remain available while search is collapsed.
- Neutral new-tab favicon at every tab width.
- Adjustable corners: 0–24px, a rounded 16px default, and an optional native Corner radius menu.
- Optional helpers for centered hover previews and Google new tabs.
- Normal Firefox layout in Customize Toolbar, vertical-tab mode, forced-colors mode and windows narrower than 1000 CSS pixels.

This project does not bundle a Firefox color theme. The colors in the examples come from the capture environment; your installed theme supplies the background and text colors.

## Examples

### Collapsible search

The native address field collapses to a search icon while you browse. Click it or press **Command-L** to expand it; it stays expanded while focused, while suggestions are open, or during search mode. Click back into the webpage to collapse it. Tabs automatically take the freed space. Set `--uc-search-default-open: 0` for closed while idle, or `1` for open while idle. For strict closed-by-default behavior on new tabs, run [`optional/search-behavior.js`](optional/search-behavior.js) using the Browser Console steps. It distinguishes automatic Firefox focus from your click, keyboard input or Command-L. The helper also lets you click the unused space after the last tab to open and focus Search. Tab clicks, +, scrolling and the tab-list button retain their native actions. The tab-list popup opens below the capsule with its right edge inset from the capsule edge. The helper is session-only; CSS alone still expands when Firefox automatically focuses the field.

![Collapsed search icon gives tabs more room](assets/screenshots/search-collapsed.png)

![Expanded native address field while editing](assets/screenshots/search-expanded.png)

### Security while collapsed

With the updated [`optional/search-behavior.js`](optional/search-behavior.js) helper running, the collapsed strip fits the visible native controls: 36px for search alone, 66px for site information plus search, 96px with one permission indicator, and 126px with two permission indicators. It responds to tab switches and permission changes. CSS-only installations reserve 96px for native site controls and search. HTTP connection warnings get 176px; a pending permission prompt expands the field. Older Firefox layouts with separate security icons reserve 120px. Firefox decides which icons are relevant, including whether security/tracking information uses a combined control. Click those native controls for site information, cookies/site-data actions and permissions.

Native icons use centered 28px targets, 16px artwork and 2px spacing (30px between icon centers), including indicators nested inside the permission button. Hidden native controls remain hidden, and multi-indicator controls can use their required width.

![Aligned native site information, permission and search icons](assets/screenshots/aligned-security-icons.png)

![Dynamic strip with two native permission indicators](assets/screenshots/dynamic-security-icons.png)

New tabs show a neutral favicon even when roomy:

![Neutral new-tab favicon](assets/screenshots/new-tab-favicon.png)

### Hover actions

Hover **☰** to reveal the list without clicking. Clicking the same handle still opens Firefox's application menu.

![Vertical hover menu showing Downloads, Extensions, Home, History, and Print, with the account button remaining on the main toolbar](assets/screenshots/hover-actions.png)

### Many tabs

Tabs have three width-based stages: above 140px, normal titles; 57–140px, a left favicon with a lighter title fading toward the right; at 56px and below, centered icons only. Text fades inside its own tab rather than covering neighboring controls. Native tooltips retain the full titles; use **Command-W** or the context menu to close an icon-only tab.

**Roomy tabs**

![Wide tab titles](assets/screenshots/tabs-wide.png)

**Intermediate tabs: favicon and fading title**

![Left favicon with a title fading to the right](assets/screenshots/tabs-faded.png)

**Crowded tabs: icons and native scrolling**

![Favicon-only tabs with native scroll controls](assets/screenshots/tabs-icons.png)

These are actual captures from an isolated headless Firefox 158.0.1 profile with neutral demo tabs. Native macOS traffic lights are not rendered in headless captures. See [screenshot notes](docs/SCREENSHOTS.md).

## Installation

1. Download this repository using **Code → Download ZIP** and extract it.
2. In Firefox, open `about:support` and choose **Profile Folder → Show in Finder**.
3. Create a folder named `chrome` inside that active profile if it does not exist. Back up an existing `userChrome.css` before replacing it.
4. Replace the entire existing `userChrome.css` with [`chrome/userChrome.css`](chrome/userChrome.css). Keep the filename exactly `userChrome.css`; do not replace it with a small patch or append older layout snippets.
5. In `about:config`, set `toolkit.legacyUserProfileCustomizations.stylesheets` to **true**.
6. Use horizontal tabs. In **Customize Toolbar**, keep Reload/Stop, Sidebar, Downloads and Account on the navigation toolbar. Keep New Tab and the tab-list control on the tab toolbar.
7. Fully quit Firefox with **Command-Q**, then reopen it.

Use the profile's **Root Directory**, not its Local Directory under `Library/Caches`. If needed, open `about:profiles` to distinguish the two.

The optional [`chrome/userContent.css`](chrome/userContent.css) removes the Firefox logo/wordmark from Firefox's own start page. Copy it beside `userChrome.css` only if you want that change.

For a fully single-row appearance, set the Bookmarks Toolbar to **Never Show**. The stylesheet intentionally preserves bookmark and notification bars when Firefox displays them.

[Full setup, tuning and rollback instructions →](docs/INSTALLATION.md)

## Optional behavior

### Change corner radius

Run [`optional/corner-radius-menu.js`](optional/corner-radius-menu.js) using the [Browser Console steps](docs/INSTALLATION.md#optional-browser-console-helpers), then **right-click a tab or toolbar → Corner radius**. Choose a preset or **Custom…** (whole pixels, 0–24). Changes apply immediately and the selected radius survives Firefox restarts. The menu itself must be loaded again each session.

**4px — subtle corners**

![Actual Firefox toolbar with subtle 4px corners](assets/screenshots/radius-4.png)

**16px — rounder corners**

![Actual Firefox toolbar with 16px corners](assets/screenshots/radius-16.png)

For a setup without the helper, create the **Number** preference `userChrome.singleRow.cornerRadius` in `about:config` and enter a value from 0 to 24.

### Center hover previews

[`optional/center-tab-previews.js`](optional/center-tab-previews.js) centers the native preview under its current tab using Firefox's popup API. This is a **session-only Browser Console helper**, not an automatically loaded startup script.

### Open Google on every new tab

CSS cannot change the page Firefox opens. For a persistent setup, use [New Tab Override](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/) and set its URL to `https://www.google.com/`.

The original [`optional/google-new-tabs.js`](optional/google-new-tabs.js) helper offers the same navigation for the current Firefox session without installing another extension. It must be run again after restarting Firefox.

[Optional-helper instructions →](docs/INSTALLATION.md#optional-browser-console-helpers)

## Compatibility

The CSS and helpers were exercised in an isolated **headless Firefox 158.0.1** instance. This does not certify every Firefox release or ESR branch. Real macOS fullscreen/Spaces transitions and native traffic-light rendering have not been visually verified by the automated tests.

`userChrome.css` uses internal Firefox selectors and is [not officially supported by Mozilla](https://support.mozilla.org/en-US/kb/firefox-advanced-customization-and-configuration). UI changes can require updates. The layout is designed for macOS, left-to-right UI and horizontal tabs.

[Validation details and known limits →](docs/COMPATIBILITY.md)

## Report an issue

Include your Firefox version, macOS version, window mode, theme, and a screenshot with personal details removed. Mention whether you use other toolbar CSS. Please test without overlapping custom styles before reporting a layout conflict.
