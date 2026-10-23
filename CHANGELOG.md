# Changelog

## 1.2.0

- Collapse the native address field to a 32px search icon while browsing.
- Click or Command-L expands it to 260px; focus, suggestions and search mode keep it open.
- Give freed space to tabs, with reduced-motion support and native-layout fallbacks.
- Add collapsed and expanded screenshots.

## 1.1.4

- Match search-menu highlight corners to the shared radius, including focused rows.
- Give the inner search button a radius one pixel smaller, clamped at zero.
- Verified 0, 1, 4, 16 and 24px settings and popup opening.

## 1.1.3

- Make the search-engine dropdown panel and list follow the shared corner radius.
- Verified live 0px, 4px and 16px values and native popup opening.

## 1.1.2

- Make the inner native search-engine selector background follow the saved radius using its exposed button part.
- Preserve the rounded 16px default and native search-engine popup behavior.

## 1.1.1

- Restore the rounded 16px default; keep all radius presets and custom values available.
- Reset now restores 16px. Existing saved choices remain respected.

## 1.1.0

- One shared corner-radius setting with a less rounded 8px default.
- Native tab/toolbar context-menu presets, custom 0–24px values, and Reset through an optional session helper.
- Saved radius applies after restart without loading the helper.
- Updated address-background selector for recent Firefox UI.

## 1.0.0

Initial public project package, based on the ninth local iteration.

- Compact single-row Firefox toolbar for macOS.
- Left navigation and short Search prompt, central adaptive tabs, right hover actions and persistent account icon.
- Flat theme-relative translucent styling and rounded selection/close controls.
- Optional session helpers for centered previews and Google new tabs.
- Installation, rollback and compatibility documentation, plus three clean sample captures.
