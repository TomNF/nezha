# NeZha

Ứng dụng học tập local-first cho ECBA, CFA Level I, IELTS Academic, Securities Theory (SRTC), ISTQB Foundation và Fintech. Dữ liệu lưu trên máy, không cần tài khoản.

## Dùng trên iPhone (PWA)

Mở bằng **Safari**:

https://tomnf.github.io/nezha/

1. Nhấn nút **Chia sẻ**.
2. Chọn **Thêm vào Màn hình chính**.
3. Mở NeZha từ Home Screen.

Không cần App Store. Dữ liệu nằm trong localStorage của PWA trên iPhone; nên dùng **Xuất JSON** trong Cài đặt để backup định kỳ.

Sau khi cập nhật app, đóng và mở lại PWA vài lần để service worker nhận bản mới.

## Bật nhanh trên macOS

Double-click file **`start-nezha.command`**. Script sẽ:

- bật server tại `http://localhost:4173`;
- tự mở trình duyệt vào hệ thống;
- giữ server chạy trong cửa sổ Terminal. Nhấn `Ctrl+C` để tắt.

Nếu macOS chặn lần đầu, right-click file → **Open**. Nếu cần, chạy:

```bash
chmod +x start-nezha.command
```

## Chạy bằng Terminal

```bash
npm start
```

Sau đó mở: http://localhost:4173

Yêu cầu: Node.js 18+.

## Lệnh kiểm tra

```bash
npm run check
npm run validate:cfa
npm run validate:ielts
npm run validate:ecba-scenarios
npm run validate:securities
npm run validate:istqb
```

Tạo lại audio Listening IELTS bằng macOS:

```bash
npm run build:ielts-audio
```

## Deploy GitHub Pages

Repo: https://github.com/TomNF/nezha

GitHub Pages phục vụ từ nhánh `gh-pages` (chỉ chứa bản build tĩnh). Sau khi sửa app, deploy bằng:

```bash
npm run deploy:pages
```

Lệnh này build `dist/` rồi cập nhật nhánh `gh-pages`. Thư mục `dist/` không commit vào `main`.

Build local để kiểm tra bản tĩnh:

```bash
npm run build:pwa
```

## IELTS Academic

- Lộ trình có 24 bài core, 72 quiz, 72 flashcards và 4 full mock Listening, Reading, Writing, Speaking.
- Listening dùng audio TTS gốc; Writing/Speaking tự chấm theo rubric, không phải điểm IELTS chính thức.
- Nội dung là bản gốc luyện tập, không phải đề thi hoặc tài liệu chính thức của IELTS/Cambridge/British Council/IDP.

## ECBA

- Lộ trình chính dùng internal id `ba`, hiển thị là ECBA.
- Core path gồm orientation, 9 domain, applied BA labs, final review, 3 full mock và 20-question scenario drill.
- Wealth modules là optional, không tính vào core readiness.
- Không phải tài liệu hay đề thi chính thức của IIBA; IIBA không công bố pass mark cố định, 75% chỉ là mục tiêu luyện tập.

## Securities Theory (SRTC)

- Track bổ trợ, `affectsOverall: false`, gồm 8 topic core, 3 practice mock 40 câu/60 phút và module trading-app optional.
- Nội dung là bản gốc, không liên kết với SRTC/UBCKNN, không cấp chứng chỉ và không cam kết đỗ.

## ISTQB Foundation (CTFL)

- Track bổ trợ, `affectsOverall: false`, gồm 6 chapter core, 3 practice mock 40 câu/60 phút và module trading-app QA optional.
- Official CTFL pass mark là 26/40 (65%); app dùng 70% làm ngưỡng readiness nội bộ.
- Nội dung là bản gốc, không phải tài liệu hay đề thi chính thức của ISTQB.

## Ghi chú

- Dữ liệu lưu tại localStorage key `nezha.v1`.
- Dữ liệu cũ tự động migrate lần đầu mở app.
- Nếu cổng `4173` đang bận, tắt process đang dùng cổng đó hoặc chạy `PORT=4174 npm start`.
- Service worker chỉ chạy trên HTTPS hoặc localhost.
