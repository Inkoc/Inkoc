const logo = document.getElementById("logo");
const scoreElement = document.getElementById("score");
const jumpScareElement = document.getElementById("jumpScare");
const jumpScareSound = document.getElementById("jumpScareSound");
const startSpeed = 2;
let x, y, dx, dy;
let score = 0;
let firstClick = true;
let speed = startSpeed;
let jumpScareChance = 0;
let logoWidth, logoHeight;

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 100%, 50%)`;
}

function setLogoSize() {
  const logoRect = logo.getBoundingClientRect();
  logoWidth = logoRect.width;
  logoHeight = logoRect.height;
}

function resetPosition() {
  setLogoSize();

  const maxX = window.innerWidth - logoWidth;
  const maxY = window.innerHeight - logoHeight;
  x = Math.random() * maxX;
  y = Math.random() * maxY;

  const minAngle = Math.PI / 6;
  const maxAngle = Math.PI / 3;
  let angle = minAngle + Math.random() * (maxAngle - minAngle);

  const quadrant = Math.floor(Math.random() * 4);
  angle += (quadrant * Math.PI) / 2;

  dx = Math.cos(angle) * speed;
  dy = Math.sin(angle) * speed;

  logo.querySelector("text").setAttribute("fill", getRandomColor());
}

function moveLogo() {
  x += dx;
  y += dy;

  if (x <= 0 || x >= window.innerWidth - logoWidth) {
    dx = -dx;
    logo.querySelector("text").setAttribute("fill", getRandomColor());
  }
  if (y <= 0 || y >= window.innerHeight - logoHeight) {
    dy = -dy;
    logo.querySelector("text").setAttribute("fill", getRandomColor());
  }

  logo.style.transform = `translate(${x}px, ${y}px)`;

  requestAnimationFrame(moveLogo);
}

function triggerJumpScare() {
  setTimeout(() => {
    jumpScareElement.style.display = "block";
    jumpScareSound.play();
    setTimeout(() => {
      jumpScareElement.style.display = "none";
    }, 2000);
  }, 1000);
}

function changeWebsiteIcon(src) {
  const link = document.getElementById("siteIcon");
  if (link) {
    link.href = src;
  }
}

logo.addEventListener("mousedown", () => {
  if (firstClick) {
    scoreElement.style.display = "block";
    changeWebsiteIcon("resources/icon.png");
    firstClick = false;
  }
  score++;
  speed = startSpeed + score * 0.1;
  scoreElement.textContent = `Score: ${score}`;
  jumpScareChance += 0.002;

  if (Math.random() < jumpScareChance) {
    triggerJumpScare();
    jumpScareChance = 0;
  }

  resetPosition();
});

resetPosition();
moveLogo();

window.addEventListener("resize", resetPosition);
