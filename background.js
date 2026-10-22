//DEVEN WEEDEN 2026
//service worker

function isWeb(t) {
  return t && t.url && t.url.startsWith("http");
}

function send(id, msg) {
  chrome.tabs.sendMessage(id, msg, () => {
    if (chrome.runtime.lastError) return;
  });
}

async function moveTo(id) {
  const r = await chrome.storage.session.get("cur");
  if (r.cur && r.cur !== id) send(r.cur, { cmd: "despawn" });
  chrome.storage.session.set({ cur: id });
  send(id, { cmd: "spawn" });
}

function moveToAct(q) {
  chrome.tabs.query(q, (tabs) => {
    if (isWeb(tabs[0])) moveTo(tabs[0].id);
  });
}

chrome.tabs.onActivated.addListener((info) => {
  chrome.tabs.get(info.tabId, (t) => {
    if (isWeb(t)) moveTo(t.id);
  });
});

chrome.windows.onFocusChanged.addListener((win) => {
  if (win !== chrome.windows.WINDOW_ID_NONE) moveToAct({ active: true, windowId: win });
});

chrome.tabs.onRemoved.addListener(() => {
  moveToAct({ active: true, currentWindow: true });
});

chrome.runtime.onMessage.addListener((m, snd) => {
  const t = snd.tab;
  if (m.cmd === "ready" && t.active) moveTo(t.id);
  if (m.cmd === "snap") save(t);
});

//save the tab to the scrapbook
async function save(t) {
  const img = await chrome.tabs.captureVisibleTab(t.windowId, { format: "jpeg", quality: 60 });
  const r = await chrome.storage.local.get("pics");
  const pics = r.pics || [];
  pics.push({ ts: Date.now(), img: img, url: t.url, ttl: t.title });
  chrome.storage.local.set({ pics: pics });
}
