# FYEOXSkits — Hints & Tips

Practical tips for authoring skits and characters. These cover things that aren't obvious from the UI alone.

---

## Beat Params

Beat `params` are a key/value object attached to any beat. During playback they are **merged** (not replaced) into the character's running param state — so a value set on an arrive beat carries forward automatically to all subsequent beats for that character.

### Stage Position — `pos_x`

Shift a character horizontally from their drawn SVG position. Positive values move right, negative move left.

```json
{ "char": "bobby", "mode": "arrive", "params": { "pos_x": -80 } }
```

Set `pos_x` on the arrive beat and it stays in effect for the rest of the skit. You do not need to repeat it on every beat.

---

### Z-Order — `bring_to_front`

Characters render in the order their first beat fires — earliest arrival is furthest back. If you need a character to appear in front of one that arrived earlier, add `bring_to_front` to any of their beats:

```json
{ "char": "cougar_71", "mode": "honk", "params": { "bring_to_front": true } }
```

This pulls the character to the top of the SVG stack at that moment. You can use it on any beat type — arrive, transition, or dialogue.

---

## Character Modes

### Arrival and departure

Always open with an `arrive` beat and close with a `leave` beat. This ensures characters slide onto and off the stage cleanly rather than popping in or disappearing.

```
bobby_arrive  →  bobby_visible (dialogue)  →  bobby_leave
```

### Multiple characters

Each character manages their own mode independently. You can have Opie in `hiss` mode while Bobby is in `visible` and the Cougar is in `honk` — modes do not interfere with each other.

---

## Stacking Order

Characters that arrive earlier in the beat list sit behind characters that arrive later. To control who is in front:

- **Order your arrive beats intentionally** — background characters first, foreground characters last
- **Use `bring_to_front`** on any beat to promote a character to the top mid-skit

---

## Dialogue Beats

- Set `bubble` to `speech` for a normal speech bubble, `thought` for a thought cloud, or leave empty for no bubble
- Text with no bubble still plays TTS audio if recorded — useful for narration or off-screen voices
- Record audio in the Studio tab before exporting — the exported viewer embeds all recordings as base64

---

## Backgrounds

Backgrounds are SVG/JSX components, same format as character components. Set one in the Studio tab and it will be saved with the `.skit` file and embedded in the exported viewer.

The background always renders behind all characters regardless of z-order.

---

## Saving and Exporting

| Action | What it produces |
|---|---|
| 💾 Save Skit | `.skit` JSON file — reloadable in SkitStudio |
| 📤 Export | Standalone `.html` viewer — works in any browser with no dependencies |
| Auto-save | Saves to browser localStorage every 800ms while in the Studio tab |

The `.skit` file embeds the full character definitions, all beat data, audio recordings, and the background. Sharing a `.skit` file gives someone everything they need to reload and continue editing in SkitStudio.

The exported viewer is fully self-contained — no internet connection, no `style.css`, no char files needed.

---

## Character Authoring

### Two-layer `<g>` structure

All characters must use this structure or `pos_x` and arrive/leave animations will conflict:

```jsx
// Outer g: stage position from params.pos_x
// Inner g: mode animation
({mode, state, params={}}) => {
  const posX = params.pos_x || 0;
  const anim = mode === "arrive" ? "myArrive 1.2s forwards" : "none";
  return (
    <g style={{transform: "translateX(" + posX + "px)"}}>
      <g style={{animation: anim, transformOrigin: "148px 290px"}}>
        {/* SVG content here */}
      </g>
    </g>
  );
}
```

### Keyframe format

Use `from/to` format (not `0%/100%`) so CharacterStudio's arrive/leave sliders can detect and patch the values:

```css
/* ✅ correct — CharacterStudio can edit this */
@keyframes myArrive { from { transform: translateX(400px) } to { transform: translateX(0px) } }

/* ❌ avoid — CharacterStudio sliders cannot patch this */
@keyframes myArrive { 0% { transform: translateX(400px) } 100% { transform: translateX(0px) } }
```

### `initial_state`

Set to `null` (not `"hidden"`) for characters that should be visible when their first beat fires. Using `"hidden"` as the initial state requires explicit state-change beats to reveal the character.

### `svg_avatar` rules

- No `xmlns="..."` attribute — invalid in JSX and causes a silent compile failure
- Keep it simple — the avatar is used as a small thumbnail in the Characters tab

### Apostrophes in JSX comments

Do not use apostrophes inside JSX comments in `svg_component`. They break the test suite's string-stripping regex.

```jsx
{/* don't do this */}   ❌
{/* do not do this */}  ✅
```

---

## Test Suite

```bash
node test_v050.js SkitStudio.html
# Expected: 184/184 passing
```

Always run the test suite before committing changes to `SkitStudio.html`. The suite checks function names, constants, CSS animations, and structural integrity but does not execute React code — Babel compile errors will not be caught here, so test in the browser too.

---

## Consulting & Bounties

Have a feature idea or need a custom character? Open a [GitHub Issue](https://github.com/unixabg/FYEOXSkits/issues) to discuss. Features beyond routine scope require a **bounty fee** agreed before work begins.

📬 **unixabg@gmail.com** | [fyeox.com](https://fyeox.com)
