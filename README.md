# NeZha

Ứng dụng học tập local-first cho BA, CFA Level I và Fintech. Dữ liệu lưu trên máy, không cần tài khoản.

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
```

## Deploy GitHub Pages

Repo: https://github.com/TomNF/nezha

GitHub Pages phục vụ trực tiếp từ nhánh `main`, thư mục gốc. Mỗi lần push lên `main`, GitHub Pages tự build lại site.

Build local để kiểm tra bản tĩnh:

```bash
npm run build:pwa
```

Thư mục `dist/` chỉ dùng local, không commit.

## Ghi chú

- Dữ liệu lưu tại localStorage key `nezha.v1`.
- Dữ liệu cũ tự động migrate lần đầu mở app.
- Nếu cổng `4173` đang bận, tắt process đang dùng cổng đó hoặc chạy `PORT=4174 npm start`.
- Service worker chỉ chạy trên HTTPS hoặc localhost.
