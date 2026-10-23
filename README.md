# Firefox Single Row UI

A compact Firefox toolbar for macOS, built with original `userChrome.css`.

Navigation and the address field stay on the left, tabs share a rounded capsule in the middle, and secondary actions appear as a vertical list when you hover the menu handle. The account/profile icon stays visible on the right.

![Single-row toolbar with navigation, a short Search field, grouped tabs, and separate menu and account icons](assets/screenshots/toolbar.png)

## Features

- One compact row with a 32px search icon that expands into a 260px address field.
- Shared tab capsule with rounded selection and theme-relative translucent fills.
- Tabs shrink toward 40px, switch to favicon-only presentation below 80px, then use Firefox's native overflow scrolling.
- Vertical hover actions with icons and native button labels; keyboard focus also reveals the list.
- Persistent account/profile button beside the hover handle.
- Navigation, tab-close, audio, Downloads and popup controls use Firefox's original elements.
- Adjustable corners: 0–24px, a rounded 16px default, and an optional native Corner radius menu.
- Optional helpers for centered hover previews and Google new tabs.
- Normal Firefox layout in Customize Toolbar, vertical-tab mode, forced-colors mode and windows narrower than 1000 CSS pixels.

This project does not bundle a Firefox color theme. The colors in the examples come from the capture environment; your installed theme supplies the background and text colors.

## Examples

### Collapsible search

The native address field collapses to a search icon while you browse. Click it or press **Command-L** to expand it; it stays expanded while focused, while suggestions are open, or during search mode. Click back into the webpage to collapse it. Tabs automatically take the freed space. No JavaScript helper is needed.

![Collapsed search icon gives tabs more room](assets/screenshots/search-collapsed.png)

![Expanded native address field while editing](assets/screenshots/search-expanded.png)

### Hover actions

Hover **☰** to reveal the list without clicking. Clicking the same handle still opens Firefox's application menu.

![Vertical hover menu showing Downloads, Extensions, Home, History, and Print, with the account button remaining on the main toolbar](assets/screenshots/hover-actions.png)

### Many tabs

Tabs compact to icons before native scrolling begins. Native tooltips retain the full titles; use **Command-W** or the context menu to close an icon-only tab.

![Favicon-only tabs with native scroll controls](assets/screenshots/compact-tabs.png)

These are actual captures from an isolated headless Firefox 158.0.1 profile with neutral demo tabs. Native macOS traffic lights are not rendered in headless captures. See [screenshot notes](docs/SCREENSHOTS.md).

## Installation

1. Download this repository using **Code → Download ZIP** and extract it.
2. In Firefox, open `about:support` and choose **Profile Folder → Show in Finder**.
3. Create a folder named `chrome` inside that active profile if it does not exist. Back up an existing `userChrome.css` before replacing it.
4. Copy [`chrome/userChrome.css`](chrome/userChrome.css) into that folder. Keep the filename exactly `userChrome.css`.
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
