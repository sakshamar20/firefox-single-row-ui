/* Browser Console helper: keeps automatic new-tab focus from expanding search.
 * Session-only. CSS supplies --uc-search-default-open (0 closed, 1 open).
 * Native keyboard focus, input, engine picker and commands are retained. */
(() => {
  const owner = window.gBrowser ? window : Services.wm.getMostRecentWindow('navigator:browser');
  if (!owner) throw Error('No Firefox browser window found.');
  owner.__ucSearchBehavior?.stop();
  const installed = new Map();
  let active = true;
  const install = win => {
    if (!active || !win.gBrowser || installed.has(win)) return;
    const doc = win.document, root = doc.documentElement;
    const field = doc.getElementById('urlbar-container');
    const cleanups = [];
    const listen = (target, type, fn, capture = false) => {
      target.addEventListener(type, fn, capture);
      cleanups.push(() => target.removeEventListener(type, fn, capture));
    };
    const expand = () => root.setAttribute('uc-search-expanded', 'true');
    const focusSearch = () => {
      expand();
      win.gURLBar.focus();
      win.gURLBar.select();
    };
    const close = () => root.removeAttribute('uc-search-expanded');
    root.setAttribute('uc-search-managed', 'true');
    close();
    // Read the native controls rather than guessing from the current URL or
    // permission count. A permission button can contain several indicators.
    const input = doc.querySelector('#urlbar .urlbar-input-container');
    let frame = 0;
    const sizeCollapsed = () => {
      frame = 0;
      if (!input || field.getBoundingClientRect().width > 196) return;
      const identity = doc.getElementById('identity-box');
      if (identity) identity.toggleAttribute('uc-empty-control', identity.getBoundingClientRect().width === 0);
      const style = win.getComputedStyle(input);
      const visible = [...input.children].filter(node => {
        const css = win.getComputedStyle(node);
        return node.getBoundingClientRect().width > 0 && css.visibility !== 'hidden';
      });
      const width = Math.ceil(visible.reduce((total, node) => {
        const css = win.getComputedStyle(node);
        return total + node.getBoundingClientRect().width +
          (parseFloat(css.marginLeft) || 0) + (parseFloat(css.marginRight) || 0);
      }, 0) + (parseFloat(style.columnGap) || 0) * Math.max(0, visible.length - 1) +
        (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0) +
        (parseFloat(style.borderLeftWidth) || 0) + (parseFloat(style.borderRightWidth) || 0));
      if (width >= 28 && width <= 196) {
        const value = width + 'px';
        if (root.style.getPropertyValue('--uc-address-measured-width') !== value)
          root.style.setProperty('--uc-address-measured-width', value);
      }
    };
    const scheduleSize = () => { if (!frame) frame = win.requestAnimationFrame(sizeCollapsed); };
    const resize = new win.ResizeObserver(scheduleSize);
    resize.observe(field);
    if (input) {
      resize.observe(input);
      for (const child of input.children) resize.observe(child);
    }
    const changes = new win.MutationObserver(scheduleSize);
    changes.observe(field, { subtree: true, childList: true, attributes: true,
      attributeFilter: ['hidden', 'class', 'sharing', 'blocked', 'open', 'pageproxystate', 'value'] });
    listen(win.gBrowser.tabContainer, 'TabSelect', scheduleSize);
    listen(win, 'resize', scheduleSize);
    cleanups.push(() => {
      resize.disconnect(); changes.disconnect();
      if (frame) win.cancelAnimationFrame(frame);
      root.style.removeProperty('--uc-address-measured-width');
      doc.getElementById('identity-box')?.removeAttribute('uc-empty-control');
    });
    scheduleSize();
    listen(win, 'pointerdown', event => {
      if (event.composedPath().some(node => node.matches?.('#trust-icon-container, #tracking-protection-icon-container, #identity-box, #notification-popup-box'))) return;
      if (event.composedPath().includes(field)) expand();
      else close();
    }, true);
    // macOS can consume clicks on draggable titlebar backgrounds. Mark only
    // compact-strip backgrounds as no-drag while this helper is active.
    // This stylesheet never changes dimensions or toolbar placement.
    const clickSurfaceStyle = doc.createElementNS('http://www.w3.org/1999/xhtml', 'style');
    clickSurfaceStyle.textContent = `@media (min-width: 1000px) and (not (forced-colors: active)) {
      :root[uc-search-managed]:not([customizing], [chromehidden], [inDOMFullscreen]):not(:has(#tabbrowser-tabs[orient="vertical"])):dir(ltr)
      :is(#TabsToolbar-customization-target, #tabbrowser-tabs, #tabbrowser-arrowscrollbox,
          #tabbrowser-arrowscrollbox-periphery, .closing-tabs-spacer) {
        -moz-window-dragging: no-drag !important;
      }
    }`;
    root.append(clickSurfaceStyle);
    cleanups.push(() => clickSurfaceStyle.remove());
    // Only the unused strip AFTER the last visible tab acts as Search.
    // Native tabs, new-tab/list buttons, scroll arrows and drag gestures stay native.
    const strip = doc.getElementById('TabsToolbar-customization-target');
    listen(strip, 'pointerdown', event => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey ||
          event.altKey || event.shiftKey || win.getComputedStyle(doc.getElementById('navigator-toolbox')).display !== 'grid') return;
      if (event.composedPath().some(node => node.matches?.('.tabbrowser-tab, tab-group, .tab-group-label-container, toolbarbutton, button, [role=button], splitter, .scrollbutton-up, .scrollbutton-down'))) return;
      const area = strip.getBoundingClientRect();
      const tabs = [...win.gBrowser.visibleTabs].map(tab => tab.getBoundingClientRect()).filter(r => r.width > 0);
      const lastRight = Math.max(area.left, ...tabs.map(r => r.right));
      const controls = ['new-tab-button', 'alltabs-button'].map(id => doc.getElementById(id)?.getBoundingClientRect()).filter(r => r?.width > 0);
      const end = Math.min(area.right, ...controls.map(r => r.left));
      if (event.clientX > lastRight && event.clientX < end && event.clientY >= area.top && event.clientY <= area.bottom) {
        event.preventDefault();
        event.stopPropagation();
        focusSearch();
      }
    }, true);
    // Native tab-list popup opens below the capsule, with its right edge
    // inside the capsule rather than projecting across the menu/profile buttons.
    const alignTabList = event => {
      const panel = event.target;
      if (panel.localName !== 'panel' || panel.getAttribute('viewId') !== 'allTabsMenu-allTabsView' ||
          win.getComputedStyle(doc.getElementById('navigator-toolbox')).display !== 'grid') return;
      panel.moveToAnchor(strip, 'bottomright topright', -2, 4);
    };
    listen(doc, 'popupshown', alignTabList, true);
    listen(win, 'keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'l') expand();
      else if (event.key === 'Tab') win.requestAnimationFrame(() => {
        if (field.contains(doc.activeElement)) expand();
      });
      else if (event.composedPath().includes(field)) {
        if (event.key === 'Escape') close();
        else if (!['Shift', 'Meta', 'Control', 'Alt'].includes(event.key)) expand();
      }
    }, true);
    listen(doc.getElementById('Browser:OpenLocation'), 'command', expand, true);
    listen(win.gBrowser.tabContainer, 'TabSelect', close);
    installed.set(win, () => {
      cleanups.forEach(fn => fn());
      root.removeAttribute('uc-search-managed');
      close();
    });
  };
  for (const win of Services.wm.getEnumerator('navigator:browser')) install(win);
  const observer = { observe(win) { win.addEventListener('load', () => install(win), { once: true }); } };
  Services.obs.addObserver(observer, 'domwindowopened');
  owner.__ucSearchBehavior = { stop() {
    active = false;
    Services.obs.removeObserver(observer, 'domwindowopened');
    for (const cleanup of installed.values()) cleanup();
    installed.clear();
    delete owner.__ucSearchBehavior;
  } };
  return 'Search behavior enabled for this session. Click search, the empty tab strip, or press Command-L to expand.';
})();
