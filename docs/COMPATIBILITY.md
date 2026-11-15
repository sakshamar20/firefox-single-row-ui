# Compatibility

Made for macOS Firefox with left-to-right horizontal tabs. The compact row applies at widths of 1000 CSS pixels and above. Narrow windows, vertical tabs, Customize mode, chromeless windows and video fullscreen retain native layouts. Forced-colors mode uses native presentation. Reduced motion is respected. This is unsupported Firefox UI customization; internal selectors may change after Firefox updates.

## Validation

The original 1.5.0 layout was checked in isolated headless Firefox 158.0.1. The 1.6.0 changes were checked in disposable Firefox 160.0 profiles on macOS:

- Square pinned backgrounds with centered favicons; matching hover/selection geometry; equal separator gaps, hidden beside selected or hovered tabs.
- Close controls across compact and wide widths, real pointer close, rounded-square corners, and adjustable measured edge gap.
- Native pointer clicks select 40/56/72px tabs without closing them. Wider tabs retain the hover X. Compact titles keep their favicon gap and reserved close-button space.
- Coordinated 40/44/48px toolbar heights; icon and label centers matched across all six standard tools-palette rows at two row heights.
- Hover dwell, native menu exclusion, Extensions panel retention, and a real no-permission test extension’s popup remaining open after pointer exit.
- One + button visible at a time: after the final tab with 1/3/14 tabs, then at the right edge with 40 overflowing tabs; native + click opened a tab.
- Saved Search choice, idempotent helper loading, new-window installation and synchronization. Automatic startup and persistence were exercised in a disposable Firefox application copy, without modifying the user’s installed app.
- Internal-page automatic expansion and frame timing. Settings startup can block the UI longer than a width animation; the configurable delay is a mitigation, not a guarantee of smooth frames on every machine.

## Limits

Real macOS fullscreen/Spaces transitions, OS drag-and-drop and every installed third-party extension have not been exhaustively verified. Native popup anchoring can be clamped by screen edges. Main-thread stalls can skip layout animation frames. The palette positions up to 24 ordinary widgets; keep it short enough to fit your screen. Specialized composite widgets may retain their own presentation.

CSS alone cannot create a saved switch, distinguish every automatic focus event, or implement unused-strip clicks. The optional privileged helper handles those behaviors. It has no network requests and makes no website-security preference changes. Startup files are opt-in and can need reinstalling after Firefox app replacement.

The package contains no Firefox profile data, cookies, passwords, browsing history or personal user screenshots. All published captures use disposable profiles and neutral demo content. See [the setup guide](INSTALLATION.md) for installation, settings and undo steps.
