# 💖 Retro Pixel Music & Karaoke Box — Dành Tặng Duy & Thẻo

Dự án **Retro Terminal Karaoke** phiên bản đặc biệt dành riêng cho **Duy & Thẻo**, lấy bối cảnh ca khúc **"Gói Con Tim Làm Quà" (Bò Sữa Bay OST)**:
- 🌌 Khung cảnh đêm pixel lung linh: trăng khuyết, ngàn sao lấp lánh, sao băng lướt qua.
- 👫 Hai nhân vật pixel đại diện cho **Duy (mũ xanh, áo cam san hô)** và **Thẻo (nơ vàng, váy hồng)** tựa đầu vào nhau, có bảng tên phong cách retro phát sáng bay bổng.
- 🎶 Tự động phát trọn vẹn toàn bộ bài hát từ thư mục `nhac/` (không cần chọn file).
- 🎤 Đồng bộ lời bài hát Karaoke toàn bài (đầy đủ 4 phút 03 giây) với hiệu ứng gõ chữ Typewriter retro.
- 💌 Bức thư tình bí mật gửi riêng cho Thẻo và tính năng bắn tim tương tác.

---

## 📁 Cấu trúc thư mục:
`pixel-love-karaoke/`
```
pixel-love-karaoke/
├── index.html          # File chính: mở bằng trình duyệt là thưởng thức ngay
├── style.css           # Hiệu ứng scanline CRT, bảng tên Duy & Thẻo, giao diện retro
├── app.js              # Canvas pixel art, toàn bộ lời bài hát karaoke, âm thanh
├── nhac/               # Chứa file bài hát MP3 gốc của bạn
│   └── Gói Con Tim Làm Quà (Bò Sữa Bay Original Soundtrack).mp3
├── terminal_player.py  # Bản chạy trực tiếp trên Terminal / PowerShell
└── README.md           # Hướng dẫn chi tiết
```

---

## 🚀 Cách mở và sử dụng:

### Cách 1: Mở giao diện Web (Khuyên dùng nhất ⭐)
1. Nhấp đúp chuột vào file [index.html](file:///c:/Users/Lenovo/.gemini/antigravity/scratch/pixel-love-karaoke/index.html) để mở bằng trình duyệt (Chrome, Edge, Cốc Cốc,...).
2. Bấm nút **"▶ Phát nhạc"**: bài hát *Gói Con Tim Làm Quà* trong thư mục `nhac` sẽ tự động vang lên và chạy lời karaoke từ đầu đến cuối!
3. **Các tính năng tương tác:**
   - Bấm vào bảng tên **Duy 💙** hoặc **Thẻo 💖** để bắn tim!
   - Bấm nút **"💕 Bắn tim"** để gửi mưa trái tim cho Thẻo.
   - Bấm biểu tượng lá thư **💌** ở góc trên để đọc **Bức thư tình bí mật**.
   - Bấm phím tắt **`Ctrl + T`** để bật / tắt chế độ Karaoke.

---

### Cách 2: Chạy trực tiếp trong Terminal / PowerShell (Giống video TikTok)
1. Mở cửa sổ **PowerShell** hoặc **Command Prompt**.
2. Chạy lệnh:
   ```bash
   python terminal_player.py
   ```
3. Màn hình sẽ hiển thị hoạt họa pixel và gõ từng dòng karaoke theo phong cách hacker / terminal cực ngầu!

---

## 🎨 Cách tùy biến cho riêng người yêu của bạn:

Mở file `app.js` bằng Notepad hoặc VS Code để chỉnh sửa dễ dàng:

1. **Đổi ngày bắt đầu yêu nhau (Love Counter):**
   - Tìm dòng:
     ```javascript
     const LOVE_START_DATE = "2023-01-01"; // Đổi thành ngày kỷ niệm của 2 bạn
     ```
2. **Đổi lời bài hát & thời gian:**
   - Trong mảng `LYRICS_DATA`, bạn có thể thêm bớt câu hát, sửa lời bài hát tùy thích.
3. **Đổi nội dung Bức thư bí mật:**
   - Mở file `index.html`, tìm thẻ `<div class="letter-text" id="typewriter-letter">` để viết những lời nhắn nhủ ngọt ngào nhất gửi đến bạn ấy.

---

## 🌐 Mẹo gửi tặng người yêu ở xa:
- Bạn có thể kéo thả thư mục này lên **[Vercel](https://vercel.com)** hoặc **[Netlify Drop](https://app.netlify.com/drop)** (hoàn toàn miễn phí chỉ mất 30 giây).
- Bạn sẽ nhận được một đường link (ví dụ: `https://tang-em.vercel.app`), sau đó tạo mã QR và in dán vào thiệp hoặc hộp quà tặng nàng!

