#!/usr/bin/env sh

set -e

SRC_DIR=${SRC_DIR:-src}

case "$1" in
  magic-numbers)
    grep -RIn "\b[0-9]\{2,\}\b" "$SRC_DIR" || true
    ;;
  ai-smells)
    grep -RIn "any\|eslint-disable\|TODO\|unknown as" "$SRC_DIR" || true
    ;;
  duplicates)
    npx jscpd "$SRC_DIR"
    ;;
  ts-check)
    npx tsc --noEmit
    ;;
  depcheck)
    npx depcheck
    ;;
  all)
    grep -RIn "\b[0-9]\{2,\}\b" "$SRC_DIR" || true
    grep -RIn "any\|eslint-disable\|TODO\|unknown as" "$SRC_DIR" || true
    npx tsc --noEmit
    npx jscpd "$SRC_DIR"
    npx depcheck
    ;;
  *)
    exit 1
    ;;
esac
