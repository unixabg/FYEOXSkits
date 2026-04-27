# FYEOXSkits

**Helping bring your ideas to skit.**

A single-file animated skit creation tool inspired by HyperCard. No server. No install. No account. Open `SkitStudio.html` in any modern browser and start creating.

- 🌐 Website: [fyeox.com](https://fyeox.com)
- 📄 License: [AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)
- ✉️ Contact: unixabg@gmail.com

---

## Quick Start

```bash
git clone https://github.com/unixabg/FYEOXSkits.git
cd FYEOXSkits
```

Then open `SkitStudio.html` in any modern browser — all characters are included and ready to load from the Characters tab. No install, no dependencies, no account.

> 💡 See [HINTS.md](HINTS.md) for tips on stage positioning, z-order, character authoring, and more.

---

## Files

| File | Purpose |
|---|---|
| `SkitStudio.html` | Main skit authoring tool |
| `CharacterStudio.html` | Character editor |
| `style.css` | Shared stylesheet — must be in the same folder as the HTML files |
| `test_v050.js` | Test suite: `node test_v050.js SkitStudio.html` |
| `*.char` | Character definition files |
| `*.skit` | Saved skit files |

---

## Characters

Characters are portable `.char` files — hand-coded SVG with JSX, loadable into any skit. Each character has a set of **modes** that drive its animation and behavior during playback.

<!-- CHAR_TABLE_START -->
| Character | ID | Species | Modes |
|---|---|---|---|

<!-- CHAR_TABLE_END -->

> This table is auto-updated by GitHub Actions whenever a `.char` file is pushed to the repository.

### Mode Reference

| Mode | Description |
|---|---|
| `idle` | Default standing/resting state, no animation |
| `visible` | Character is on stage, static |
| `arrive` | Slides onto the stage (typically from off-screen) |
| `leave` | Slides off the stage |
| `talking` | Mouth-open or speaking pose |
| `bounce` | Excited bounce animation |
| `bark` | Bark animation with shake |
| `growl` | Low growl with shake |
| `sniff` | Sniffing pose |
| `happy` | Tail-wag or happy animation |
| `hiss` | Defensive hiss animation |
| `playing_dead` | Plays dead (opossum special) |
| `cane` | Shaking cane animation |
| `driving` | Vehicle in motion |
| `honk` | Vehicle horn animation |
| `burnout` | Spinning tires/smoke effect |
| `driveoff` | Vehicle drives off stage |
| `backup` | Vehicle reverses |
| `chase` | High-speed pursuit animation |
| `lights` | Emergency lights flashing |
| `backup_lights` | Reversing with lights active |

---

## Skit Format

Skits are saved as `.skit` JSON files and can be loaded back into SkitStudio. The format embeds all character definitions, beat data, audio recordings (base64), and an optional background component.

```json
{
  "_type": "fyeox_skit",
  "_version": "0.5.2",
  "title": "My Skit",
  "episode": 1,
  "characters": { "bobby": { "...full char def..." } },
  "lines": [
    { "id": "bobby_arrive_0", "char": "bobby", "mode": "arrive", "duration": 1500, "params": { "pos_x": -80 }, "recordable": false },
    { "id": "bobby_visible_1", "char": "bobby", "mode": "visible", "text": "Hi!", "bubble": "speech", "recordable": true }
  ],
  "audio": { "bobby_visible_1": "base64..." },
  "bg_src": ""
}
```

---

## Character Format

Characters are `.char` JSON files containing metadata, mode lists, and hand-coded SVG/JSX components.

```json
{
  "_type": "fyeox_character",
  "_version": "0.5.2",
  "id": "bobby",
  "name": "Bobby",
  "emoji": "🐿️",
  "species": "Fox Squirrel",
  "color": "#B05E28",
  "modes": ["visible", "arrive", "leave", "bounce"],
  "initial_mode": "visible",
  "initial_state": null,
  "bpos": { "cx": 355, "cy": 160, "tailDir": "down-right" },
  "svg_component": "({mode,state,params={}})=>{ ... }",
  "svg_avatar": "()=><svg .../>",
  "author": "unixabg@gmail.com"
}
```

### SVG Authoring Rules

- All characters use a **two-layer `<g>` structure**: outer `<g>` handles `pos_x` stage position, inner `<g>` handles mode animation
- No `xmlns="..."` in `svg_avatar` — invalid in JSX
- No apostrophes in JSX comments
- Keyframes must use `from/to` format (not `0%/100%`) for CharacterStudio slider compatibility
- `initial_state: null` (not `"hidden"`) for characters that should be visible on load

---

## Consulting & Custom Development

Have an idea for a feature, a custom character, or a branded skit experience?

- **Custom characters** — commission a hand-coded SVG character for your project, mascot, or curriculum
- **Feature requests** — open a [GitHub Issue](https://github.com/unixabg/FYEOXSkits/issues) to discuss; features beyond routine scope require a **bounty fee** agreed before work begins
- **Consulting** — integration help, custom skit formats, or embedded deployments available by arrangement

📬 Reach out: **unixabg@gmail.com** | [fyeox.com](https://fyeox.com)

---

## Running the Test Suite

```bash
node test_v050.js SkitStudio.html
# Expected: 184/184 passing
```

---

## License

GNU Affero General Public License v3.0 or later — see [LICENSE](LICENSE).  
Copyright (C) 2025 unixabg@gmail.com
