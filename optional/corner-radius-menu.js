/* Optional Firefox Browser Console helper.
 * Adds Corner radius to the native toolbar and tab context menus.
 * The menu lasts for this session; the saved radius persists and is read
 * directly by the accompanying userChrome.css, including after restart.
 */
(() => {
  const owner = window.gBrowser ? window : Services.wm.getMostRecentWindow("navigator:browser");
  if (!owner) throw new Error("No Firefox browser window found.");
  owner.__ucCornerRadiusMenu?.stop();
  const pref = "userChrome.singleRow.cornerRadius";
  const presets = [[0, "Square"], [4, "Subtle"], [8, "Soft — default"],
    [12, "Rounded"], [16, "Very rounded"], [24, "Pill"]];
  const installed = new Map();
  const synchronizers = new Set();
  let active = true;
  const read = () => {
    const n = Services.prefs.getIntPref(pref, 8);
    return Number.isInteger(n) && n >= 0 && n <= 24 ? n : 8;
  };
  const set = n => Services.prefs.setIntPref(pref, n);
  const custom = win => {
    const value = { value: String(read()) };
    if (!Services.prompt.prompt(win, "Corner radius", "Radius in CSS pixels (whole number, 0–24):",
      value, null, { value: false })) return;
    const text = value.value.trim();
    if (!/^\d{1,2}$/.test(text) || Number(text) > 24) {
      Services.prompt.alert(win, "Corner radius", "Enter a whole number from 0 to 24.");
      return;
    }
    set(Number(text));
  };
  const install = win => {
    if (!active || !win.gBrowser || installed.has(win)) return;
    const nodes = [];
    const listeners = [];
    for (const parentId of ["toolbar-context-menu", "tabContextMenu"]) {
      const parent = win.document.getElementById(parentId);
      if (!parent) continue;
      const separator = win.document.createXULElement("menuseparator");
      const menu = win.document.createXULElement("menu");
      menu.id = "uc-corner-radius-" + parentId;
      menu.setAttribute("label", "Corner radius");
      const popup = win.document.createXULElement("menupopup");
      const items = [];
      for (const [n, label] of presets) {
        const item = win.document.createXULElement("menuitem");
        item.setAttribute("label", `${label} (${n}px)`);
        item.setAttribute("type", "radio");
        item.setAttribute("name", menu.id + "-value");
        item.setAttribute("data-radius", n);
        item.addEventListener("command", () => set(n));
        popup.append(item);
        items.push(item);
      }
      popup.append(win.document.createXULElement("menuseparator"));
      const customItem = win.document.createXULElement("menuitem");
      customItem.setAttribute("label", "Custom…");
      customItem.addEventListener("command", () => custom(win));
      const reset = win.document.createXULElement("menuitem");
      reset.setAttribute("label", "Reset to default (8px)");
      reset.addEventListener("command", () => Services.prefs.clearUserPref(pref));
      popup.append(customItem, reset);
      const sync = () => {
        const current = read();
        for (const item of items) {
          if (Number(item.getAttribute("data-radius")) === current) item.setAttribute("checked", "true");
          else item.removeAttribute("checked");
        }
        customItem.setAttribute("label", `Custom… (current: ${current}px)`);
      };
      const showing = event => {
        if (event.target === popup || event.target === parent) sync();
      };
      parent.addEventListener("popupshowing", showing);
      listeners.push(() => parent.removeEventListener("popupshowing", showing));
      synchronizers.add(sync);
      listeners.push(() => synchronizers.delete(sync));
      sync();
      menu.append(popup);
      parent.append(separator, menu);
      nodes.push(separator, menu);
    }
    installed.set(win, { nodes, listeners });
  };
  for (const win of Services.wm.getEnumerator("navigator:browser")) install(win);
  const preferenceObserver = { observe() {
    for (const sync of synchronizers) sync();
  } };
  Services.prefs.addObserver(pref, preferenceObserver);
  const observer = { observe(win) {
    win.addEventListener("load", () => install(win), { once: true });
  } };
  Services.obs.addObserver(observer, "domwindowopened");
  owner.__ucCornerRadiusMenu = {
    stop() {
      active = false;
      Services.obs.removeObserver(observer, "domwindowopened");
      Services.prefs.removeObserver(pref, preferenceObserver);
      for (const { nodes, listeners } of installed.values()) {
        for (const remove of listeners) remove();
        for (const node of nodes) node.remove();
      }
      installed.clear();
      delete owner.__ucCornerRadiusMenu;
    }
  };
  return "Corner radius menu added. Right-click the toolbar or a tab. Radius choices persist after restart.";
})();
