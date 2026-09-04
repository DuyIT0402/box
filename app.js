/**
 * Retro Pixel Karaoke Player
 * Made with love for Duy & Thẻo
 */

// ==========================================
// 1. DỮ LIỆU LỜI BÀI HÁT (TOÀN BỘ BÀI HÁT KARAOKE)
// ==========================================
const LYRICS_DATA = [
  { id: 1, start: 0.0, end: 15.2, text: "🎵 [Nhạc dạo đầu nhẹ nhàng...]" },
  { id: 2, start: 15.2, end: 19.1, text: "Tôi dành cho em bầu trời tuổi thơ" },
  { id: 3, start: 19.1, end: 23.0, text: "Chỉ mong một ngày em sẽ biết tôi chờ" },
  { id: 4, start: 38.0, end: 44.5, text: "Qua bao mùa thay lá, mà em chẳng nhận ra" },
  { id: 5, start: 44.5, end: 49.0, text: "Hay là... hay là..." },
  { id: 6, start: 49.0, end: 55.5, text: "Xin được về ở cạnh em" },
  { id: 7, start: 55.5, end: 62.0, text: "Vui buồn sẽ có tôi đứng bên thềm" },
  { id: 8, start: 62.0, end: 68.5, text: "Gom chân thành đôi mươi" },
  { id: 9, start: 68.5, end: 76.0, text: "Để đổi lấy đôi môi em cười" },
  { id: 10, start: 76.0, end: 82.0, text: "Chỉ cần em đồng ý..." },
  { id: 11, start: 82.0, end: 90.0, text: "Em cho nhành hoa, tôi gói con tim làm quà" },
  { id: 12, start: 90.0, end: 98.0, text: "Nhưng sợ hoa sẽ tàn úa theo nhịp đập thời gian" },
  { id: 13, start: 98.0, end: 106.0, text: "Xin em về đây, tôi giữ em bên trong vòng tay" },
  { id: 14, start: 106.0, end: 114.0, text: "Đâu sợ mai cách rời, có em tôi sẽ nâng niu suốt đời" },
  { id: 15, start: 114.0, end: 124.0, text: "Người đến bên rạng ngời... Tựa nắng ấm muôn nơi ✨" },
  { id: 16, start: 124.0, end: 130.0, text: "Xin ở cạnh nhau lâu thật lâu" },
  { id: 17, start: 130.0, end: 136.0, text: "Khi lưng còng răng thưa, tóc xưa phai màu" },
  { id: 18, start: 136.0, end: 142.0, text: "Nguyện một đời yêu thương" },
  { id: 19, start: 142.0, end: 148.0, text: "Để nhìn thấy em trên lễ đường" },
  { id: 20, start: 148.0, end: 153.0, text: "Chỉ cần em đồng ý..." },
  { id: 21, start: 153.0, end: 160.0, text: "Em cho nhành hoa, tôi gói con tim làm quà" },
  { id: 22, start: 160.0, end: 169.0, text: "Nhưng sợ hoa sẽ tàn úa theo nhịp đập thời gian" },
  { id: 23, start: 169.0, end: 178.0, text: "Xin em về đây, tôi giữ em bên trong vòng tay" },
  { id: 24, start: 178.0, end: 187.0, text: "Đâu sợ mai cách rời, có em tôi sẽ nâng niu suốt đời" },
  { id: 25, start: 187.0, end: 196.0, text: "Người đến bên rạng ngời... Tựa nắng ấm muôn nơi ✨" },
  { id: null, start: 196.0, end: 205.0, text: "🎵 [Nhạc dạo...]", instrumental: true },
  { id: 26, start: 205.0, end: 213.0, text: "Xin em về đây, tôi giữ em bên trong vòng tay" },
  { id: 27, start: 213.0, end: 221.0, text: "Đâu sợ mai cách rời, có em tôi sẽ nâng niu suốt đời" },
  { id: 28, start: 221.0, end: 229.0, text: "Người đến bên rạng ngời... Tựa nắng ấm muôn nơi ✨" }
];

// Cấu hình thời gian bắt đầu hẹn hò (Bạn có thể đổi ngày tại đây: YYYY-MM-DD)
const LOVE_START_DATE = "2026-01-20";

// ==========================================
// 2. PIXEL ART CANVAS ANIMATION ENGINE
// ==========================================
const canvas = document.getElementById("pixel-canvas");
const ctx = canvas.getContext("2d");

// Cấu hình kích thước ảo Pixel Art (độ phân giải retro)
const V_WIDTH = 190;
const V_HEIGHT = 115;
canvas.width = V_WIDTH;
canvas.height = V_HEIGHT;

// Tạo danh sách sao trên bầu trời
const stars = [];
for (let i = 0; i < 45; i++) {
  stars.push({
    x: Math.floor(Math.random() * V_WIDTH),
    y: Math.floor(Math.random() * (V_HEIGHT - 35)),
    size: Math.random() > 0.8 ? 2 : 1,
    alpha: Math.random(),
    speed: 0.01 + Math.random() * 0.03
  });
}

// Sao băng
let shootingStar = null;
function spawnShootingStar() {
  if (Math.random() < 0.008 && !shootingStar) {
    shootingStar = {
      x: Math.random() * (V_WIDTH - 40),
      y: Math.random() * 25,
      length: 18,
      speedX: 2.2,
      speedY: 1.4,
      life: 25
    };
  }
}

// Trạng thái nhân vật
let animTick = 0;
let isBlinking = false;
let blinkTimer = 0;
let dogWalkX = 137;
let dogDirection = 1;

function drawPixelArtScene() {
  ctx.clearRect(0, 0, V_WIDTH, V_HEIGHT);

  // 1. Bầu trời đêm sâu thẳm
  ctx.fillStyle = "#090d14";
  ctx.fillRect(0, 0, V_WIDTH, V_HEIGHT);

  // 2. Vẽ sao lấp lánh
  stars.forEach(star => {
    star.alpha += star.speed;
    const flicker = Math.abs(Math.sin(star.alpha));
    ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + flicker * 0.8})`;
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });

  // 3. Sao băng lướt qua
  if (shootingStar) {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(shootingStar.x - shootingStar.length, shootingStar.y - shootingStar.length * 0.6);
    ctx.stroke();

    shootingStar.x += shootingStar.speedX;
    shootingStar.y += shootingStar.speedY;
    shootingStar.life--;
    if (shootingStar.life <= 0) shootingStar = null;
  }
  spawnShootingStar();

  // 4. Mặt trăng pixel ở góc trên bên phải
  const moonX = 155;
  const moonY = 22;
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(moonX - 2, moonY - 2, 16, 16); // Hào quang mặt trăng

  ctx.fillStyle = "#d1d5db";
  ctx.fillRect(moonX + 2, moonY, 8, 12);
  ctx.fillRect(moonX, moonY + 2, 12, 8);
  // Hõm mặt trăng
  ctx.fillStyle = "#9ca3af";
  ctx.fillRect(moonX + 3, moonY + 4, 2, 2);
  ctx.fillRect(moonX + 7, moonY + 7, 3, 2);

  // 5. Đồi và hàng cây pixel phía sau
  ctx.fillStyle = "#0d141e";
  ctx.fillRect(0, V_HEIGHT - 38, V_WIDTH, 10);
  ctx.fillStyle = "#111b27";
  ctx.fillRect(0, V_HEIGHT - 30, V_WIDTH, 12);

  // Rặng cây thông pixel
  drawPixelPine(15, V_HEIGHT - 45);
  drawPixelPine(165, V_HEIGHT - 47);

  // 6. Mặt đất cỏ pixel
  ctx.fillStyle = "#16202c";
  ctx.fillRect(0, V_HEIGHT - 22, V_WIDTH, 22);
  ctx.fillStyle = "#1e2c3c";
  ctx.fillRect(0, V_HEIGHT - 22, V_WIDTH, 3); // Viền sáng của bãi cỏ

  // 7. Hoạt họa 2 nhân vật tựa đầu vào nhau
  animTick++;
  const breathe = Math.sin(animTick * 0.05) * 1;

  blinkTimer++;
  if (blinkTimer > 120) {
    isBlinking = true;
    if (blinkTimer > 132) {
      isBlinking = false;
      blinkTimer = 0;
    }
  }

  // Vị trí cặp đôi (ngay giữa cảnh)
  const centerX = 82;
  const baseY = V_HEIGHT - 22 + breathe;

  // --- DUY (Bạn nam - Màu đỏ/cam san hô, mũ xanh - Bên trái) ---
  const boyX = centerX - 18;
  const boyY = baseY - 24;

  // Mũ lưỡi trai / nón xanh của Duy
  ctx.fillStyle = "#38bdf8";
  ctx.fillRect(boyX + 11, boyY - 5, 8, 5);
  ctx.fillRect(boyX + 9, boyY - 2, 12, 2);

  // Thân hình hộp pixel Duy
  ctx.fillStyle = "#e05353";
  ctx.fillRect(boyX + 3, boyY, 26, 16);
  ctx.fillRect(boyX, boyY + 8, 32, 8);

  // Mắt Duy
  ctx.fillStyle = "#1e1e24";
  if (isBlinking) {
    ctx.fillRect(boyX + 9, boyY + 6, 3, 1);
    ctx.fillRect(boyX + 19, boyY + 6, 3, 1);
  } else {
    ctx.fillRect(boyX + 9, boyY + 5, 3, 3);
    ctx.fillRect(boyX + 19, boyY + 5, 3, 3);
  }
  // Má hồng Duy
  ctx.fillStyle = "rgba(255, 120, 120, 0.6)";
  ctx.fillRect(boyX + 6, boyY + 8, 3, 2);

  // Chân Duy
  ctx.fillStyle = "#c53b3b";
  ctx.fillRect(boyX + 6, boyY + 16, 4, 7);
  ctx.fillRect(boyX + 18, boyY + 16, 4, 7);

  // --- THẺO (Bạn nữ - Màu hồng phấn, nơ vàng - Bên phải, tựa đầu vào Duy) ---
  const girlX = centerX + 11;
  const girlY = baseY - 23 + (Math.sin(animTick * 0.05 + 0.5) * 0.6);

  // Chiếc nơ màu vàng trên đầu Thẻo
  ctx.fillStyle = "#facc15";
  ctx.fillRect(girlX + 8, girlY - 4, 7, 4);
  ctx.fillStyle = "#eab308";
  ctx.fillRect(girlX + 10, girlY - 3, 3, 2);

  // Thân hình hộp pixel Thẻo
  ctx.fillStyle = "#f472b6";
  ctx.fillRect(girlX + 2, girlY, 25, 16);
  ctx.fillRect(girlX - 1, girlY + 8, 31, 8);

  // Mắt Thẻo (khẽ nhắm tít vui vẻ tựa vào vai Duy)
  ctx.fillStyle = "#1e1e24";
  if (isBlinking) {
    ctx.fillRect(girlX + 7, girlY + 6, 3, 1);
    ctx.fillRect(girlX + 17, girlY + 6, 3, 1);
  } else {
    // Mắt cong cười hạnh phúc
    ctx.fillRect(girlX + 7, girlY + 5, 3, 2);
    ctx.fillRect(girlX + 17, girlY + 5, 3, 2);
    ctx.fillRect(girlX + 9, girlY + 4, 2, 1);
  }
  // Má hồng Thẻo
  ctx.fillStyle = "rgba(255, 130, 180, 0.8)";
  ctx.fillRect(girlX + 21, girlY + 8, 3, 2);

  // Chân Thẻo
  ctx.fillStyle = "#db2777";
  ctx.fillRect(girlX + 5, girlY + 16, 4, 7);
  ctx.fillRect(girlX + 17, girlY + 16, 4, 7);

  // --- MỰC (Chú chó pixel nhỏ ngồi bên cạnh Thẻo) ---
  if (animTick % 4 === 0) {
    dogWalkX += dogDirection * 0.7;
    if (dogWalkX >= 164 || dogWalkX <= 120) {
      dogDirection *= -1;
    }
  }
  const dogX = dogWalkX;
  const dogY = baseY - 14 + Math.sin(animTick * 0.05 + 1) * 0.5;
  const tailWave = Math.sin(animTick * 0.12) > 0 ? 1 : 0;
  const walkingStep = Math.floor(animTick / 6) % 2;
  const dogTags = ["#MựcĐángYêu", "#MựcCute", "#MựcKute", "#TeamMực"];
  const dogTag = dogTags[Math.floor(animTick / 90) % dogTags.length];

  // Hashtag đổi nhẹ phía trên đầu Mực
  ctx.font = "4px 'Fira Code', monospace";
  ctx.textAlign = "center";
  const tagWidth = ctx.measureText(dogTag).width + 5;
  ctx.fillStyle = "rgba(9, 13, 20, 0.85)";
  ctx.fillRect(dogX + 8 - tagWidth / 2, dogY - 19, tagWidth, 6);
  ctx.fillStyle = "#facc15";
  ctx.fillText(dogTag, dogX + 8, dogY - 15);

  // Tên Mực
  ctx.fillStyle = "#d6b58a";
  ctx.font = "6px 'Press Start 2P', monospace";
  ctx.textAlign = "center";
  ctx.fillText("MỰC", dogX + 8, dogY - 10);

  // Tai cụp và thân chó
  ctx.fillStyle = "#5b3a29";
  ctx.fillRect(dogX, dogY - 3, 5, 9);
  ctx.fillRect(dogX + 18, dogY - 3, 5, 9);
  ctx.fillStyle = "#8b5e3c";
  ctx.fillRect(dogX + 3, dogY, 18, 13);
  ctx.fillRect(dogX + 1, dogY + 5, 22, 8);

  // Mặt, mắt và mũi Mực
  ctx.fillStyle = "#17131a";
  ctx.fillRect(dogX + 6, dogY + 4, 3, 3);
  ctx.fillRect(dogX + 15, dogY + 4, 3, 3);
  ctx.fillRect(dogX + 10, dogY + 8, 5, 3);
  ctx.fillStyle = "#f4b4a5";
  ctx.fillRect(dogX + 11, dogY + 11, 3, 2);

  // Chân và đuôi vẫy nhẹ
  ctx.fillStyle = "#6f472f";
  ctx.fillRect(dogX + 5, dogY + 13 + (walkingStep ? 1 : 0), 4, 7);
  ctx.fillRect(dogX + 16, dogY + 13 + (walkingStep ? 0 : 1), 4, 7);
  ctx.fillRect(dogX + 21, dogY + 2, 5, 3);
  ctx.fillRect(dogX + 24, dogY - 1 + tailWave, 3, 4);

  // Trái tim đập nhẹ ở giữa hai bạn
  if (Math.floor(animTick / 30) % 2 === 0) {
    drawPixelHeart(centerX + 6, baseY - 29, "#f43f5e");
  }

  requestAnimationFrame(drawPixelArtScene);
}

// Hàm vẽ cây thông pixel đơn giản
function drawPixelPine(x, y) {
  ctx.fillStyle = "#092f25";
  ctx.fillRect(x + 3, y + 10, 2, 6); // Gốc cây
  ctx.fillStyle = "#124e3f";
  ctx.fillRect(x + 2, y + 2, 4, 3);
  ctx.fillRect(x + 1, y + 5, 6, 3);
  ctx.fillRect(x, y + 8, 8, 3);
}

// Hàm vẽ trái tim pixel nhỏ
function drawPixelHeart(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y + 1, 2, 2);
  ctx.fillRect(x + 3, y + 1, 2, 2);
  ctx.fillRect(x, y + 2, 5, 2);
  ctx.fillRect(x + 1, y + 4, 3, 1);
  ctx.fillRect(x + 2, y + 5, 1, 1);
}

// Khởi chạy canvas
requestAnimationFrame(drawPixelArtScene);

// ==========================================
// 3. TƯƠNG TÁC BẮN TIM KHI CLICK VÀO CANVAS
// ==========================================
const heartArea = document.getElementById("heart-area");
const sceneContainer = document.querySelector(".scene-container");

sceneContainer.addEventListener("click", (e) => {
  const rect = sceneContainer.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  createFloatingHeart(x, y);
});

function createFloatingHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  const hearts = ["💖", "💕", "❤️", "✨", "🥰", "🌸"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = `${x - 10}px`;
  heart.style.top = `${y - 10}px`;
  heartArea.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1600);
}

// ==========================================
// 4. BỘ ĐỒNG BỘ KARAOKE (LYRICS ENGINE)
// ==========================================
const lyricsView = document.getElementById("lyrics-view");
const currentTimeEl = document.getElementById("current-time");
const durationTimeEl = document.getElementById("duration-time");
const songEndingMessage = document.getElementById("song-ending-message");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-bar-container");
const karaokeStatusEl = document.getElementById("karaoke-status");
const btnPlay = document.getElementById("btn-play");
const playIcon = document.getElementById("play-icon");
const playText = document.getElementById("play-text");
const btnRestart = document.getElementById("btn-restart");
const btnQuickHeart = document.getElementById("btn-quick-heart");
const bgAudio = document.getElementById("bg-audio");
const audioNotice = document.getElementById("audio-notice");
const noticeText = document.getElementById("notice-text");
const manualAudioInput = document.getElementById("manual-audio-input");

let isKaraokeOn = true;
let isPlaying = false;
let currentPlaybackTime = 0;
let playbackDuration = 243.0; // Thời lượng bài hát (04:03)
let timerInterval = null;
let syncFrameId = null;

// Danh sách các URL dự phòng để tương thích tối đa với trình duyệt
const AUDIO_SOURCES = [
  "nhac/song.mp3.mp3",
  "nhac/song.mp3",
  "./nhac/song.mp3.mp3",
  "./nhac/song.mp3",
  "song.mp3.mp3",
  "song.mp3",
  "nhac/G%C3%B3i%20Con%20Tim%20L%C3%A0m%20Qu%C3%A0%20(B%C3%B2%20S%E1%BB%AFa%20Bay%20Original%20Soundtrack).mp3",
  "nhac/Gói Con Tim Làm Quà (Bò Sữa Bay Original Soundtrack).mp3"
];
let currentSourceIdx = 0;

function showAudioNotice(msg) {
  if (audioNotice) {
    audioNotice.style.display = "flex";
    if (msg && noticeText) noticeText.innerHTML = msg;
  }
}

function hideAudioNotice() {
  if (audioNotice) {
    audioNotice.style.display = "none";
  }
}

function tryNextAudioSource() {
  currentSourceIdx++;
  if (currentSourceIdx < AUDIO_SOURCES.length) {
    console.log("Thử chuyển sang URL dự phòng:", AUDIO_SOURCES[currentSourceIdx]);
    bgAudio.src = AUDIO_SOURCES[currentSourceIdx];
    bgAudio.load();
    if (isPlaying) {
      bgAudio.play().catch(() => {});
    }
  } else {
    showAudioNotice("Trình duyệt chặn mở file cục bộ. Hãy kéo thả file <b>.mp3</b> vào đây hoặc");
    startLofiSynth();
  }
}

// Lắng nghe sự kiện audio element
if (bgAudio) {
  bgAudio.volume = 1.0;
  
  bgAudio.addEventListener("loadedmetadata", () => {
    if (bgAudio.duration && !isNaN(bgAudio.duration)) {
      playbackDuration = bgAudio.duration;
      durationTimeEl.textContent = formatTime(playbackDuration);
    }
    hideAudioNotice();
  });
  bgAudio.addEventListener("canplay", () => {
    if (bgAudio.duration && !isNaN(bgAudio.duration)) {
      playbackDuration = bgAudio.duration;
      durationTimeEl.textContent = formatTime(playbackDuration);
    }
    hideAudioNotice();
  });
  bgAudio.addEventListener("error", (e) => {
    console.warn("Lỗi tải nguồn audio hiện tại:", bgAudio.currentSrc || bgAudio.src, bgAudio.error);
    tryNextAudioSource();
  });
  bgAudio.addEventListener("ended", () => {
    pausePlayback();
    currentPlaybackTime = 0;
    updateProgress(0);
    if (songEndingMessage) songEndingMessage.hidden = false;
  });
  bgAudio.addEventListener("timeupdate", () => {
    if (!bgAudio.paused && !isNaN(bgAudio.currentTime)) {
      updateProgress(bgAudio.currentTime);
    }
  });
}

let lyricOffset = 0.0; // Tinh chỉnh độ trễ giây nếu người dùng muốn

// Khởi tạo hiển thị lời bài hát ban đầu
function renderLyrics(rawTime) {
  if (!isKaraokeOn) {
    lyricsView.innerHTML = `<div style="color:#64748b; text-align:center; padding:30px 0;">[ Karaoke Mode is Disabled — Nhấn Ctrl+T để bật lại ]</div>`;
    return;
  }

  const currentTime = Math.max(0, rawTime + lyricOffset);

  // Tìm câu hát đang phát
  let activeIndex = LYRICS_DATA.findIndex(item => currentTime >= item.start && currentTime < item.end);
  if (activeIndex === -1) {
    if (currentTime >= LYRICS_DATA[LYRICS_DATA.length - 1].end) {
      activeIndex = LYRICS_DATA.length - 1;
    } else {
      activeIndex = 0;
    }
  }

  // Hiển thị 4 dòng lân cận (quá khứ, hiện tại, tương lai)
  const displayRange = 4;
  let startIdx = Math.max(0, activeIndex - 2);
  let endIdx = Math.min(LYRICS_DATA.length, startIdx + displayRange);
  if (endIdx - startIdx < displayRange) {
    startIdx = Math.max(0, endIdx - displayRange);
  }

  let html = "";
  for (let i = startIdx; i < endIdx; i++) {
    const item = LYRICS_DATA[i];
    const isPast = currentTime >= item.end;
    const isActive = i === activeIndex && currentTime >= item.start && currentTime < item.end;
    const isFuture = currentTime < item.start;

    if (isActive) {
      if (item.instrumental) {
        html += `
          <div class="lyric-line active instrumental">
            <span class="line-text">${escapeHtml(item.text)}</span>
          </div>
        `;
        continue;
      }

      // Hiệu ứng chữ gõ dần theo tiến trình của câu hát (Typewriter karaoke)
      const lineDuration = item.end - item.start;
      const elapsedInLine = Math.max(0, currentTime - item.start);
      const progressRatio = Math.min(1, elapsedInLine / lineDuration);
      const charsToShow = Math.ceil(item.text.length * progressRatio);

      const typedPart = item.text.substring(0, charsToShow);
      const untypedPart = item.text.substring(charsToShow);

      html += `
        <div class="lyric-line active" data-start="${item.start}" title="Bấm để phát lại câu này">
          <span class="line-num">${item.id}.</span>
          <span class="line-text">
            <span class="typed-text">${escapeHtml(typedPart)}</span><span class="typing-cursor"></span><span style="opacity:0.3">${escapeHtml(untypedPart)}</span>
          </span>
        </div>
      `;
    } else if (isPast) {
      if (item.instrumental) {
        continue;
      }

      html += `
        <div class="lyric-line past" data-start="${item.start}" title="Bấm để phát lại câu này">
          <span class="line-num">${item.id}.</span>
          <span class="line-text">${escapeHtml(item.text)}</span>
          <span class="check-mark">✓</span>
        </div>
      `;
    } else {
      if (item.instrumental) {
        continue;
      }

      html += `
        <div class="lyric-line future" data-start="${item.start}" title="Bấm để nhảy đến câu này">
          <span class="line-num">${item.id}.</span>
          <span class="line-text">${escapeHtml(item.text)}</span>
        </div>
      `;
    }
  }

  lyricsView.innerHTML = html;
}

// Cho phép người dùng bấm trực tiếp vào câu hát bất kỳ để tua nhạc đến câu đó
lyricsView.addEventListener("pointerup", (e) => {
  const lineEl = e.target.closest(".lyric-line");
  if (lineEl && lineEl.dataset.start !== undefined) {
    const targetStart = parseFloat(lineEl.dataset.start);
    if (!isNaN(targetStart)) {
      if (bgAudio) {
        bgAudio.currentTime = targetStart;
      }
      updateProgress(targetStart);
      if (!isPlaying) startPlayback();
    }
  }
});

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Cập nhật tiến trình
function updateProgress(time) {
  currentPlaybackTime = time;
  currentTimeEl.textContent = formatTime(time);
  const percent = Math.min(100, (time / playbackDuration) * 100);
  progressBar.style.width = `${percent}%`;
  renderLyrics(time);
}

function syncLyricsToAudio() {
  if (!bgAudio || bgAudio.paused) {
    syncFrameId = null;
    return;
  }

  if (!isNaN(bgAudio.currentTime)) {
    updateProgress(bgAudio.currentTime);
  }
  syncFrameId = requestAnimationFrame(syncLyricsToAudio);
}

// Tua nhạc khi bấm vào thanh thời lượng
progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  const newTime = ratio * playbackDuration;
  
  if (bgAudio) {
    bgAudio.currentTime = newTime;
  }
  updateProgress(newTime);
});

// ==========================================
// 5. BỘ ÂM THANH: WEB AUDIO SYNTH & MP3
// ==========================================
// Nếu chưa có file MP3, hệ thống sẽ tự động tổng hợp giai điệu Lofi ngọt ngào
let audioCtx = null;
let melodyTimer = null;

const MELODY_NOTES = [
  // Giai điệu nhẹ nhàng (nốt tần số Hz, độ dài giây)
  { note: 329.63, dur: 0.6 }, // E4
  { note: 392.00, dur: 0.6 }, // G4
  { note: 440.00, dur: 0.8 }, // A4
  { note: 493.88, dur: 0.6 }, // B4
  { note: 440.00, dur: 0.6 }, // A4
  { note: 392.00, dur: 0.8 }, // G4
  { note: 329.63, dur: 1.0 }, // E4
  { note: 293.66, dur: 0.6 }, // D4
  { note: 329.63, dur: 0.8 }, // E4
  { note: 392.00, dur: 1.2 }, // G4
];

function playSynthBeep(freq, duration) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Envelope êm tai
    gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    // Trình duyệt có thể chặn autoplay trước tương tác
  }
}

let noteIdx = 0;
function startLofiSynth() {
  if (melodyTimer) clearInterval(melodyTimer);
  melodyTimer = setInterval(() => {
    if (!isPlaying) return;
    const item = MELODY_NOTES[noteIdx % MELODY_NOTES.length];
    playSynthBeep(item.note, item.dur);
    noteIdx++;
  }, 900);
}

function stopLofiSynth() {
  if (melodyTimer) {
    clearInterval(melodyTimer);
    melodyTimer = null;
  }
}

// Bật / Dừng phát
function togglePlay() {
  if (isPlaying) {
    pausePlayback();
  } else {
    startPlayback();
  }
}

function startPlayback() {
  isPlaying = true;
  if (songEndingMessage) songEndingMessage.hidden = true;
  playIcon.textContent = "⏸";
  playText.textContent = "Tạm dừng";

  // Đảm bảo âm lượng bật tối đa
  if (bgAudio) {
    bgAudio.volume = 1.0;
    bgAudio.muted = false;
  }

  // Phát qua file âm thanh MP3
  const playPromise = bgAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      hideAudioNotice();
      if (bgAudio.duration && !isNaN(bgAudio.duration)) {
        playbackDuration = bgAudio.duration;
        durationTimeEl.textContent = formatTime(playbackDuration);
      }
    }).catch((err) => {
      console.warn("Lỗi khi play():", err);
      tryNextAudioSource();
    });
  }

  if (timerInterval) clearInterval(timerInterval);
  if (syncFrameId === null) {
    syncFrameId = requestAnimationFrame(syncLyricsToAudio);
  }
  timerInterval = setInterval(() => {
    if (bgAudio && !bgAudio.paused && !isNaN(bgAudio.currentTime)) {
      currentPlaybackTime = bgAudio.currentTime;
      if (bgAudio.duration && !isNaN(bgAudio.duration)) {
        playbackDuration = bgAudio.duration;
        durationTimeEl.textContent = formatTime(playbackDuration);
      }
    } else {
      currentPlaybackTime += 0.2;
      if (currentPlaybackTime >= playbackDuration) {
        currentPlaybackTime = 0;
      }
    }
    updateProgress(currentPlaybackTime);
  }, 200);
}

function pausePlayback() {
  isPlaying = false;
  playIcon.textContent = "▶";
  playText.textContent = "Phát nhạc";
  if (bgAudio) bgAudio.pause();
  stopLofiSynth();
  if (timerInterval) clearInterval(timerInterval);
  if (syncFrameId !== null) {
    cancelAnimationFrame(syncFrameId);
    syncFrameId = null;
  }
}

function restartPlayback() {
  currentPlaybackTime = 0;
  if (songEndingMessage) songEndingMessage.hidden = true;
  if (bgAudio) {
    bgAudio.currentTime = 0;
  }
  updateProgress(0);
  if (!isPlaying) startPlayback();
}

btnPlay.addEventListener("click", togglePlay);
btnRestart.addEventListener("click", restartPlayback);

// Hàm nạp file nhạc từ đối tượng File (kéo thả hoặc chọn file)
function loadLocalAudioFile(file) {
  if (!file) return;
  try {
    const fileUrl = URL.createObjectURL(file);
    bgAudio.src = fileUrl;
    bgAudio.load();
    hideAudioNotice();
    restartPlayback();
  } catch (err) {
    console.error("Lỗi đọc file:", err);
  }
}

// Xử lý chọn file thủ công khi cần
if (manualAudioInput) {
  manualAudioInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      loadLocalAudioFile(e.target.files[0]);
    }
  });
}

// Hỗ trợ kéo thả file nhạc MP3 trực tiếp vào cửa sổ phát nhạc
window.addEventListener("dragover", (e) => {
  e.preventDefault();
});
window.addEventListener("drop", (e) => {
  e.preventDefault();
  if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    if (file.name.toLowerCase().endsWith(".mp3") || file.type.includes("audio")) {
      loadLocalAudioFile(file);
    }
  }
});

// Nút bắn tim nhanh
if (btnQuickHeart) {
  btnQuickHeart.addEventListener("click", () => {
    const rect = sceneContainer.getBoundingClientRect();
    const midX = rect.width / 2;
    const midY = rect.height * 0.65;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const ox = (Math.random() - 0.5) * 80;
        const oy = (Math.random() - 0.5) * 40;
        createFloatingHeart(midX + ox, midY + oy);
      }, i * 90);
    }
  });
}

// Bắn tim khi bấm vào huy hiệu tên Duy hoặc Thẻo
const boyBadge = document.querySelector(".boy-badge");
const girlBadge = document.querySelector(".girl-badge");
if (boyBadge) {
  boyBadge.addEventListener("click", (e) => {
    e.stopPropagation();
    const rect = boyBadge.getBoundingClientRect();
    const scRect = sceneContainer.getBoundingClientRect();
    createFloatingHeart(rect.left - scRect.left + rect.width / 2, rect.top - scRect.top + 10);
  });
}
if (girlBadge) {
  girlBadge.addEventListener("click", (e) => {
    e.stopPropagation();
    const rect = girlBadge.getBoundingClientRect();
    const scRect = sceneContainer.getBoundingClientRect();
    createFloatingHeart(rect.left - scRect.left + rect.width / 2, rect.top - scRect.top + 10);
  });
}

// Phím tắt Ctrl + T để bật / tắt chế độ Karaoke
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && (e.key === "t" || e.key === "T")) {
    e.preventDefault();
    isKaraokeOn = !isKaraokeOn;
    karaokeStatusEl.textContent = isKaraokeOn ? "on" : "off";
    karaokeStatusEl.className = isKaraokeOn ? "status-on" : "status-off";
    renderLyrics(currentPlaybackTime);
  }
});

// Nút âm thanh bật tắt
const btnSoundToggle = document.getElementById("btn-sound-toggle");
let isMuted = false;
btnSoundToggle.addEventListener("click", () => {
  isMuted = !isMuted;
  bgAudio.muted = isMuted;
  btnSoundToggle.textContent = isMuted ? "🔇" : "🔊";
});

// ==========================================
// 6. POPUP BỨC THƯ TÌNH BÍ MẬT (LOVE LETTER)
// ==========================================
const btnLetter = document.getElementById("btn-letter");
const letterModal = document.getElementById("letter-modal");
const btnCloseLetter = document.getElementById("btn-close-letter");
const btnHeartBurst = document.getElementById("btn-heart-burst");

btnLetter.addEventListener("click", () => {
  letterModal.classList.add("active");
});

btnCloseLetter.addEventListener("click", () => {
  letterModal.classList.remove("active");
});

letterModal.addEventListener("click", (e) => {
  if (e.target === letterModal) {
    letterModal.classList.remove("active");
  }
});

btnHeartBurst.addEventListener("click", () => {
  // Bắn cơn mưa trái tim khắp màn hình
  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const rx = Math.random() * window.innerWidth;
      const ry = Math.random() * window.innerHeight;
      createFloatingHeart(rx, ry);
    }, i * 60);
  }
});

// ==========================================
// 7. BỘ ĐẾM NGÀY YÊU (LOVE DAYS COUNTER)
// ==========================================
function updateLoveCounter() {
  const loveCounterEl = document.getElementById("love-counter");
  const startDate = new Date(LOVE_START_DATE);
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  loveCounterEl.textContent = `💖 ${diffDays} ngày yêu thương`;
}
updateLoveCounter();

// Khởi tạo ban đầu
renderLyrics(0);

