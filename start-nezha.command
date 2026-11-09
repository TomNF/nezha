#!/bin/zsh

cd "$(dirname "$0")" || exit 1

PORT="${PORT:-4173}"
URL="http://localhost:${PORT}"

if ! command -v node >/dev/null 2>&1; then
  echo "Chưa cài Node.js. Tải tại: https://nodejs.org/"
  echo "Nhấn Enter để đóng."
  read -r
  exit 1
fi

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Server đã chạy tại $URL"
  open "$URL"
  exit 0
fi

PORT="$PORT" node server.js &
SERVER_PID=$!

cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

for _ in {1..50}; do
  if curl -fsS "$URL" >/dev/null 2>&1; then
    break
  fi
  sleep 0.2
done

open "$URL"
echo "NeZha đang chạy tại $URL"
echo "Nhấn Ctrl+C hoặc đóng cửa sổ này để tắt server."

wait "$SERVER_PID"
