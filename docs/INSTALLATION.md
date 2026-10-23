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

## Collapsible search

Replace the installed `userChrome.css` with the current complete file; do not append another copy of an older collapsible-search section. Preserve your chosen `--uc-corner-radius` default when replacing it.

The user settings at the top contain:

```css
:root {
  --uc-corner-radius: 16px;
  --uc-search-default-open: 0;
  --uc-address-expanded-width: 420px;
}
```

Set `--uc-search-default-open` to **0** for closed while idle (default), or **1** for open while idle. The search field still opens during use in either setting. Collapsed mode preserves Firefox's connection/site-info, tracking, permissions and notification anchors. It reserves 96px (120px in older layouts), or 176px where the native Not Secure text needs room. Pending permission prompts temporarily expand it. Firefox controls which icons apply to the current page; the CSS does not invent a security status. Change `--uc-address-expanded-width` to adjust the expanded field; the layout limits oversized values to leave room for tabs and side controls. Fully quit/reopen Firefox after editing.

**Strictly closed on new tabs:** follow the Browser Console steps below and run `optional/search-behavior.js`. Firefox automatically focuses new-tab address fields, and CSS cannot distinguish that from an intentional focus command. This session helper handles that distinction: new tabs stay closed, clicking the icon or Command-L opens the field, typing and keyboard navigation remain native, and clicking the webpage closes it. Run it again after restarting Firefox. Copying the JS file to `chrome` does not load it automatically.

Without the helper the CSS idle toggle works, but automatic new-tab focus can still expand the field. The engine picker stays expanded while its menu is open. Focus outlines keep their native color and use the shared radius.

To remove the helper during a session:

```js
Services.wm.getMostRecentWindow("navigator:browser").__ucSearchBehavior?.stop();
```

## Tuning

The main custom properties are near the top of `userChrome.css`:

- `--uc-address-expanded-width`: 420px in the user settings at the top of the file. The default collapsed width is 96px for native security controls plus search (176px on HTTP warning pages); the reserved left region follows automatically.
- `--uc-row-height`: 44px.
- `--uc-field-height`: 32px.
- `--uc-traffic-space`: 84px in normal windows and 8px in fullscreen.

Tabs have a 220px maximum and a 40px minimum. Above 140px titles use the native presentation. At 57–140px the favicon stays left, the close control hides to free space, and a lighter title fades from left to right. At 56px and below only centered favicons/status indicators remain. Media controls may retain additional room. In the two compact stages the close button is hidden; Command-W and the tab context menu remain available. Selection, native title tooltips, media controls and accessibility labels are retained.

Tab entrance and width transitions are disabled so reordering does not replay a growing tab. Native drag completion uses a 1ms transform transition; reduced-motion mode disables it through the native reduced-motion path. The title-to-icon change remains discrete.

The vertical list supplies 24 row positions for ordinary visible toolbar widgets. Keep long toolbars short enough to fit your screen; move excess widgets to Firefox's overflow menu. Specialized composite widgets can retain their own controls rather than a single caption.

## Corner radius

The default is **16px**. To change it from a menu:

1. Replace your installed `chrome/userChrome.css` with the updated file and fully quit/reopen Firefox.
2. Follow the Browser Console helper steps below and run `optional/corner-radius-menu.js`.
3. Right-click a tab or an empty toolbar area and choose **Corner radius**. You can also right-click the menu handle.
4. Choose **Square (0px)**, **Subtle (4px)**, **Soft (8px)**, **Rounded (12px)**, **Very rounded (16px)**, **Pill (24px)**, or **Custom…**. Custom values are whole numbers from 0 to 24. Reset restores 16px.

The change applies immediately to the address field, shared tab region, tab selection, close controls, toolbar button shapes and hover-action panel. Native macOS window corners, traffic lights, profile photos and system-drawn context menus keep their platform shapes. Other websites are unaffected.

Your choice is saved in `userChrome.singleRow.cornerRadius` and applies after a restart, even without the helper. The menu is session-only: run the helper again after restarting to restore its menu entries. This project does not install a privileged startup loader.

**Without the helper:** open `about:config`, search for `userChrome.singleRow.cornerRadius`, select **Number**, click **+**, and enter a whole number from 0 to 24. An existing Number preference can be edited directly. Delete/reset it to restore the 16px default. Values outside this range fall back to 16px. This preference is supplied by this stylesheet, not a built-in Firefox setting.

To remove the menu during a session (the chosen radius remains saved):

```js
Services.wm.getMostRecentWindow("navigator:browser").__ucCornerRadiusMenu?.stop();
```

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

## Replacing a broken or duplicated file

Replace the entire installed `chrome/userChrome.css` with the packaged file. Do not merge the old favicon block or older collapse sections into it. Unclosed braces can accidentally nest the rest of the layout inside a favicon selector. Your saved radius preference remains separate; if you edited the CSS default directly, copy that one setting into the new settings block. Reload the updated `optional/search-behavior.js` helper after replacing the stylesheet if you use strict new-tab closure.

## Diagnose a loading problem

Temporarily replace `userChrome.css` with:

```css
#nav-bar { outline: 4px solid magenta !important; outline-offset: -4px !important; }
```

Quit and reopen Firefox. If the border does not appear, check the active profile, Root Directory, filename, plain-text format and preference before changing layout rules. Restore the real stylesheet after checking.

## Roll back

Quit Firefox, restore your backed-up `userChrome.css` or rename it to `userChrome.css.disabled`, then reopen. Remove the optional `userContent.css` if installed. Console helpers stop when Firefox restarts. Disable New Tab Override separately if you installed it.
