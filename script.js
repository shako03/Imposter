const data = {
  food: ["პიცა", "ხაჭაპური", "ბურგერი", "შაურმა", "ნაყინი"],
  places: ["სკოლა", "ზღვა", "მთები", "კინო", "აეროპორტი"],
  objects: ["ტელეფონი", "ლეპტოპი", "საათი", "მანქანა", "კლავიატურა"]
  ///...... სხვები მოვა მალე :DDD
};

let roles = [];
let current = 0;
let secretWord = "";
let time = 60;
let interval;

// dommm
const setup = document.getElementById("setup");
const game = document.getElementById("game");
const end = document.getElementById("end");

const playersInput = document.getElementById("players");
const categorySelect = document.getElementById("category");

const playerTitle = document.getElementById("playerTitle");
const hiddenRole = document.getElementById("hiddenRole");
const shownRole = document.getElementById("shownRole");
const roleText = document.getElementById("roleText");
const wordText = document.getElementById("wordText");
const timer = document.getElementById("timer");

function startGame() {
  const count = Number(playersInput.value);
  if (count < 3) {
    alert("მინიმუმ 3 მოთამაშე");
    return;
  }

  roles = Array(count).fill("CREW");
  roles[Math.floor(Math.random() * count)] = "IMPOSTER";

  const cat = categorySelect.value;
  const words =
    cat === "random"
      ? Object.values(data).flat()
      : data[cat];

  secretWord = words[Math.floor(Math.random() * words.length)];

  setup.classList.add("hidden");
  game.classList.remove("hidden");

  current = 0;
  showPlayer();
}

function showPlayer() {
  playerTitle.innerText = "მოთამაშე " + (current + 1);
  hiddenRole.classList.remove("hidden");
  shownRole.classList.add("hidden");
}

function reveal() {
  hiddenRole.classList.add("hidden");
  shownRole.classList.remove("hidden");

  if (roles[current] === "IMPOSTER") {
    roleText.innerText = "❌ IMPOSTER";
    wordText.innerText = "სიტყვა არ იცი";
  } else {
    roleText.innerText = "✅ მოთამაშე";
    wordText.innerText = secretWord;
  }
}

function next() {
  current++;

  if (current >= roles.length) {
    game.classList.add("hidden");
    end.classList.remove("hidden");
  } else {
    showPlayer();
  }
}

function startTimer() {
  time = 60;
  timer.innerText = "⏱️ " + time + " წამი";
  clearInterval(interval);

  interval = setInterval(() => {
    time--;
    timer.innerText = "⏱️ " + time + " წამი";

    if (time <= 0) {
      clearInterval(interval);
      alert("⏰ დრო ამოიწურა! აირჩიეთ Imposter");
    }
  }, 1000);
}

function goHome() {
  location.reload();
}
