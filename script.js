// 1. 디데이 목표 날짜 설정 (2026년 4월 16일)
const targetDate = new Date("April 16, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    
    // 과거와 미래 시간에 구애받지 않고 실시간으로 작동하도록 절대값(Math.abs) 활용
    const isPast = now > targetDate;
    const difference = Math.abs(targetDate - now);

    // 날짜 상태에 맞춰 타이틀 텍스트 유연하게 변경
    if (isPast) {
        document.querySelector(".title").innerText = "수평선 너머 마주한 우리의 시간 ✨";
        document.querySelector(".subtitle").innerText = "Every second with you is a beautiful miracle.";
    } else {
        document.querySelector(".title").innerText = "수평선 너머의 디데이";
        document.querySelector(".subtitle").innerText = "Beyond the horizon, where our time meets.";
    }

    // 시간 계산 공식
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // 💡 밀리초(1000ms)를 10으로 나누어 완벽한 2자리(00~99) 숫자로 압축 계산
    const milliseconds = Math.floor((difference % 1000) / 10);

    // 화면에 두 자릿수 포맷팅하여 갱신 (MS도 2자리로 정상 패딩)
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
            console.log("오디오 로드 에러:", err);
            alert("music.mp3 파일을 찾을 수 없습니다. 파일 위치를 확인해 주세요!");
        });
    } else {
        bgm.pause();
        cdPlayer.classList.remove("playing");
        playerTip.innerText = "TAP TO PLAY OUR SONG";
    }
});

// 밤하늘 은하수 입자 효과
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
