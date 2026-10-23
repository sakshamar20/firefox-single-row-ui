/* Optional session-only Firefox Browser Console helper.
 * Centers the native preview under its current tab. No loader/install needed.
 * Run again after restarting Firefox; applies to the most recent window.
 */
(() => {
  const win = window.gBrowser ? window : Services.wm.getMostRecentWindow("navigator:browser");
  const panel = win?.document.getElementById("tab-preview-panel");
  if (!panel) throw new Error("No Firefox tab-preview panel found.");
  win.__ucCenteredTabPreviews?.stop();
  let frame = 0;
  let busy = false;
  const center = () => {
    frame = 0;
    if (busy || panel.state !== "open") return;
    const tab = panel.anchorNode?.closest?.(".tabbrowser-tab") ||
      win.gBrowser.tabContainer.querySelector(".tabbrowser-tab:hover");
    if (!tab) return;
    const offset = (tab.getBoundingClientRect().width - panel.getBoundingClientRect().width) / 2;
    busy = true;
    panel.moveToAnchor(tab, "bottomleft topleft", offset, 0);
    win.requestAnimationFrame(() => { busy = false; });
  };
  const schedule = () => {
    if (!frame && !busy) frame = win.requestAnimationFrame(center);
  };
  const observer = new win.MutationObserver(schedule);
  observer.observe(panel, { childList: true, characterData: true, subtree: true });
  panel.addEventListener("popupshown", schedule);
  panel.addEventListener("TabPreviewUpdated", schedule);
  win.gBrowser.tabContainer.addEventListener("mouseover", schedule);
  win.addEventListener("resize", schedule);
  win.__ucCenteredTabPreviews = {
    stop() {
      observer.disconnect();
      panel.removeEventListener("popupshown", schedule);
      panel.removeEventListener("TabPreviewUpdated", schedule);
      win.gBrowser.tabContainer.removeEventListener("mouseover", schedule);
      win.removeEventListener("resize", schedule);
      if (frame) win.cancelAnimationFrame(frame);
      delete win.__ucCenteredTabPreviews;
    }
  };
  schedule();
  return "Centered tab previews enabled for this Firefox window until restart.";
})();
