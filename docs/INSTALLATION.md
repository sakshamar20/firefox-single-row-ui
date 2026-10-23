# Installation and customization

## Profile layout

```text
[active Firefox profile]
└── chrome
    ├── userChrome.css
    └── userContent.css   (optional)
```

Find the active profile through `about:support` → Profile Folder → Show in Finder. In `about:profiles`, use the Root Directory of the profile marked “This is the profile in use.” The Local Directory under `Library/Caches` does not load the stylesheet.

Save as plain text with exact capitalization. Finder's Get Info → Name & Extension can reveal an accidental `.txt` suffix. Back up any existing stylesheet. Replace the entire file; appending unrelated toolbar customizations can create conflicts.

Enable `toolkit.legacyUserProfileCustomizations.stylesheets` in `about:config`, quit Firefox with Command-Q, then reopen it. Closing a window alone does not reload the CSS.

## Toolbar setup

Use horizontal tabs and keep Reload/Stop, Sidebar, Downloads and Account on the navigation toolbar. The CSS repositions existing widgets; it does not instantiate buttons left in the customization palette. The New Tab and tab-list buttons should remain on the tab toolbar.

Hover ☰ for the vertical secondary-action list. The account/profile icon remains visible to its right. Hovering the left navigation or address field does not open the list. Keyboard focus and open native action popups keep the list accessible. Downloads attention/progress attributes can keep actions revealed while status is active.

The built-in VPN button is hidden. Hiding the button does not disable an active VPN. The optional `userContent.css` only changes Firefox's own start page, not ordinary websites or Google.

## Tuning

The main custom properties are near the top of `userChrome.css`:

- `--uc-address-width`: 260px. The reserved left region follows automatically.
- `--uc-row-height`: 44px.
- `--uc-field-height`: 32px.
- `--uc-traffic-space`: 84px in normal windows and 8px in fullscreen.

Tabs have a 220px maximum, a 40px minimum and an 80px icon-only breakpoint. Media controls may retain additional room. Below the breakpoint the close button is hidden; Command-W and the tab context menu remain available. Selection, native title tooltips, media controls and accessibility labels are retained.

Opening/closing width transitions target 180ms and fades target 140ms. Reduced-motion preferences disable them. The title-to-icon change remains discrete.

The vertical list supplies 24 row positions for ordinary visible toolbar widgets. Keep long toolbars short enough to fit your screen; move excess widgets to Firefox's overflow menu. Specialized composite widgets can retain their own controls rather than a single caption.

## Fullscreen

The compact row supports Firefox's fullscreen CSS state and reserves separate left and middle regions. Native toolbar auto-hide is left intact. Move the pointer to the top when toolbars are hidden. Webpage/video fullscreen keeps Firefox's native layout. A real macOS fullscreen/Spaces transition still needs checking on the specific machine and release.

## Optional Browser Console helpers

The JavaScript files in `optional/` do not run merely because they are copied into `chrome`. They are separate, optional, session-only helpers and are not required for the CSS layout.

1. Set `devtools.chrome.enabled` to true in `about:config` if needed.
2. Return to the browser window you want to modify.
3. Open Tools → Browser Tools → Browser Console (Command-Shift-J). This is different from a webpage's Web Console.
4. Open the desired helper as plain text, copy its complete contents into the console command input and execute. Use Run or Command-Enter in multiline mode.
5. The helper applies until Firefox quits. Run it again after a restart if desired. You may reset `devtools.chrome.enabled` after executing it.

### Center previews

Run `optional/center-tab-previews.js`. It measures the hovered tab and native preview, then adjusts the popup using Firefox's native anchor method. Firefox can still clamp the popup near screen edges. It applies to the most recently used browser window.

Undo before restarting:

```js
Services.wm.getMostRecentWindow("navigator:browser").__ucCenteredTabPreviews?.stop();
```

### Google new tabs

Run `optional/google-new-tabs.js`. Future new tabs open `https://www.google.com/`; existing tabs are not redirected. The default search engine is unchanged.

For persistence across restarts, install [New Tab Override](https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/), open its Preferences/Options through `about:addons`, choose a custom website URL and enter `https://www.google.com/`. Choose website focus to type directly into Google's page search box. Setting a homepage or default search engine alone does not replace the new-tab landing page. Use either the extension or the session helper, rather than competing new-tab overrides.

Undo the helper before restarting:

```js
Services.wm.getMostRecentWindow("navigator:browser").__ucGoogleNewTabs?.stop();
```

## Diagnose a loading problem

Temporarily replace `userChrome.css` with:

```css
#nav-bar { outline: 4px solid magenta !important; outline-offset: -4px !important; }
```

Quit and reopen Firefox. If the border does not appear, check the active profile, Root Directory, filename, plain-text format and preference before changing layout rules. Restore the real stylesheet after checking.

## Roll back

Quit Firefox, restore your backed-up `userChrome.css` or rename it to `userChrome.css.disabled`, then reopen. Remove the optional `userContent.css` if installed. Console helpers stop when Firefox restarts. Disable New Tab Override separately if you installed it.
