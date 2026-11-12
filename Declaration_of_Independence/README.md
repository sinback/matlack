# Source facsimile

`facscimile_high_res.jpg` is the primary reference for all Matlack research:
every crop in `matlack/reference/` was cut from it. It is **not in git**
(about 82 MB). Fetch it with `./scripts/fetch_facsimile.sh`.

## What it is

A NARA scan of a print from William J. Stone's 1823 copperplate facsimile
of the Declaration of Independence. Stone's plate was a wet-transfer plus
hand-engraved reproduction of the parchment, and it preserves Timothy
Matlack's thick/thin quill strokes.

| | |
|---|---|
| Holding institution | U.S. National Archives and Records Administration (NARA), College Park, MD |
| Series | Plates and Facsimiles of the Declaration of Independence, 1823, 1895 and 1951 |
| Record group | RG 59, General Records of the Department of State (Records of the Bureau of Rolls and Library) |
| NARA scan | 2010-05-21, imaging job `Job 10-A2-198` (from embedded XMP) |
| Rights | Public domain (U.S. federal record) |

The embedded XMP metadata says it was converted from NARA's TIFF master to
JPEG in Photoshop on 2026-01-21. Whether the original TIFF can also be
archived is an open question (sinback to check).

## File facts

| | |
|---|---|
| Size | 81,795,949 bytes |
| SHA-256 | `ca7cc737eb34abba4af02d44adb7c9a6419b43ae87deb374d2da72f3961e8547` |
| Dimensions | 13970 × 16535 px (≈231 MP), 525 dpi, RGB, Adobe RGB (1998) |

## Where it's hosted

**GitHub Release [`facsimile-v1`](https://github.com/sinback/matlack/releases/tag/facsimile-v1)**
on this repo. Any copy with the SHA-256 above is the same file.

It is *not* the image on NARA's DocsTeach "Engraving of the Declaration of
Independence" page: that one shows the copper plate itself (yellower,
splotchier, and mirrored left-to-right, as engraving plates are).
If you add another mirror, add its URL to `MIRRORS` in
`scripts/fetch_facsimile.sh`; the checksum check makes any mirror safe.

## Gotchas for analysis code

- **Pillow refuses to open it by default.** 231 MP is over Pillow's
  decompression-bomb limit (~179 MP). Set `Image.MAX_IMAGE_PIXELS = None`
  first; the file is trusted.
- Fully decoded it takes about 690 MB of RAM in RGB. Prefer working on crops,
  or use `Image.open(...).crop(box)` / `draft()` before `load()`.
- It uses the Adobe RGB colour profile, not sRGB. That doesn't matter for
  geometry, but it does for any ink-darkness or colour comparisons.
