#!/usr/bin/env bash
# Restore src/ from the most recent snapshot in .backups/
# Usage: ./undo.sh           — restore latest snapshot
#        ./undo.sh <TS>      — restore a specific snapshot (folder name in .backups/)
#        ./undo.sh --list    — list available snapshots
set -e
cd "$(dirname "$0")"

if [ "$1" = "--list" ]; then
  ls -1t .backups | grep -v '^latest.txt$' || true
  exit 0
fi

TS="$1"
if [ -z "$TS" ]; then
  if [ ! -f .backups/latest.txt ]; then
    echo "No snapshot found." >&2; exit 1
  fi
  TS=$(cat .backups/latest.txt)
fi

SNAP=".backups/$TS/src"
if [ ! -d "$SNAP" ]; then
  echo "Snapshot not found: $SNAP" >&2; exit 1
fi

# Save a "redo" point in case we want to roll forward again
REDO=".backups/before-undo-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$REDO"
cp -R src "$REDO/src"

rm -rf src
cp -R "$SNAP" src
echo "Restored src/ from $TS"
echo "(prior state saved at $REDO if you want to roll forward)"
