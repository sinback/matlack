#!/usr/bin/env bash
# Download the 1823 Stone-engraving facsimile scan (NARA, public domain) and
# verify it. The file is ~82 MB, so it is kept out of git; see
# Declaration_of_Independence/README.md for provenance.
set -euo pipefail

DEST="Declaration_of_Independence/facscimile_high_res.jpg"
SHA256="ca7cc737eb34abba4af02d44adb7c9a6419b43ae87deb374d2da72f3961e8547"
MIRRORS=(
  "https://github.com/sinback/matlack/releases/download/facsimile-v1/facscimile_high_res.jpg"
)

cd "$(dirname "$0")/.."

verify() {
  if command -v sha256sum >/dev/null; then echo "$SHA256  $1" | sha256sum -c --status
  else echo "$SHA256  $1" | shasum -a 256 -c --status; fi
}

if [[ -f "$DEST" ]] && verify "$DEST"; then
  echo "✓ $DEST already present and verified"; exit 0
fi

for url in "${MIRRORS[@]}"; do
  echo "→ trying $url"
  if curl -fL --retry 3 -o "$DEST.part" "$url" && verify "$DEST.part"; then
    mv "$DEST.part" "$DEST"; echo "✓ downloaded and verified $DEST"; exit 0
  fi
  echo "✗ failed or checksum mismatch"; rm -f "$DEST.part"
done

echo "All mirrors failed. See Declaration_of_Independence/README.md." >&2
exit 1
