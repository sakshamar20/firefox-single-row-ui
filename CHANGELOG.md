# Changelog

## 1.5.0

- Replace decorative search and tab outlines with flat, theme-relative translucent fills.
- Add a vertical toolbar-height setting; search, tabs and controls stay centered together.
- Animate Search opening and closing, including ordinary clicks away from and back to an existing new tab; retain reduced-motion and actual-drag safeguards.
- Add short, faint separators only between inactive tabs, clear of selected and multi-selected edges.
- These changes work with CSS alone. Optional helper-only behaviors remain separate.

## 1.4.5

- Handle empty-strip Search activation on primary pointer-down in the session helper.
- Apply a session-only no-drag override to compact tab-strip backgrounds so macOS can deliver pointer events.
- Remove that override when the helper stops; native tab and toolbar button interactions remain excluded.
- This helper update does not change toolbar dimensions or repair an unrelated two-row layout.

## 1.4.4

- Open and focus Search when the session helper receives a primary click in unused space after the last tab.
- Preserve native tab, group, new-tab and scroll controls.
- Align + and tab-list icon/badge surfaces within the tab capsule.
- Anchor the native tab-list popup below the capsule with its right edge inset.

## 1.4.3

- Measure visible native controls in the search-behavior helper and resize the collapsed strip on tab and permission changes.
- Keep single and grouped permission indicators on a uniform 30px pitch.
- Remove the empty site-identity spacer on pages without native identity controls.
- Retain CSS-only fallback widths and native popup interactions.

## 1.4.2

- Align collapsed security, permission and search controls on a shared center line.
- Use 28px targets, 16px icon artwork and 2px spacing with balanced horizontal padding.
- Preserve native visibility and room for multi-indicator controls and warning text.

## 1.4.1

- Remove the entrance/width animation that can replay when a tab is reinserted during reorder.
- Make native drag transforms near-instant while preserving the completion event.
- Reduce the collapsed security strip to 96px and align controls with consistent padding and gaps.
- Retain extra room for legacy security icons and HTTP warning text.

## 1.4.0

- Show a neutral favicon on new tabs at every density.
- Preserve native security, tracking, permission and notification controls in collapsed mode; allow extra room for Not Secure text and expand for pending prompts.
- Keep native security-button clicks from expanding the field through the optional helper.
- Fix downward drag movement by resetting the paired native drag margin.
- Respect native inline tab widths during drag and restore the transform transition required for drop completion.
- Finish address/track resizing before native drag geometry is captured.
- Repair malformed/duplicated blocks from the supplied installation through a complete replacement.

## 1.3.1

- Widen the expanded search field from 260px to 420px; retain the 32px idle icon.
- Put radius, default search state and expanded width settings together at the top.
- Limit oversized expanded-width values to leave space for tabs and side controls.
- Distribute a complete replacement stylesheet and clarify installation to avoid stacking partial layouts.

## 1.3.0

- Add an intermediate 57–140px tab stage with a left favicon and a lighter title fading toward the right.
- Hide close controls in this stage to leave room for the title.
- Delay favicon-only tabs until 56px, then retain native overflow scrolling.
- Add three-stage tab examples.

## 1.2.1

- Add the numeric CSS idle-state toggle `--uc-search-default-open` (0 closed, 1 open).
- Keep search expanded while the engine picker is open.
- Match native focus outlines to the shared radius without removing focus indication.
- Add an optional session helper for strict new-tab closure despite automatic address focus.

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
