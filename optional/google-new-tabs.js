/* Firefox Browser Console helper — session-only, no startup loader.
 * Changes future new tabs to the real Google homepage. CSS cannot navigate.
 * Run again after restarting Firefox, or use a signed new-tab extension
 * for a persistent setting. Does not redirect existing tabs or websites.
 */
(() => {
  const win = window.gBrowser ? window : Services.wm.getMostRecentWindow("navigator:browser");
  if (!win?.AboutNewTab) throw new Error("Firefox's new-tab service is unavailable in this version.");
  win.__ucGoogleNewTabs?.stop();
  const service = win.AboutNewTab;
  const previous = service.newTabURL;
  service.newTabURL = "https://www.google.com/";
  win.__ucGoogleNewTabs = {
    stop() {
      if (service.newTabURL === "https://www.google.com/") service.newTabURL = previous;
      delete win.__ucGoogleNewTabs;
    }
  };
  return "Future new tabs now open https://www.google.com/ until Firefox restarts.";
})();
