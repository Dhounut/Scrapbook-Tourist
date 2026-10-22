//DEVEN WEEDEN 2026
(() => {
  const S = D.spr;
  const W = S.w * S.scl;
  const H = S.h * S.scl;
  const tick = 33;

  let mood = null;
  let alive = false;
  let x = 0;
  let box = null;
  let bub = null;
  let el = null;
  let timers = [];
  let doing = null;
  let anim = null;
  let animTmr = 0;
  let walkTmr = 0;
  let doneTmr = 0;
  let bubTmr = 0;

  function pick(a) {
    return a[Math.floor(Math.random() * a.length)];
  }

  function clamp(v) {
    const max = window.innerWidth - W - 5;
    if (v < 5) return 5;
    if (v > max) return max;
    return v;
  }

  function setX(v) {
    x = v;
    box.style.left = v + "px";
  }

  function say(t, ms = 3000) {
    bub.textContent = t;
    bub.classList.add("on");
    clearTimeout(bubTmr);
    bubTmr = setTimeout(() => bub.classList.remove("on"), ms);
  }

  //sprite sheet
  function frame(a, f) {
    el.style.backgroundPosition = -f * W + "px " + -a.row * H + "px";
  }

  function play(name, done) {
    const a = S.anims[name];
    if (name === anim && a.loop) return;

    clearInterval(animTmr);
    anim = name;
    let f = 0;
    frame(a, f);
    animTmr = setInterval(() => {
      f++;
      if (f < a.n) {
        frame(a, f);
      } else if (a.loop) {
        f = 0;
        frame(a, f);
      } else {
        clearInterval(animTmr);
        if (done) done();
      }
    }, 1000 / a.fps);
  }

  function face(dir) {
    el.style.transform = dir < 0 ? "scaleX(-1)" : "";
  }

  function busy(what) {
    doing = what;
    clearInterval(walkTmr);
    clearTimeout(doneTmr);
  }

  function free() {
    busy(null);
    play("idle");
  }

  function fidget() {
    play(pick(["brow", "blink"]), () => play("idle"));
  }

  function walk(ms, cb) {
    if (doing) return;

    let dir = Math.random() < 0.5 ? -1 : 1;
    let n = Math.round(ms / tick);
    busy("walk");
    face(dir);
    play("walk");

    walkTmr = setInterval(() => {
      const nx = x + dir * S.scl;
      setX(clamp(nx));
      if (x !== nx) {  //hit the edge
        dir = -dir;
        face(dir);
      }
      n--;
      if (n <= 0) {
        free();
        cb();
      }
    }, tick);
  }

  function roam() {
    walk(300 + Math.random() * 1400, fidget);
  }

  function snap() {
    if (doing === "snap") return;

    busy("snap");
    play("snap", free);
    say(pick(mood.snap || D.snap));
    chrome.runtime.sendMessage({ cmd: "snap" });
  }

  function poke(cx) {
    const dir = cx > x + W / 2 ? -1 : 1;
    busy("poke");
    setX(clamp(x + dir * 20));
    face(dir);
    say(pick(D.poke), 2500);
    doneTmr = setTimeout(free, 500);
  }

  function chat() {
    if (Math.random() < 0.3) say(pick(mood.idle));
  }

  function getMood() {
    const txt = (document.title + " " + document.body.innerText.slice(0, 5000)).toLowerCase();
    const cnt = {};
    for (const w of txt.split(/[^a-z0-9]+/)) {
      cnt[w] = (cnt[w] || 0) + 1;
    }

    let best = null;
    let top = 0;
    for (const name in D.cats) {
      const c = D.cats[name];
      let s = 0;
      for (const w of c.words) {
        s += Math.min(cnt[w] || 0, 5);
      }
      if (s > top) {
        top = s;
        best = c;
      }
    }

    if (top < 3) return D.def;
    return best;
  }

  function make() {
    box = document.createElement("div");
    bub = document.createElement("div");
    el = document.createElement("div");
    box.id = "st-box";
    bub.id = "st-bub";
    el.id = "st-spr";
    box.append(bub, el);
    document.body.append(box);

    el.style.width = W + "px";
    el.style.height = H + "px";
    el.style.backgroundImage = "url(" + chrome.runtime.getURL(S.sheet) + ")";
    el.style.backgroundSize = S.cols * W + "px auto";

    el.addEventListener("mousedown", (e) => e.preventDefault());
    el.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (doing !== "snap") poke(e.clientX);
    });
    window.addEventListener("resize", () => setX(clamp(x)));
  }

  function spawn() {
    if (alive) return;
    alive = true;

    if (!box) make();
    box.style.display = "";
    setX(clamp(Math.random() * window.innerWidth));
    play("idle");

    mood = getMood();
    say(pick(mood.hi), 4000);

    timers = [
      setInterval(roam, 4000),
      setInterval(snap, 5000 / mood.rate),
      setInterval(chat, 15000)
    ];
  }

  function despawn() {
    if (!alive) return;
    alive = false;
    timers.forEach(clearInterval);
    busy(null);
    box.style.display = "none";
  }

  chrome.runtime.onMessage.addListener((m) => {
    if (m.cmd === "spawn") spawn();
    if (m.cmd === "despawn") despawn();
  });

  chrome.runtime.sendMessage({ cmd: "ready" });
})();
