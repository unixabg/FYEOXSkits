#!/usr/bin/env bash
# Bump the SkitStudio version everywhere it must match.
# Usage: scripts/bump-version.sh 0.5.8
set -euo pipefail
new="${1:-}"
if [[ ! "$new" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "usage: $0 X.Y.Z" >&2; exit 1
fi
cd "$(dirname "$0")/.."
old=$(sed -n 's/^const STUDIO_VERSION="\([0-9.]*\)";.*/\1/p' SkitStudio.html)
[[ -n "$old" ]] || { echo "could not read STUDIO_VERSION from SkitStudio.html" >&2; exit 1; }

# SkitStudio.html: header comment + constant
sed -i -E "s/(FYEOXSkits — SkitStudio v)[0-9]+\.[0-9]+\.[0-9]+/\1$new/" SkitStudio.html
sed -i -E "s/^const STUDIO_VERSION=\"[0-9.]+\";/const STUDIO_VERSION=\"$new\";/" SkitStudio.html
# index.html (starter pack) must match the studio
sed -i -E "s/^const STUDIO_VERSION=\"[0-9.]+\";/const STUDIO_VERSION=\"$new\";/" index.html

grep -q "SkitStudio v$new" SkitStudio.html && \
grep -q "^const STUDIO_VERSION=\"$new\";" SkitStudio.html && \
grep -q "^const STUDIO_VERSION=\"$new\";" index.html || { echo "bump failed — check files" >&2; exit 1; }

echo "Bumped $old -> $new in SkitStudio.html and index.html"
