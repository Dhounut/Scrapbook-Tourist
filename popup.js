//DEVEN WEEDEN 2026
//the extension menu
chrome.storage.local.get("pics", (r) => {
  const n = (r.pics || []).length;
  document.getElementById("cnt").textContent = n + (n === 1 ? " photo" : " photos") + " collected";
});

document.getElementById("open").addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("scrapbook/scrapbook.html") });
});

document.getElementById("clr").addEventListener("click", () => {
  if (confirm("Clear all photos from the scrapbook?")) {
    chrome.storage.local.set({ pics: [] }, () => window.close());
  }
});
