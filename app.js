const WTYIA_DATE = new Date("2026-06-25T19:00:00+01:00").getTime();

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const previous = { days: null, hours: null, minutes: null, seconds: null };

function pad(n, size = 2) { return String(n).padStart(size, "0"); }

function update(el, value, key) {
  const formatted = key === "days" ? pad(value, 3) : pad(value);
  if (previous[key] !== formatted) {
    el.textContent = formatted;
    el.classList.remove("flip");
    void el.offsetWidth;
    el.classList.add("flip");
    previous[key] = formatted;
  }
}

function tick() {
  const diff = WTYIA_DATE - Date.now();
  if (diff <= 0) {
    update(els.days, 0, "days");
    update(els.hours, 0, "hours");
    update(els.minutes, 0, "minutes");
    update(els.seconds, 0, "seconds");
    return;
  }
  update(els.days, Math.floor(diff / 86400000), "days");
  update(els.hours, Math.floor((diff % 86400000) / 3600000), "hours");
  update(els.minutes, Math.floor((diff % 3600000) / 60000), "minutes");
  update(els.seconds, Math.floor((diff % 60000) / 1000), "seconds");
}

tick();
setInterval(tick, 1000);

const layer = document.querySelector(".lanterns");
const SPARKS = 22;

function spawn(initial = false) {
  const s = document.createElement("span");
  s.className = "spark";
  const dur = 9 + Math.random() * 12;
  const delay = initial ? -Math.random() * dur : Math.random() * 5;
  s.style.left = Math.random() * 100 + "vw";
  s.style.bottom = "-10px";
  s.style.setProperty("--drift", (Math.random() * 200 - 100).toFixed(0) + "px");
  s.style.animationDuration = dur + "s";
  s.style.animationDelay = delay + "s";
  s.style.transform = "translateY(20vh)";
  if (Math.random() < 0.3) {
    const size = 6 + Math.random() * 4;
    s.style.width = size + "px";
    s.style.height = size + "px";
  }
  s.addEventListener("animationiteration", () => {
    s.style.left = Math.random() * 100 + "vw";
    s.style.setProperty("--drift", (Math.random() * 200 - 100).toFixed(0) + "px");
  });
  layer.appendChild(s);
}

for (let i = 0; i < SPARKS; i++) spawn(true);
