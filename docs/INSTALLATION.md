# Setup and customization

## Install the CSS

1. Download the repository ZIP and extract it.
2. In Firefox, open `about:support` → **Profile Folder → Show in Finder**. Use the active profile’s Root Directory, not its cache directory.
3. Back up your existing `chrome/userChrome.css`. Copy this repository’s `chrome/userChrome.css` into that folder, replacing the whole file. Create `chrome` if needed. Save as plain text with the exact filename.
4. In `about:config`, set `toolkit.legacyUserProfileCustomizations.stylesheets` to **true**.
5. Quit Firefox completely with **Cmd + Q**, then reopen it.

Use horizontal tabs. Keep Reload/Stop, Sidebar, Downloads and Account on the navigation toolbar, and keep New Tab next to the tabs through Firefox’s **Customize Toolbar**. The compact layout falls back to Firefox’s native arrangement in narrow windows, vertical tabs and Customize mode. `userContent.css` is optional and only styles Firefox’s start page.

Hover over ☰ briefly for the compact tools palette. Clicking ☰ opens Firefox’s own menu. An open extension or Downloads popup keeps its toolbar anchor available. The + follows the last tab and switches to the right edge when tabs overflow. Tiny tabs keep their favicon on hover; X appears when there is enough width.

## Customize

The settings are together at the top of `userChrome.css`. Edit, save, then fully quit and reopen Firefox.

| Setting | Purpose |
| --- | --- |
| `--uc-corner-radius` | Overall corners; 11px by default. |
| `--uc-toolbar-height` | Whole-row height: 40px compact, 44px normal, 48px roomy. |
| `--uc-bar-padding-y` | Space outside Search and the tab bar; lower values make the bars taller. |
| `--uc-tab-highlight-block-inset` | Space above/below each tab highlight; 1px keeps a small inset. |
| `--uc-tab-gap` | Total gap between neighboring highlights; 3px by default. |
| `--uc-menu-row-height` | Tools-palette row height. Icons and labels share a vertical center. |
| `--uc-x-right-gap` | Space between X and the visible tab highlight’s right edge. |
| `--uc-x-radius`, `--uc-x-size`, `--uc-x-icon-padding` | Close-button corners, size and glyph padding. |
| `--uc-close-opacity`, `--uc-plus-opacity` | 0 is transparent; 1 is fully visible. This also fades button backgrounds. |
| `--uc-tab-border-thickness`, `--uc-tab-border-opacity` | Selected/hover outlines; opacity is 0% by default, 100% is solid. |
| `--uc-search-default-open` | 0 collapses Search while idle; 1 keeps it expanded. A saved switch choice takes precedence. |
| `--uc-address-expanded-width` | Expanded Search width, limited to leave room for the toolbar. |
| `--uc-search-animation-duration` | Search motion duration; 0ms disables it. Reduced motion is respected. |
| `--uc-internal-search-delay` | Wait before internal-page expansion; 400ms helps avoid losing the animation while Settings initializes. This cannot prevent all startup stalls. |
| `--uc-actions-hover-delay` | Dwell before the tools palette opens; 300ms by default. |

Internal Firefox pages with the Firefox identity pill automatically expand Search. Normal websites follow your usual Search setting. Native connection, tracking, permission and notification controls remain available; Firefox determines which apply to the page. CSS alone uses a conservative collapsed width. The optional helper measures the actual visible controls and distinguishes automatic new-tab focus from an intentional Search command.

## Saved Search switch

This optional helper adds a tiny vertical switch beside Search. It saves the expanded/collapsed idle choice in `userChrome.singleRow.searchAlwaysOpen`, shared across windows. The CSS reads that choice on later starts, even without the helper. The helper also enables dynamic icon sizing, strictly collapsed new tabs and clicking unused space after the final tab to focus Search.

### Automatic startup — one-time setup on macOS

1. Put `optional/search-toggle.uc.js` in the active profile’s `chrome` folder beside `userChrome.css`.
2. Quit Firefox. In Finder, open **Applications → Firefox → Show Package Contents → Contents → Resources**.
3. Copy `optional/startup/single-row.cfg` into `Resources`.
4. Copy `optional/startup/defaults/pref/single-row-autoconfig.js` into `Resources/defaults/pref`. Create those folders if missing. Finder may request your Mac password.
5. Reopen Firefox. The switch should appear beside Search.

If you already use AutoConfig/userChromeJS, load the helper through that setup instead of adding a competing `general.config.filename`. Do not overwrite existing configuration. Firefox app replacement or updates can remove the two application files; restore them if needed. Existing users of this project’s `search-toggle.uc.js` startup setup can replace that profile helper and the CSS without reinstalling the startup files.

The hook runs only the named local file, with browser UI privileges, and skips Troubleshoot Mode. It loads no remote code. `general.config.sandbox_enabled = false` enables the AutoConfig hook’s privileged API access; it does not disable website process sandboxing. This is an advanced Firefox customization. The hook uses a per-call local-file loader option, without changing global unrestricted-script-load preferences. See [Mozilla’s AutoConfig guide](https://support.mozilla.org/en-US/kb/customizing-firefox-using-autoconfig).

### Optional Browser Console helpers

To try the helper without startup installation, set `devtools.chrome.enabled` to true in `about:config`, open **Tools → Browser Tools → Browser Console** (Cmd + Shift + J), paste the entire `optional/search-toggle.uc.js`, and run it. This is not a webpage console. The switch lasts for that session; its saved choice persists. You can reset `devtools.chrome.enabled` afterward.

`optional/search-behavior.js` is a compatibility copy of the same helper. Run one, not both. Re-running replaces the previous installation. To stop it in the session, run this in its owner browser window:

```js
window.__ucSearchBehavior?.stop();
```

The other helpers are independent and session-only: `corner-radius-menu.js` adds radius choices to tab/toolbar context menus, `center-tab-previews.js` adjusts tab previews, and `google-new-tabs.js` temporarily changes the new-tab page. Copying them into `chrome` does not automatically load them. The radius choice is saved in `userChrome.singleRow.cornerRadius` (whole numbers 0–24) and overrides the CSS default; reset that preference to return to the stylesheet’s default.

## Tab actions and removal

Firefox’s native double-click-to-close preference is separate: set `browser.tabs.closeTabByDblclick` to true in `about:config` for an already-selected tab. Tiny tabs can also be closed with Cmd + W or their context menu.

To undo the theme, quit Firefox and restore your backed-up CSS or rename it to `userChrome.css.disabled`. Remove the optional profile helper and, if installed, only this project’s `single-row.cfg` and `single-row-autoconfig.js` from the Firefox application. Reopen Firefox. Reset `userChrome.singleRow.searchAlwaysOpen` and `userChrome.singleRow.cornerRadius` if you also want to discard saved choices. Disable any separately installed new-tab extension on its own.
