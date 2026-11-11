# NeZha

Ứng dụng học tập local-first cho BA, CFA Level I, IELTS Academic và Fintech. Dữ liệu lưu trên máy, không cần tài khoản.

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

## Ghi chú

- Dữ liệu lưu tại localStorage key `nezha.v1`.
- Dữ liệu cũ tự động migrate lần đầu mở app.
- Nếu cổng `4173` đang bận, tắt process đang dùng cổng đó hoặc chạy `PORT=4174 npm start`.
- Service worker chỉ chạy trên HTTPS hoặc localhost.
