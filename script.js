// 디데이 목표 날짜 설정 (원하는 날짜로 변경하세요)
const targetDate = new Date("December 31, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    // 시간이 다 되었을 때 수정된 타이틀에 맞춘 문구
    if (difference < 0) {
        document.querySelector(".title").innerText = "수평선 너머 마침내 마주한 우리의 날 ✨";
        document.querySelector(".subtitle").innerText = "Our beautiful story begins here.";
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        document.getElementById("milliseconds").innerText = "000";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
    document.getElementById("milliseconds").innerText = String(milliseconds).padStart(3, "0");
}

function animate() {
    updateCountdown();
    requestAnimationFrame(animate);
}
animate();

// 밤하늘 별빛 입자 생성기
const starsContainer = document.getElementById("stars-container");
const starCount = 50;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 3 + 1;
    const leftPosition = Math.random() * 100;
    const duration = Math.random() * 12 + 10;
    const delay = Math.random() * -20;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${leftPosition}%`;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    if (Math.random() > 0.5) {
        star.style.boxShadow = "0 0 10px 2px rgba(255, 255, 255, 0.8)";
        star.style.background = "radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 70%)";
    } else if (Math.random() > 0.8) {
        star.style.background = "#fbcfe8";
        star.style.boxShadow = "0 0 8px 1px rgba(251, 207, 232, 0.6)";
    }

    starsContainer.appendChild(star);
}
