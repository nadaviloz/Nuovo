#!/usr/bin/env bash
# memento — simple checkpoint / undo for this project.
#
# It snapshots the folders you actually edit (src/ and public/) into .backups/,
# so you can roll back if you don't like a change. node_modules and dist are
# never touched.
#
# Usage:
#   ./memento.sh save [label]   Save a checkpoint (optional short label)
#   ./memento.sh list           List saved checkpoints (newest first)
#   ./memento.sh undo [name]    Restore the latest checkpoint, or a named one
#   ./memento.sh help           Show this help
#
# Every undo first saves a "before-undo" checkpoint, so an undo is itself
# reversible.

set -e
cd "$(dirname "$0")"

BK=".backups"
DIRS=(src public)

snapshot() {
  local dest="$1"
  mkdir -p "$dest"
  for d in "${DIRS[@]}"; do
    if [ -d "$d" ]; then
      cp -R "$d" "$dest/$d"
    fi
  done
}

cmd="${1:-help}"

case "$cmd" in
  save)
    label="$2"
    ts="$(date +%Y%m%d-%H%M%S)"
    name="$ts"
    [ -n "$label" ] && name="$ts-$label"
    snapshot "$BK/$name"
    echo "$name" > "$BK/latest.txt"
    echo "Saved checkpoint: $name"
    echo "Undo it anytime with: ./memento.sh undo"
    ;;

  list)
    if [ ! -d "$BK" ]; then
      echo "No checkpoints yet."
      exit 0
    fi
    ls -1t "$BK" | grep -vE '^(latest\.txt|\.DS_Store|assets)$' || true
    ;;

  undo)
    name="$2"
    if [ -z "$name" ]; then
      if [ ! -f "$BK/latest.txt" ]; then
        echo "No checkpoint found. Save one first: ./memento.sh save" >&2
        exit 1
      fi
      name="$(cat "$BK/latest.txt")"
    fi
    if [ ! -d "$BK/$name" ]; then
      echo "Checkpoint not found: $name" >&2
      echo "Available:" >&2
      ls -1t "$BK" | grep -vE '^(latest\.txt|\.DS_Store|assets)$' >&2 || true
      exit 1
    fi
    # Save a reversible "before-undo" point of the current state.
    before="before-undo-$(date +%Y%m%d-%H%M%S)"
    snapshot "$BK/$before"
    for d in "${DIRS[@]}"; do
      if [ -d "$BK/$name/$d" ]; then
        rm -rf "$d"
        cp -R "$BK/$name/$d" "$d"
      fi
    done
    echo "Restored from checkpoint: $name"
    echo "(current state was saved as $before in case you want it back)"
    ;;

  help|--help|-h|*)
    sed -n '2,18p' "$0" | sed 's/^# \{0,1\}//'
    ;;
esac
