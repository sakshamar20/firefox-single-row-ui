# Screenshot gallery

These are actual Firefox UI captures, not AI-generated mockups. They were made in a disposable headless Firefox 158.0.1 profile using the packaged CSS, neutral demo tabs and built-in generic icons. Home, History and Print were added through Firefox's normal customization API for the action-list example.

No personal browsing history, account photograph, location, uploaded user screenshots or real profile files were included. The browser automation indicator was hidden for capture; it is not part of an ordinary user session. Native macOS traffic lights are not rendered in headless screenshots. Example colors come from the capture environment, not an included theme.

## Normal toolbar

![Navigation, Search, grouped tabs, hover handle, and account icon](../assets/screenshots/toolbar.png)

## Vertical hover list

![Downloads, Extensions, Home, History and Print as a vertical action list](../assets/screenshots/hover-actions.png)

## Compact tabs with overflow

![Favicon-only tabs and native scrolling](../assets/screenshots/compact-tabs.png)

To add your own screenshots, use a clean browser window, remove personal details, save the image in `assets/screenshots/`, and add a relative Markdown image link to the README. Native screenshot tools can capture only the toolbar to avoid including page content.

The current captures use the rounded 16px default. `radius-4.png` and `radius-16.png` show the same toolbar at two saved radius settings. Native macOS context menus are not rendered in headless screenshot output; these images demonstrate the changed corners rather than the menu itself.
