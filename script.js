// 1. 디데이 목표 날짜 설정 (2026년 4월 16일 00:00:00)
const targetDate = new Date("April 16, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    // 시간이 다 되었을 때 출력될 문구
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

    // 시간 계산 공식
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    // 화면 갱신
    document.getElementById("days"+1).innerText = String(days).padStart(2, "0");
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
