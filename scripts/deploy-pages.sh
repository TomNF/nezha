#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

npm run build:pwa

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git clone --branch gh-pages --depth 1 "$(git remote get-url origin)" "$TMP"
find "$TMP" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -R dist/. "$TMP"/

cd "$TMP"
git config user.name "$(git -C "$ROOT" config user.name)"
git config user.email "$(git -C "$ROOT" config user.email)"
git add -A

if git diff --cached --quiet; then
  echo "No Pages changes to deploy."
  exit 0
fi

git commit -m "Deploy NeZha PWA"
git push origin gh-pages
