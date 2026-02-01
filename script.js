const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const btnRow = document.getElementById("btnRow");

const question = document.getElementById("question");
const subtext = document.getElementById("subtext");

const prompt = document.getElementById("prompt");
const result = document.getElementById("result");
const againBtn = document.getElementById("againBtn");

let noDodges = 0;

const mainImage = document.getElementById("mainImage");

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function moveNoButton() {
  const rowRect = btnRow.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = rowRect.width - btnRect.width;
  const maxY = rowRect.height - btnRect.height;

  btnRow.style.minHeight = "90px";

  const x = Math.random() * clamp(maxX, 0, 9999);
  const y = Math.random() * clamp(maxY + 30, 0, 9999);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noDodges++;

  const messages = [
    "just press Yes 😭",
    "heheh… that one’s hard to click 😅",
    "nope 😌",
    "nice try!",
    "just press Yes 😭",
    "aaa not a No",
  ];
  subtext.textContent = messages[Math.min(noDodges, messages.length - 1)];
}

// Desktop hover dodge
noBtn.addEventListener("mouseenter", moveNoButton);

// Mobile dodge WITHOUT disabling the button
// (touchstart fires before click, so it’ll move away first)
noBtn.addEventListener("touchstart", moveNoButton, { passive: true });

// Optional: if they still somehow click "No", move it again
noBtn.addEventListener("click", (e) => {
  moveNoButton();
});

// YES click: hide everything in prompt (INCLUDING the question now)
yesBtn.addEventListener("click", () => {
  prompt.hidden = true;
  result.hidden = false;

  mainImage.src = "./images/after.jpg";
  mainImage.classList.add("big");
});


// Replay: restore prompt and reset positions/text
againBtn.addEventListener("click", () => {
  prompt.hidden = false;
  result.hidden = true;

  mainImage.src = "/images/before.jpg";
  mainImage.classList.remove("big");

  question.textContent = "Reemskiii, will you be my Valentine?";
  subtext.textContent = "👀";

  noDodges = 0;

  noBtn.style.position = "relative";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";
  btnRow.style.minHeight = "54px";
});

