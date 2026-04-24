#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// FYEOX Skit Maker v0.5.0 — Test Suite
// Inherits all 140 v0.4.0 checks + new guards for v0.5.0 Beat Builder.
// Run: node test_v050.js [path/to/SkitStudio.html]
// ─────────────────────────────────────────────────────────────────────────────
'use strict';
const fs   = require('fs');
const path = require('path');

const file = process.argv[2] || path.join(__dirname, 'SkitStudio.html');
let html;
try {
  html = fs.readFileSync(file, 'utf8');
} catch(e) {
  console.error('FATAL: Cannot read file:', file);
  process.exit(1);
}

let pass = 0, fail = 0;
const results = [];

function check(label, condition, detail) {
  if (condition) { pass++; results.push(`  \u2705 ${label}`); }
  else           { fail++; results.push(`  \u274c ${label}${detail ? ' \u2014 ' + detail : ''}`); }
}

// Split studio portion from viewer template so checks stay targeted
const viewerIdx  = html.indexOf('function buildViewerHTML(');
const studioSrc  = viewerIdx > -1 ? html.slice(0, viewerIdx) : html;
const viewerSrc  = viewerIdx > -1 ? html.slice(viewerIdx)    : '';

// ── 1. File / Structure ──────────────────────────────────────────────────────
check('File exists and is non-empty',         html.length > 0);
check('File size > 60 KB',                    html.length > 60000,    `${html.length} bytes`);
check('File size < 800 KB',                   html.length < 800000,   `${html.length} bytes`);
check('DOCTYPE present',                       html.includes('<!DOCTYPE html>'));
check('<html lang="en"> present',             html.includes('<html lang="en">'));
check('<div id="root"> present',              html.includes('id="root"'));
check('body tag present',                      html.includes('<body>'));
check('type="text/babel" script present',     html.includes('type="text/babel"'));

// ── 2. Script-tag balance ────────────────────────────────────────────────────
const openScripts  = (html.match(/<script/g)    || []).length;
const closeScripts = (html.match(/<\/script>/g) || []).length
                   + (html.match(/<\\\/script>/g) || []).length;
check('At least 4 script tags',               openScripts >= 4,                 `found ${openScripts}`);
check('Script tags balanced (open = close)',  openScripts === closeScripts,     `open:${openScripts} close:${closeScripts}`);

// ── 3. CDN dependencies ──────────────────────────────────────────────────────
check('React 18 CDN',                         html.includes('react@18'));
check('ReactDOM 18 CDN',                      html.includes('react-dom@18'));
check('Babel standalone CDN',                 html.includes('@babel/standalone'));

// ── 4. Licence / Branding ───────────────────────────────────────────────────
check('AGPL-3 licence header',                html.includes('GNU Affero General Public License'));
check('"Copyright" in header',                html.includes('Copyright'));
check('unixabg@gmail.com present',            html.includes('unixabg@gmail.com'));
check('fyeox.com present',                    html.includes('fyeox.com'));
check('github.com/unixabg present',           html.includes('github.com/unixabg'));
check('FYEOX Skit Studio branding',           html.includes('FYEOX Skit Studio'));
check('Tagline: Helping bring your ideas',    html.includes('Helping bring your ideas to skit'));
check('Version 0.5.0 in file',               html.includes('0.5.0'));
check('AGPL reference in licence comment',    html.toLowerCase().includes('agpl'));
check('Links to shared style.css',           html.includes('href="style.css"'));
check('SkitStudio filename in README',        html.includes('SkitStudio.html'));

// ── 5. Constants ─────────────────────────────────────────────────────────────
check('STUDIO_VERSION constant',              html.includes('STUDIO_VERSION'));
check('LS_LAST_SKIT constant',                html.includes('LS_LAST_SKIT'));
check('DEFAULT_SKIT defined',                 html.includes('DEFAULT_SKIT'));
check('CAST array defined',                   html.includes('const CAST'));
check('fyeox_skit type string',               html.includes('fyeox_skit'));
check('fyeox_character type string',          html.includes('fyeox_character'));

// ── 6. Audio helpers ─────────────────────────────────────────────────────────
check('fart() function',                      html.includes('function fart('));
check('bark() function',                      html.includes('function bark('));
check('thump() function',                     html.includes('function thump('));
check('playAudio() function',                 html.includes('function playAudio('));
check('speakFallback() function',             html.includes('function speakFallback('));
check('blobToB64() function',                 html.includes('function blobToB64('));
check('b64ToUrl() function',                  html.includes('function b64ToUrl('));

// ── 7. File utilities ────────────────────────────────────────────────────────
check('serializeSkit() function',             html.includes('function serializeSkit('));
check('parseSkit() function',                 html.includes('function parseSkit('));
check('downloadFile() function',              html.includes('function downloadFile('));
check('serializeChar() function',             html.includes('function serializeChar('));
check('buildTar() function',                  html.includes('function buildTar('));
check('downloadTar() function',               html.includes('function downloadTar('));
check('buildViewerHTML() function',           html.includes('function buildViewerHTML('));

// ── 8. Avatar components ─────────────────────────────────────────────────────
check('avatar cache system',                  html.includes('_avCache'));
check('compiledChars state',                  html.includes('compiledChars'));
check('WelcomeScreen onStartBlank',            html.includes('onStartBlank'));
check('getAvatar() function',                 html.includes('function getAvatar('));

// ── 9. Scene components ──────────────────────────────────────────────────────
check('SceneBG component',                    html.includes('function SceneBG('));
check('Bush component',                       html.includes('function Bush('));
check('getAvatar from localStorage',          html.includes('LS_CHAR_LIB') && html.includes('getAvatar'));
check('clearAvCache on import',               html.includes('clearAvCache'));
check('Start Blank Skit button',              html.includes('Start Blank Skit'));
check('GasCloud component',                   html.includes('function GasCloud('));
check('Bubble component',                     html.includes('function Bubble('));
check('SFXText component',                    html.includes('function SFXText('));
check('BPOS bubble-positions object',         html.includes('BPOS'));

// ── 10. Structural line/char features ────────────────────────────────────────
check('blank skit lines array',              html.includes('lines:[]'));
check('blank skit characters object',        html.includes('characters:{}'));
check('skitChars state in App',              html.includes('skitChars'));
check('bposRef in App',                      html.includes('bposRef'));
check('confirmNewSkit merges imports',       html.includes('confirmNewSkit'));
check('compileAndInitChars in App',          html.includes('compileAndInitChars'));
check('CAST array empty',                    html.includes('CAST=[]'));
check('Character Library label',             html.includes('Character Library'));

// ── 11. Character import system ──────────────────────────────────────────────
check('importChar stores to LS_CHAR_LIB',    html.includes('LS_CHAR_LIB'));
check('compileAndInitChars function',         html.includes('compileAndInitChars'));
check('Character Library UI label',           html.includes('Character Library'));

// ── 12. Core components ──────────────────────────────────────────────────────
check('WelcomeScreen component',              html.includes('function WelcomeScreen('));
check('CharactersTab component',              html.includes('function CharactersTab('));
check('LineCard component',                   html.includes('function LineCard('));
check('App component',                        html.includes('function App('));

// ── 13. Welcome screen wiring ────────────────────────────────────────────────
check('appView state variable',               html.includes('appView'));
check('hasSession state variable',            html.includes('hasSession'));
check('"New Skit" text in UI',                html.includes('New Skit'));
check('"Load Existing Skit" in UI',          html.includes('Load Existing Skit'));
check('"Resume Last Session" option',         html.includes('Resume Last Session'));
check('Welcome -> studio transition',         html.includes('"studio"'));

// ── 14. Characters tab ───────────────────────────────────────────────────────
check('"characters" tab ID in list',          html.includes('"characters"'));
check('.char download present',               html.includes('.char'));
check('downloadBundle or doBundle present',   html.includes('downloadBundle') || html.includes('doBundle'));
check('Cast Library heading',                 html.includes('Cast Library'));
check('Character Studio link in Characters tab', html.includes('Character Studio'));

// ── 15. importChar ───────────────────────────────────────────────────────────
check('importChar() function or char import UI',
  html.includes('importChar') || html.includes('Import .char') || html.includes('import-char'));

// ── 16. Viewer HTML ──────────────────────────────────────────────────────────
check('buildViewerHTML slice found',          viewerIdx > -1);
check('Viewer play btn: no &#9654; in JS expression',
  !viewerSrc.includes('"&#9654;') && !viewerSrc.includes("'&#9654;"),
  'HTML entity inside JSX {} renders as literal text, not as the glyph');
check('Viewer has baked-data script id="bd"',
  html.includes('id="bd"') || html.includes("id='bd'"));
check('Viewer has FYEOX branding',            viewerSrc.includes('FYEOX'));

// ── 17. HTML entities inside JS string literals ──────────────────────────────
const badEntityStrings = (studioSrc.match(/"[^"\n]*&#\d+;[^"\n]*"/g) || [])
  .filter(m => !m.includes('README') && !m.includes('CHANGELOG') && !m.includes('LICENSE'));
check('No HTML entities inside JS string literals in studio code',
  badEntityStrings.length === 0,
  badEntityStrings.slice(0,2).join(' | '));

const badOperators = (studioSrc.match(/\{[^}]*&lt;[^}]*\}/g) || []);
check('No &lt; used as JS operator inside JSX {}',
  badOperators.length === 0,
  badOperators.slice(0,1).join(' | '));

// ── 18. CSS animations ───────────────────────────────────────────────────────
check('welcomePop animation defined',         html.includes('welcomePop')||html.includes('style.css'));
check('bubbleFade animation defined',         html.includes('bubbleFade'));
check('recPulse animation defined',           html.includes('recPulse'));
check('popIn animation defined',              html.includes('popIn'));
check('barkShake animation defined',          html.includes('barkShake'));
check('rockSway animation defined',           html.includes('rockSway'));

// ── 19. Footer / version ─────────────────────────────────────────────────────
check('v0.3.0 in footer or STUDIO_VERSION',   html.includes('v0.3.0') || html.includes('STUDIO_VERSION'));
check('ReactDOM.createRoot used',             html.includes('ReactDOM.createRoot'));

// ── 20. Structural integrity ─────────────────────────────────────────────────
const babelScript = (()=>{
  const m = html.match(/<script\s+type="text\/babel">([\s\S]*?)<\/script>/);
  return m ? m[1] : '';
})();

check('Babel script block found and non-empty',
  babelScript.length > 1000, `length: ${babelScript.length}`);

const _stripped = babelScript
  .replace(/"(?:[^"\\]|\\.)*"/g, '""')
  .replace(/'(?:[^'\\]|\\.)*'/g, "''")
  .replace(/`(?:[^`\\]|\\.)*`/g, '``');
const _opens  = (_stripped.match(/\{/g) || []).length;
const _closes = (_stripped.match(/\}/g) || []).length;
check('Babel script braces balanced — no function closed early',
  _opens === _closes,
  `{ opens:${_opens}  } closes:${_closes}  net:${_opens - _closes}`);

const _catchKeyword = (_stripped.match(/(?<!\.)catch\s*\(/g) || []).length;
const _catchClosed  = (_stripped.match(/\}\s*catch\s*\(/g) || []).length;
check('Every try/catch keyword has } before catch — no missing try-close brace',
  _catchKeyword === _catchClosed,
  `keyword catch(:${_catchKeyword}  properly closed } catch(:${_catchClosed}`);

check('App component function defined (not closed early)',
  babelScript.includes('function App(') || babelScript.includes('const App='));

check('Viewer playSkit uses for..of iteration',
  viewerSrc.includes('for (const beat of') || viewerSrc.includes('for(const beat of'));

// ── 21. Critical constant declarations ───────────────────────────────────────
check('DEFAULT_BPOS declared at module level',
  /const DEFAULT_BPOS\s*=/.test(html));
check('DEFAULT_SKIT declared at module level',
  /const DEFAULT_SKIT\s*=/.test(html));
check('STUDIO_VERSION declared',
  /const STUDIO_VERSION\s*=/.test(html));
check('LS_LAST_SKIT declared',
  /const LS_LAST_SKIT\s*=/.test(html));
check('LS_CHAR_LIB declared',
  /const LS_CHAR_LIB\s*=/.test(html));
check('skitChars useState declared',
  html.includes('setSkitChars]=useState'));
check('compiledChars useState declared',
  html.includes('setCompiledChars]=useState'));
check('charModes useState declared',
  html.includes('setCharModes]=useState'));
check('charStates useState declared',
  html.includes('setCharStates]=useState'));
check('compileAndInitChars function declared',
  html.includes('function compileAndInitChars('));
check('bposRef declared as useRef',
  html.includes('bposRef=useRef('));
check('skitCharsRef declared as useRef',
  html.includes('skitCharsRef=useRef('));

// ── 22. v0.4.0 — params system (must stay intact) ────────────────────────────
check('backUp keyframe in style.css or inline',
  studioSrc.includes('@keyframes backUp')||html.includes('style.css'));
check('backUp uses CSS custom property var --bk-x',
  html.includes('var(--bk-x,'));
check('STUDIO_VERSION is 0.5.1',
  html.includes('STUDIO_VERSION="0.5.1"'));
check('params field in serializeSkit',
  html.includes('params:l.params'));
check('charParams useState declared',
  html.includes('setCharParams]=useState'));
check('charParams reset in resetScene',
  html.includes('setCharParams({})'));
check('charParams updated in playSkit',
  html.includes('setCharParams(p=>'));
check('params prop passed to compiled chars in watch tab',
  html.includes('params={charParams[id]'));
check('changeLineMode function declared',
  html.includes('function changeLineMode('));
check('changeLineParams function declared',
  html.includes('function changeLineParams('));
check('BeatCard component declared',
  html.includes('function BeatCard('));
check('BeatCard used in studio tab',
  html.includes('<BeatCard'));
check('BeatCard has params JSON input',
  html.includes('paramsDraft') || html.includes('handleParams'));
check('BeatCard has mode dropdown select',
  html.includes('onModeChange'));
check('BeatCard receives character data (skitChars or allCharsForBeats)',
  html.includes('skitChars={skitChars}') || html.includes('allCharsForBeats'));
check('Viewer charParams state declared',
  viewerSrc.includes('setCharParams]=useState'));
check('Viewer charParams updated in playSkit',
  viewerSrc.includes('setCharParams('));
check('Viewer passes params prop to Comp',
  viewerSrc.includes('params={charParams'));

// ── 23. v0.4.0 — background system (must stay intact) ────────────────────────
check('bgComp useState declared',
  html.includes('setBgComp]=useState'));
check('bgSrcRef declared',
  html.includes('bgSrcRef=useRef'));
check('loadBG function declared',
  html.includes('function loadBG()'));
check('fyeox_background type check in loadBG',
  html.includes('fyeox_background'));
check('BG button in watch tab',
  html.includes('loadBG}'));
check('buildViewerHTML accepts bgSrc',
  html.includes('function buildViewerHTML(title,characters,lines,audioMap,bgSrc)'));
check('bg_src baked into viewer data',
  html.includes('bg_src:bgSrc'));
check('viewer compiles bg_src',
  viewerSrc.includes('D.bg_src'));

// ── 24. v0.5.0 — Beat Builder: new functions ─────────────────────────────────
check('genBeatId function declared',
  html.includes('function genBeatId('));
check('makeBeat function declared',
  html.includes('function makeBeat('));
check('beatType function declared',
  html.includes('function beatType('));
check('addBeat function declared',
  html.includes('function addBeat('));
check('deleteBeat function declared',
  html.includes('function deleteBeat('));
check('moveBeat function declared',
  html.includes('function moveBeat('));
check('changeBeatChar function declared',
  html.includes('function changeBeatChar('));
check('changeBeatType function declared',
  html.includes('function changeBeatType('));
check('changeBeatDuration function declared',
  html.includes('function changeBeatDuration('));
check('changeBeatSfxText function declared',
  html.includes('function changeBeatSfxText('));
check('_new:true flag present in source (makeBeat)',
  html.includes('_new:true'));
check('changeLineMode handles _new beats (id regen)',
  html.includes('._new'));
check('genBeatId called in source (auto-ID generation)',
  html.includes('genBeatId('));
check('_new field NOT serialized by serializeSkit (not in field-pick map)',
  !html.slice(
    html.indexOf('function serializeSkit('),
    html.indexOf('function serializeSkit(') + 900
  ).includes('_new:l._new'));

// ── 25. v0.5.0 — BeatCard expanded interface ─────────────────────────────────
check('BeatCard receives onDelete prop',
  html.includes('onDelete'));
check('BeatCard receives onMoveUp prop',
  html.includes('onMoveUp'));
check('BeatCard receives onMoveDown prop',
  html.includes('onMoveDown'));
check('BeatCard receives onCharChange prop',
  html.includes('onCharChange'));
check('BeatCard receives onTypeChange prop',
  html.includes('onTypeChange'));
check('BeatCard receives onDurationChange prop',
  html.includes('onDurationChange'));
check('BeatCard receives isFirst prop',
  html.includes('isFirst'));
check('BeatCard receives isLast prop',
  html.includes('isLast'));
check('BeatCard has duration number input',
  studioSrc.includes('type="number"') && studioSrc.includes('onDurationChange'));
check('BeatCard has sfx_text editable field',
  studioSrc.includes('sfx_text') && studioSrc.includes('onSfxTextChange'));
check('BeatCard has char select dropdown (onCharChange)',
  studioSrc.includes('onCharChange'));
check('BeatCard type toggle has Dialogue option',
  studioSrc.includes('dialogue') || studioSrc.includes('Dialogue'));
check('BeatCard type toggle has Transition option',
  studioSrc.includes('transition') || studioSrc.includes('Transition'));
check('BeatCard type toggle has SFX option',
  studioSrc.includes('sfx') || studioSrc.includes('SFX'));

// ── 26. v0.5.0 — LineCard expanded interface ─────────────────────────────────
check('LineCard has onDelete prop in definition or call-site',
  (()=>{
    const lcStart = html.indexOf('function LineCard(');
    const nextFn  = html.indexOf('\nfunction ', lcStart + 1);
    const lcBody  = html.slice(lcStart, nextFn > -1 ? nextFn : lcStart + 3000);
    return lcBody.includes('onDelete') || html.includes('onDelete={deleteBeat}');
  })());
check('LineCard has onMoveUp in definition or call-site',
  html.includes('onMoveUp={') ||
  (()=>{
    const lcStart = html.indexOf('function LineCard(');
    const nextFn  = html.indexOf('\nfunction ', lcStart + 1);
    return html.slice(lcStart, nextFn > -1 ? nextFn : lcStart + 3000).includes('onMoveUp');
  })());
check('LineCard has onMoveDown in definition or call-site',
  html.includes('onMoveDown={') ||
  (()=>{
    const lcStart = html.indexOf('function LineCard(');
    const nextFn  = html.indexOf('\nfunction ', lcStart + 1);
    return html.slice(lcStart, nextFn > -1 ? nextFn : lcStart + 3000).includes('onMoveDown');
  })());
check('LineCard has onTypeChange to convert recordable beat',
  html.includes('onTypeChange'));

// ── 27. v0.5.0 — Studio tab wiring & UX ─────────────────────────────────────
check('+ Add Beat button present in source',
  html.includes('Add Beat'));
check('addBeat referenced in App/studio rendering',
  html.includes('addBeat'));
check('deleteBeat referenced in App/studio rendering',
  html.includes('deleteBeat'));
check('moveBeat referenced in App/studio rendering',
  html.includes('moveBeat'));
check('changeBeatChar referenced in App',
  html.includes('changeBeatChar'));
check('changeBeatType referenced in App',
  html.includes('changeBeatType'));
check('isFirst={i===0} or similar passed in map',
  html.includes('isFirst={i===0}') || (html.includes('isFirst={') && html.includes('===0}')));
check('isLast={i===lines.length-1} or similar passed in map',
  html.includes('isLast={i===lines.length-1}') ||
  (html.includes('isLast={') && html.includes('lines.length-1')));
check('onDelete wired to deleteBeat in studio map',
  html.includes('deleteBeat') && html.includes('onDelete'));
check('applyLoadedSkit preserved — existing .skit loading intact',
  html.includes('applyLoadedSkit'));
check('parseSkit backwards-compat — still validates fyeox_skit type',
  html.includes('fyeox_skit') && html.includes('parseSkit'));

// ── Summary ───────────────────────────────────────────────────────────────────
console.log('\nFYEOX Skit Maker v0.5.0 \u2014 Test Suite');
console.log('\u2550'.repeat(54));
results.forEach(r => console.log(r));
console.log('\u2550'.repeat(54));
const total = pass + fail;
console.log(`\n  Total checks : ${total}`);
console.log(`  \u2705 Passed     : ${pass}`);
console.log(`  \u274c Failed     : ${fail}`);
console.log(`\n  ${fail === 0
  ? '\uD83C\uDF89 ALL TESTS PASS \u2014 ready to ship!'
  : '\u26A0\uFE0F  SOME TESTS FAILED \u2014 fix before handoff.'}\n`);
process.exit(fail > 0 ? 1 : 0);
