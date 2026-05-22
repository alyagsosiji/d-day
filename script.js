/* ==========================================================
   ⚙️ [초간편 날짜 설정 구역] 숫자만 원하는 디데이 일정으로 변경하세요!
   ========================================================== */
const TARGET_YEAR  = 2026;  // 연도
const TARGET_MONTH = 4;     // 월 (1 ~ 12)
const TARGET_DAY   = 16;    // 일 (1 ~ 31)
const TARGET_HOUR  = 0;     // 시 (0 ~ 23)
const TARGET_MIN   = 0;     // 분 (0 ~ 59)
const TARGET_SEC   = 0;     // 초 (0 ~ 59)
/* ========================================================== */

// 작성한 상수를 기반으로 표준 타임스탬프 파싱
const targetDate = new Date(TARGET_YEAR, TARGET_MONTH - 1, TARGET_DAY, TARGET_HOUR, TARGET_MIN, TARGET_SEC).getTime();

// 글로벌 모드 트리거 상태값 ('countdown': 남은시간 모드, 'countup': 지나온시간 모드)
let currentMode = 'countdown'; 

function updateCountdown() {
    const now = new Date().getTime();
    let difference = 0;

    const mainTitle = document.getElementById("main-title");
    const mainSubtitle = document.getElementById("main-subtitle");

    if (currentMode === 'countdown') {
        // ⏳ 1. 디데이 남은 시간 카운트다운 모드
        difference = targetDate - now;
        mainTitle.innerHTML = "수평선 너머의 디데이";
        mainSubtitle.innerText = "Beyond the horizon, where our time meets.";

        // 날짜를 이미 경과했을 경우 강제 제로화 앵커링 및 고정 멘트 송출
        if (difference < 0) {
            difference = 0;
            mainTitle.innerHTML = "수평선 너머 마침내 마주한<br>우리의 특별한 날 ✨";
            mainSubtitle.innerText = "Our beautiful story begins here.";
        }
    } else {
        // 🗓️ 2. 흘러온 미래 시간 카운트업 모드
        difference = now - targetDate;
        mainTitle.innerHTML = "우리가 함께 흘러온 시간 🌊";
        mainSubtitle.innerText = "Every single second with you is a cosmic miracle.";

        // 만약 설정한 날짜가 아직 도래하지 않은 미래 시간인 경우 제로 고정
        if (difference < 0) {
            difference = 0;
            mainTitle.innerHTML = "다가올 수평선을 기다리며 ⏳";
            mainSubtitle.innerText = "Counting down to the day we meet.";
        }
    }

    // 시/분/초 정밀 계산 공식 연산
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // 밀리초 데이터 슬라이싱 연산 가공 (10으로 나누어 정밀한 2자리 00~99 구현)
    const milliseconds = Math.floor((difference % 1000) / 10);

    // DOM 노드 뷰포트에 실시간 매핑 주입
    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
    document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
    document.getElementById("milliseconds").innerText = String(milliseconds).padStart(2, "0");
}

function animate() {
    updateCountdown();
    requestAnimationFrame(animate); // 끊김 및 계단 현상 없는 디스플레이 렌더링 프레임워크 스케줄러 가동
}
animate();


// 🛠️ 모드 스위칭 토글 스위치 이벤트 핸들러 인터랙션
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


// ⚡ 디바이스 감지 자동 최적화 시스템 구축 (모바일: 기본 ON / 데스크톱: 기본 OFF)
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


// 🔒 소스 보호 통합 보안 엔진 가동 (F12 제어, 우클릭 메뉴, 텍스트 드래그 및 단축키 올클리어 잠금)
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("dragstart", e => e.preventDefault());

document.addEventListener("keydown", e => {
    // F12 차단
    if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // 개발자 요소 검사 차단 단축키 우회 제어 (Ctrl + Shift + I / J / C)
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
    }
    // 소스 코드 원본 유출 방지용 뷰어 차단 (Ctrl + U)
    if (e.ctrlKey && (e.key === "u" || e.key === "U" || e.keyCode === 85)) {
        e.preventDefault();
        return false;
    }
});


// 🎵 LP 디스크 오디오 싱글 코어 플레이어 컨트롤 링크
const cdPlayer = document.getElementById("cd-player");
const bgm = document.getElementById("bgm");
const playerTip = document.querySelector(".player-tip");

cdPlayer.addEventListener("click", () => {
    if (bgm.paused) {
        bgm.play().then(() => {
            cdPlayer.classList.add("playing");
            playerTip.innerText = "NOW PLAYING...";
        }).catch(err => {
            console.log("오디오 자원 반환 예외 검출:", err);
            alert("폴더 내에 음악 파일명이 정확히 'music.mp3'인지 확인 및 재업로드가 필요합니다!");
        });
    } else {
        bgm.pause();
        cdPlayer.classList.remove("playing");
        playerTip.innerText = "TAP TO PLAY OUR SONG";
    }
});

// 배경 은하수 오로라 입자 동적 생성 모듈
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
