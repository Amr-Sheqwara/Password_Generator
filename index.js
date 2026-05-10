const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sideDrawer = document.getElementById("side-drawer");

const views = {
  generator: document.getElementById("view-generator"),
  reviewer: document.getElementById("view-reviewer"),
  about: document.getElementById("view-about"),
};

menuBtn.onclick = () => sideDrawer.classList.add("open");
closeBtn.onclick = () => sideDrawer.classList.remove("open");

function switchView(target) {
  Object.values(views).forEach((v) => (v.style.display = "none"));
  views[target].style.display = "block";
  sideDrawer.classList.remove("open");
}

document.getElementById("nav-generator").onclick = (e) => {
  e.preventDefault();
  switchView("generator");
};
document.getElementById("nav-reviewer").onclick = (e) => {
  e.preventDefault();
  switchView("reviewer");
};
document.getElementById("nav-about").onclick = (e) => {
  e.preventDefault();
  switchView("about");
};

// --- (Generator) ---
const gBtn = document.getElementById("g_btn");
const gDisplay = document.getElementById("generated_1");
const slider = document.getElementById("length_slider");
const lVal = document.getElementById("length_val");
const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

slider.oninput = () => (lVal.textContent = slider.value);

function generate() {
  let p = "";
  for (let i = 0; i < slider.value; i++) {
    p += chars[Math.floor(Math.random() * chars.length)];
  }
  return p;
}

gBtn.onclick = () => (gDisplay.textContent = generate());

gDisplay.onclick = () => {
  const text = gDisplay.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    gDisplay.classList.add("copied");
    setTimeout(() => gDisplay.classList.remove("copied"), 400);
  });
};

gDisplay.textContent = generate();

// --- (Reviewer)  ---
const pInput = document.getElementById("password-input");
const sBar = document.getElementById("strength-bar");
const sText = document.getElementById("strength-text");
const crackTimeDisplay = document.getElementById("crack-time-display");

pInput.oninput = () => {
  let val = pInput.value;
  let score = 0;

  if (!val) {
    sBar.style.width = "0";
    sText.textContent = "Enter password";
    crackTimeDisplay.textContent = "0 seconds";
    return;
  }

  if (val.length >= 8) score++;
  if (val.length >= 12) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  let colors = ["#ef4444", "#f59e0b", "#0fec07"];
  let status = ["Weak", "Medium", "Strong"];
  let i = score <= 2 ? 0 : score <= 4 ? 1 : 2;

  sBar.style.width = (score / 5) * 100 + "%";
  sBar.style.backgroundColor = colors[i];
  sText.textContent = status[i];
  sText.style.color = colors[i];

  let poolSize = 0;
  if (/[a-z]/.test(val)) poolSize += 26;
  if (/[A-Z]/.test(val)) poolSize += 26;
  if (/[0-9]/.test(val)) poolSize += 10;
  if (/[^A-Za-z0-9]/.test(val)) poolSize += 32;

  const entropy = Math.pow(poolSize, val.length);
  const speed = 1000000000;
  const seconds = entropy / speed;

  const timeColors = ["#ef4444", "#f59e0b", "#f59e0b", "#0fec07"];
  const timeStatus = ["seconds", "minutes", "hours", "years"];

  let colorIndex = 0;
  let timeFormatted = "";

  if (seconds < 60) {
    colorIndex = 0;
    timeFormatted = Math.floor(seconds) + " " + timeStatus[0];
  } else if (seconds < 3600) {
    colorIndex = 1;
    timeFormatted = Math.floor(seconds / 60) + " " + timeStatus[1];
  } else if (seconds < 86400) {
    colorIndex = 2;
    timeFormatted = Math.floor(seconds / 3600) + " " + timeStatus[2];
  } else {
    colorIndex = 3;
    let yrs = Math.floor(seconds / (86400 * 365));
    timeFormatted = yrs > 1000000 ? "Centuries+" : yrs + " " + timeStatus[3];
  }

  crackTimeDisplay.textContent = timeFormatted;
  crackTimeDisplay.style.color = timeColors[colorIndex];
};
