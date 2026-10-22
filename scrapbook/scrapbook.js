//DEVEN WEEDEN 2026
const wall = document.getElementById("wall");
const empty = document.getElementById("empty");
const tpl = document.getElementById("tpl");

function fmt(ts) {
  return new Date(ts).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

function card(p, fade) {
  const slot = tpl.content.firstElementChild.cloneNode(true);
  const pic = slot.querySelector(".pic");
  const cap = slot.querySelector(".cap");

  slot.dataset.id = p.ts;
  if (fade) pic.classList.add("new");
  slot.querySelector("img").src = p.img;
  slot.querySelector(".date").textContent = fmt(p.ts);
  cap.textContent = p.ttl;
  cap.title = p.url;
  slot.querySelector(".del").addEventListener("click", () => del(p.ts, pic));
  return slot;
}

function sync(pics, fade) {
  const ids = pics.map((p) => String(p.ts));

  for (const slot of Array.from(wall.children)) {
    if (!ids.includes(slot.dataset.id)) slot.remove();
  }
  for (const p of pics) {
    if (!wall.querySelector('[data-id="' + p.ts + '"]')) wall.prepend(card(p, fade));
  }

  wall.hidden = pics.length === 0;
  empty.hidden = pics.length > 0;
}

function del(ts, pic) {
  pic.classList.add("gone");

  setTimeout(() => {
    chrome.storage.local.get("pics", (r) => {
      chrome.storage.local.set({ pics: (r.pics || []).filter((p) => p.ts !== ts) });
    });
  }, 500);
}

chrome.storage.local.get("pics", (r) => {
  sync(r.pics || [], false);
  wall.focus();
});

chrome.storage.onChanged.addListener((chg, area) => {
  if (area !== "local" || !chg.pics) return;
  sync(chg.pics.newValue || [], true);
});
