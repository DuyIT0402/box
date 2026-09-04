# -*- coding: utf-8 -*-
"""
Terminal Retro Pixel Karaoke Player
Chạy trực tiếp trong PowerShell / Command Prompt / Terminal
Tái hiện chính xác phong cách trong video TikTok!
"""

import sys
import time
import os

# Mã màu ANSI
RESET = "\033[0m"
BOLD = "\033[1m"
GREEN = "\033[38;2;69;214;91m"
CYAN = "\033[38;2;86;162;247m"
WHITE = "\033[38;2;255;255;255m"
GRAY = "\033[38;2;100;116;139m"
DARK_GRAY = "\033[38;2;55;65;81m"
PINK = "\033[38;2;244;114;182m"
RED = "\033[38;2;224;83;83m"
YELLOW = "\033[38;2;250;204;21m"

def clear_screen():
    os.system("cls" if os.name == "nt" else "clear")

# Pixel art cảnh đêm 2 bạn nhỏ Duy & Thẻo tựa đầu vào nhau
PIXEL_ART = f"""
{DARK_GRAY}           *             .           *         {WHITE}🌕{DARK_GRAY}
        .         *           *             .
             *          .           *            .
                      {CYAN}💙DUY{DARK_GRAY}    {PINK}THẺO💖{DARK_GRAY}
    {DARK_GRAY}  ▲             {RED}■■■■■{DARK_GRAY}    {PINK}■■■■■{DARK_GRAY}            ▲
    {DARK_GRAY} ▲▲▲           {RED}■■{WHITE}●{RED}■{WHITE}●{RED}■■{DARK_GRAY}  {PINK}■■{WHITE}˘{PINK}■{WHITE}˘{PINK}■■{DARK_GRAY}          ▲▲▲
   {DARK_GRAY}▲▲▲▲▲          {RED}■■■■■■■{PINK}■■■■■■■{DARK_GRAY}         ▲▲▲▲▲
  {DARK_GRAY}━━━━━━━━━━━━━━━{RED}  ■ ■  {PINK}  ■ ■  {DARK_GRAY}━━━━━━━━━━━━━━━{RESET}
"""

LYRICS = [
    (1, "Tôi dành cho em bầu trời tuổi thơ"),
    (2, "Chỉ mong một ngày em sẽ biết tôi chờ"),
    (3, "Qua bao mùa thay lá, mà em chẳng nhận ra"),
    (4, "Hay là... hay là..."),
    (5, "Xin được về ở cạnh em"),
    (6, "Vui buồn sẽ có tôi đứng bên thềm"),
    (7, "Gom chân thành đôi mươi"),
    (8, "Để đổi lấy đôi môi em cười"),
    (9, "Chỉ cần em đồng ý..."),
    (10, "Em cho nhành hoa, tôi gói con tim làm quà"),
    (11, "Nhưng sợ hoa sẽ tàn úa theo nhịp đập thời gian"),
    (12, "Xin em về đây, tôi giữ em bên trong vòng tay"),
    (13, "Đâu sợ mai cách rời, có em tôi sẽ nâng niu suốt đời"),
    (14, "Người đến bên rạng ngời... Tựa nắng ấm muôn nơi"),
    (15, "Xin ở cạnh nhau lâu thật lâu"),
    (16, "Khi lưng còng răng thưa, tóc xưa phai màu"),
    (17, "Nguyện một đời yêu thương"),
    (18, "Để nhìn thấy em trên lễ đường"),
    (19, "Chỉ cần em đồng ý..."),
    (20, "Em cho nhành hoa, tôi gói con tim làm quà"),
    (21, "Nhưng sợ hoa sẽ tàn úa theo nhịp đập thời gian"),
    (22, "Xin em về đây, tôi giữ em bên trong vòng tay"),
    (23, "Đâu sợ mai cách rời, có em tôi sẽ nâng niu suốt đời"),
    (24, "Người đến bên rạng ngời... Tựa nắng ấm muôn nơi"),
    (25, "Xin em về đây, tôi giữ em bên trong vòng tay"),
    (26, "Đâu sợ mai cách rời, có em tôi sẽ nâng niu suốt đời"),
    (27, "Người đến bên rạng ngời... Tựa nắng ấm muôn nơi"),
    (28, "Duy yêu Thẻo nhiều lắm, trọn đời bên nhau! 💖")
]

def run_terminal_karaoke():
    # Bật ANSI màu trên Windows CMD / PowerShell nếu cần
    if os.name == "nt":
        os.system("")

    clear_screen()
    print(PIXEL_ART)
    print(f" {CYAN}{BOLD}Gói Con Tim Làm Quà{RESET}")
    print(f" {WHITE}Nguyễn Hùng (Bò Sữa Bay OST){GRAY} · {PINK}Duy 💖 Thẻo{RESET}\n")

    # Giả lập hát từ câu số 8
    sung_lines = []

    for idx, (num, line_text) in enumerate(LYRICS):
        # In các dòng trước đó với dấu check ✓ màu xanh lá
        clear_screen()
        print(PIXEL_ART)
        print(f" {CYAN}{BOLD}Gói Con Tim Làm Quà{RESET}")
        print(f" {WHITE}Nguyễn Hùng (Bò Sữa Bay OST){GRAY} · {PINK}Duy 💖 Thẻo{RESET}\n")

        # In những câu đã hát xong
        for s_num, s_text in sung_lines[-3:]:
            print(f" {GREEN} {s_num:2d}. {s_text} ✓{RESET}")

        # In câu đang hát với hiệu ứng gõ chữ (Typewriter) và con trỏ nhấp nháy
        for char_i in range(1, len(line_text) + 1):
            typed = line_text[:char_i]
            # Xóa dòng hiện tại và viết lại
            sys.stdout.write(f"\r {CYAN}{BOLD} {num:2d}. {typed}█{RESET}")
            sys.stdout.flush()
            time.sleep(0.12)

        time.sleep(0.6)
        sung_lines.append((num, line_text))

        # Hiển thị câu tiếp theo dạng mờ nếu có
        if idx + 1 < len(LYRICS):
            next_num, next_text = LYRICS[idx + 1]
            print(f"\n {GRAY} {next_num:2d}. {next_text}{RESET}")

        # Thanh trạng thái (chuẩn 4:03)
        progress_secs = int((idx + 1) * (243 / len(LYRICS)))
        mins = progress_secs // 60
        secs = progress_secs % 60
        print(f"\n {DARK_GRAY}─────────────────────────────────────────{RESET}")
        print(f" {CYAN}♪ {mins}:{secs:02d} / 4:03{GRAY} · karaoke: {GREEN}on{GRAY} (ctrl+c to exit){RESET}")
        time.sleep(1.0)

    print(f"\n\n {PINK}{BOLD}💖 Duy yêu Thẻo nhiều lắm, chúc hai bạn mãi mãi hạnh phúc! 💖{RESET}\n")

if __name__ == "__main__":
    try:
        run_terminal_karaoke()
    except KeyboardInterrupt:
        print("\n\nĐã thoát.")

