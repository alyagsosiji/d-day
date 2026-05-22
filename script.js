/* ==========================================================
   ⚙️ [초간편 날짜 설정 구역] 숫자만 편하게 변경하세요!
   ========================================================== */
const TARGET_YEAR  = 2026;  // 연도
const TARGET_MONTH = 6;     // 월 (1 ~ 12)
const TARGET_DAY   = 6;    // 일 (1 ~ 31)
const TARGET_HOUR  = 8;     // 시 (0 ~ 23)
const TARGET_MIN   = 0;     // 분 (0 ~ 59)
const TARGET_SEC   = 0;     // 초 (0 ~ 59)
/* ========================================================== */

const targetDate = new Date(TARGET_YEAR, TARGET_MONTH - 1, TARGET_DAY, TARGET_HOUR, TARGET_MIN, TARGET_SEC).getTime();
let currentMode = 'countdown'; 

function updateCountdown() {
    const now = new Date().getTime();
    let difference = 0;

    const mainTitle = document.getElementById("main-title");
    const mainSubtitle = document.getElementById("main-subtitle");

    if (currentMode === 'countdown') {
        difference = targetDate - now;
        mainTitle.innerHTML = '수평선 너머의 디데이';
        mainSubtitle.innerText = "Beyond the horizon, where our time meets.";

        if (difference < 0) {
            difference = 0;
            // 🛠️ 이모지에 전용 클래스(emoji)를 입혀 깨짐 및 잘림 전면 차단
            mainTitle.innerHTML = '수평선 너머 마침내 마주한<br>우리의 특별한 날 <span class="emoji">✨</span>';
            mainSubtitle.innerText = "Our beautiful story begins here.";
        }
    } else {
        difference = now - targetDate;
        mainTitle.innerHTML = '우리가 함께 흘러온 시간 <span class="emoji">🌊</span>';
        mainSubtitle.innerText = "Every single second with you is a cosmic miracle.";

        if (difference < 0) {
            difference = 0;
            mainTitle.innerHTML = '다가올 수평선을 기다리며 <span class="emoji">⏳</span>';
            mainSubtitle.innerText = "Counting down to the day we meet.";
        }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
    document.getElementById("milliseconds").innerText = String(milliseconds).padStart(2, "0");
}

function animate() {
    updateCountdown();
    requestAnimationFrame(animate);
}
animate();

// 🛠️ 모드 스위칭 토글
const modeToggle = document.getElementById("mode-toggle");
const modeText = document.getElementById("mode-text");
const modeIcon = document.getElementById("mode-icon");

modeToggle.addEventListener("click", () => {
    if (currentMode === 'countdown') {
        currentMode = 'countup';
        document.body.classList.add("countup-active");
        modeIcon.innerText = "🗓️";
        modeText.innerText = "지나온 시간 보기";
    } else {
        currentMode = 'countdown';
        document.body.classList.remove("countup-active");
        modeIcon.innerText = "⏳";
        modeText.innerText = "남은 시간 보기";
    }
});

// ⚡ 최적화 모드 (모바일 기본 ON / PC 기본 OFF)
const body = document.body;
const ecoToggle = document.getElementById("eco-toggle");
const ecoText = document.getElementById("eco-text");

const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

if (isMobileDevice) {
    body.classList.add("eco-mode");
    ecoText.innerText = "최적화 Mode : ON";
} else {
    body.classList.remove("eco-mode");
    ecoText.innerText = "최적화 Mode : OFF";
}

ecoToggle.addEventListener("click", () => {
    body.classList.toggle("eco-mode");
    ecoText.innerText = body.classList.contains("eco-mode") ? "최적화 Mode : ON" : "최적화 Mode : OFF";
});

// 🔒 강력한 불법 유출 및 크롤링 제어 보안 기능
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());

document.addEventListener("keydown", e => {
    if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && (e.key === "u" || e.key === "U" || e.keyCode === 85)) {
        e.preventDefault();
        return false;
    }
});

// 🎵 플레이어 제어 코드
const cdPlayer = document.getElementById("cd-player");
const bgm = document.getElementById("bgm");
const playerTip = document.querySelector(".player-tip");

cdPlayer.addEventListener("click", () => {
    if (bgm.paused) {
        bgm.play().then(() => {
            cdPlayer.classList.add("playing");
            playerTip.innerText = "NOW PLAYING...";
        }).catch(err => {
            console.log("오디오 자원 반환 예외:", err);
            alert("폴더 내에 음악 파일명이 정확히 'music.mp3'인지 확인 및 재업로드가 필요합니다!");
        });
    } else {
        bgm.pause();
        cdPlayer.classList.remove("playing");
        playerTip.innerText = "TAP TO PLAY OUR SONG";
    }
});

// 배경 은하수 오로라 입자 동적 생성
const starsContainer = document.getElementById("stars-container");
const starCount = 35;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 2 + 1;
    const leftPosition = Math.random() * 100;
    const duration = Math.random() * 12 + 10;
    const delay = Math.random() * -20;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${leftPosition}%`;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${delay}s`;

    if (Math.random() > 0.5) {
        star.style.boxShadow = "0 0 10px 2px rgba(255, 255, 255, 0.7)";
        star.style.background = "radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 70%)";
    } else if (Math.random() > 0.8) {
        star.style.background = "#e9d5ff";
        star.style.boxShadow = "0 0 8px 1px rgba(233, 213, 255, 0.5)";
    }

    starsContainer.appendChild(star);
}
