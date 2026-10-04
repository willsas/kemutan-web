<div align="center">

<img src="assets/kemutan-app-logo.png" alt="Kemutan app icon" width="120" />

# Kemutan

### dump it now. relive it later.

**The photo dump that's worth opening again.**

Start a dump, invite the people who were there, and throw the messy photos in.
Fill it up and its Stories unlock — then point your camera at a printed photo
and watch the video play right on top of it.

<br />

[**🌐 kemutan.com**](https://www.kemutan.com/) &nbsp;·&nbsp; [**📖 Privacy**](https://www.kemutan.com/privacy) &nbsp;·&nbsp; [**✉️ Support**](mailto:kemutanapp@protonmail.com)

<a href="https://apps.apple.com/us/app/kemutan-photo-dump-capsule/id6746507955">
  <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download Kemutan on the App Store" height="56" />
</a>

<br />

![Free](https://img.shields.io/badge/price-free-2ea44f?style=flat-square)
![iPhone & iPad](https://img.shields.io/badge/platform-iPhone%20%26%20iPad-black?style=flat-square&logo=apple)
![iOS 18+](https://img.shields.io/badge/iOS-18.0%2B-blue?style=flat-square)
![iCloud](https://img.shields.io/badge/storage-your%20own%20iCloud-0a84ff?style=flat-square&logo=icloud&logoColor=white)

</div>

---

## 📸 Take a look

<div align="center">
<table>
  <tr>
    <td width="25%"><img src="https://raw.githubusercontent.com/willsas/kemutan-asset/refs/heads/main/screenshoot-1.png" alt="A photo dump holding every print from one trip" /></td>
    <td width="25%"><img src="https://raw.githubusercontent.com/willsas/kemutan-asset/refs/heads/main/screenshoot-2.png" alt="The journey timeline, scrolling back through the years" /></td>
    <td width="25%"><img src="https://raw.githubusercontent.com/willsas/kemutan-asset/refs/heads/main/screenshoot-3.png" alt="The shoebox: one photo dump per chapter of your life" /></td>
    <td width="25%"><img src="https://raw.githubusercontent.com/willsas/kemutan-asset/refs/heads/main/screenshoot-4.png" alt="A dump filled up, with its Stories unlocked and ready to play" /></td>
  </tr>
  <tr align="center">
    <td><sub>The dump</sub></td>
    <td><sub>Your journey</sub></td>
    <td><sub>The shoebox</sub></td>
    <td><sub>Stories, unlocked</sub></td>
  </tr>
</table>

<sub>📹 There's a short clip of a printed photo playing itself on <a href="https://www.kemutan.com/">kemutan.com</a>.</sub>

</div>

## ✨ How a dump works

Four steps, no filters.

| | |
|:--|:--|
| **1 · Start a dump** | Name it, stick a label on it, and pick how full it has to get before its Stories unlock. |
| **2 · Invite the others** | Share the link. Everyone who was there dumps their side of the story into the same pile. |
| **3 · Dump the memories** | A photo, the video that goes with it, and a few messy words. That's the whole form. |
| **4 · Open it later** | Once it's full enough the reel plays — and any print you scan comes back to life. |

## 🎁 What's inside

- **🔒 Stories that stay shut** — the reel is locked until the dump holds enough memories. Everyone in it sees the same countdown, so it's a reason to keep dumping.
- **🪄 Printed photos that move** — point the camera at a real, printed photo. The video mounts itself in a paper print right on top of it, in AR, with the sound.
- **👯 Dump together** — built on Apple's shared albums, so a dump belongs to everyone in it. No accounts to chase, no upload limits to argue with.
- **☁️ Yours, in your iCloud** — photos and videos live in your own iCloud and sync across your devices. We don't keep a copy, and there's nothing to sell.

## 📲 Get the app

<div align="center">

**[Download Kemutan on the App Store →](https://apps.apple.com/us/app/kemutan-photo-dump-capsule/id6746507955)**

Free · iPhone & iPad · iOS 18.0 or later

</div>

## 🙋 Help & contact

| | |
|:--|:--|
| 💬 Questions, bugs, feature ideas | [kemutanapp@protonmail.com](mailto:kemutanapp@protonmail.com) |
| 🔐 Privacy policy | [kemutan.com/privacy](https://www.kemutan.com/privacy) |
| ⭐ Enjoying it? | [Leave a review on the App Store](https://apps.apple.com/us/app/kemutan-photo-dump-capsule/id6746507955) |

---

## 🛠 About this repository

This repo is **the Kemutan marketing website only** — the source of
[kemutan.com](https://www.kemutan.com/). The iOS app itself lives elsewhere and
isn't open source.

It's a hand-written static site: no build step, no framework, no dependencies.

```
index.html      landing page
privacy.html    privacy policy
styles.css      all of the styling
script.js       ~2KB: footer year, demo video, screenshot lightbox, scroll reveals
assets/         app icon / favicon
CNAME           custom domain for GitHub Pages
app-ads.txt     AdMob app-ads.txt record
```

Screenshots and the demo video are served from a separate asset repo,
[willsas/kemutan-asset](https://github.com/willsas/kemutan-asset), to keep this
one light.

### Run it locally

Open `index.html` in a browser, or serve the folder so relative paths behave
exactly as in production:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

### Deploying

Hosted on **GitHub Pages**. Pushing to `main` publishes the site; the custom
domain comes from the `CNAME` file.

---

<div align="center">
<sub>© 2026 Kemutan · dump it now. relive it later.</sub>
</div>
