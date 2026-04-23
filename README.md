# FYEOXSkits

**Helping bring your ideas to skit.**

A single-file animated skit creator for the open web. No install, no server, no account — just open in a browser and create.

Inspired by HyperCard. Built with AI. Made for humans.

---

## What It Is

FYEOXSkits is a set of browser-based tools for building animated skits with hand-crafted SVG characters, your own recorded voice, and a self-contained viewer you can share with anyone as a single HTML file.

The idea is simple: you have something worth saying. A lesson, a story, a moment, an idea. FYEOXSkits gives you a cast of characters, a stage, and a studio — and gets out of the way.

This project was built in collaboration with AI, not as a shortcut, but as a creative partnership. The hope is that the same spirit carries through to the people who use it — that anyone with something worth expressing can express it, regardless of their technical background.

---

## The Tools

### `SkitStudio.html`
The main authoring environment. Build a skit beat by beat, record your voice, add characters, set timing, and export a standalone viewer.

- Load or build skits entirely in the browser
- Import characters from your library
- Record dialogue or let text-to-speech handle it
- Export a self-contained viewer HTML anyone can open

### `CharacterStudio.html`
A visual editor for `.char` files. Tune character metadata, bubble positions, animation distances, and stage position without touching JSON.

- Live preview as you edit
- Arrive/leave direction and distance controls
- `pos_x` stage positioning — control exactly where a character lands
- Save to file or directly to your character library

### `style.css`
Shared stylesheet. Keep it in the same folder as both HTML files.

---

## The Sample Characters

| Character | Species | Modes |
|---|---|---|
| Bobby | Fox Squirrel | visible, arrive, leave, bounce |
| Opie | Virginia Opossum | idle, hiss, playing_dead, arrive, leave |
| Montie | Dog | idle, bark, growl, sniff, arrive, leave, happy |
| FenderBender | Retired hot-rodder | idle, talking, cane |
| Cougar 71 | 1971 Muscle Car | idle, driving, honk, burnout, arrive, driveoff, backup |
| Police Car | Officer Crown | idle, driving, lights, chase, burnout, arrive, driveoff, backup |

All characters are hand-coded SVG with JSX animation. Each `.char` file is self-contained JSON — download one and drag it into the studio.

---

## Quick Start

1. Download `SkitStudio.html`, `CharacterStudio.html`, and `style.css` — keep them in the same folder
2. Open `SkitStudio.html` in any modern browser
3. Go to the **Characters** tab and import a `.char` file
4. Switch to the **Studio** tab and click **+ Add Beat**
5. Pick your character, set a mode, set a duration
6. Switch to **Watch** and hit Play
7. When you're happy, hit **Export Viewer** — share that HTML file with anyone

No account. No login. No internet required after the first load.

---

## The File Formats

### `.skit` — Skit definition
A JSON file describing a complete skit: title, characters, beats, and base64-encoded audio recordings. Load it into SkitStudio to edit, or share it with collaborators.

### `.char` — Character definition  
A JSON file containing everything about a character: SVG component code, avatar, modes, animation keyframes, personality metadata, and bubble position. Import into the studio or share in the community.

### `.bg` — Background definition
A JSX SVG component that sets the scene behind your characters.

### Viewer HTML — The output
A completely self-contained HTML file with all characters, audio, and playback logic baked in. Send it to anyone. Open it anywhere. No dependencies.

---

## Architecture

Single HTML files — React 18 + Babel standalone via CDN. No build step, no bundler, no framework lock-in. The whole studio loads from one file you can inspect, fork, and modify.

Characters are JSX arrow functions compiled at runtime by Babel. Skits are data-driven — the same playback loop handles any combination of characters and beats.

```
SkitStudio.html       — skit authoring, recording, export
CharacterStudio.html  — character editing and preview
style.css             — shared design tokens and animations
*.char                — character definitions (JSON)
*.skit                — skit definitions (JSON)
*.bg                  — background definitions (JSON)
viewer_*.html         — exported standalone viewers
```

---

## A Note on AI and Creativity

This project was built in an ongoing conversation with Claude (Anthropic). Not just for code generation — for thinking through the design, the architecture, the philosophy of what a tool like this should be and do.

The belief behind FYEOXSkits is that there's too much information in the world and not enough expression. A teacher with something worth teaching. A parent with a story worth telling. A kid with an idea worth sharing. Most tools that could help them are either too simple (no real authorship) or too complex (requires a whole stack).

HyperCard solved this for a window of time in the late 1980s and early 1990s. It made authors out of people who didn't think of themselves as authors. FYEOXSkits is an attempt to do the same thing for the open web.

If you make something with it — a lesson, a story, a joke, a memory — that's the point.

---

## Contributing

Pull requests welcome. A few ways to contribute:

- **New `.char` files** — build a character, submit it, grow the cast
- **Bug reports** — open an issue with the skit or character file that triggered it
- **Feature ideas** — open an issue, describe what you're trying to make that you can't

The test suite lives in `test_v050.js`:
```bash
node test_v050.js SkitStudio.html
# 184 checks — all should pass
```

---

## License

GNU Affero General Public License v3.0 — see [LICENSE](LICENSE)

Copyright (C) 2026 unixabg@gmail.com | [fyeox.com](https://fyeox.com) | [github.com/unixabg](https://github.com/unixabg)

You are free to use, modify, and distribute this software. If you run a modified version as a network service, you must share your changes under the same license.
