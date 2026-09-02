# Hubble Draft Board — Session Context

**Project:** Hubble Draft Board
**Repo:** https://github.com/birria-corp/Hubble-Draft-Board
**Live:** https://birria-corp.github.io/Hubble-Draft-Board/
**Version:** 1.0
**Firebase Project:** zeptrack-f8720
**Stack:** Vanilla JS, Firebase ESM (Auth + Firestore), PWA

## File Structure
```
index.html       # Single-file app
sw.js            # Service worker
manifest.json    # PWA manifest
icon.svg         # Source SVG icon
version.json     # {"version":"1.0"}
README.md
CONTEXT.md
```

## Active Features
- 182-player auction pool (NFL 2026 season)
- Keeper tracking: Amon-Ra St. Brown $45, De'Von Achane $50, Bucky Irving $11
- Views: Players (filterable), Best Available, Sleepers, Roster
- Flat sleeper table with tier filters
- Notes column inline in player table
- League Settings: season, totalBudget, trades, keeper editor, scoring defaults
- Firebase Auth: Google signInWithPopup, onAuthStateChanged → window._authUser + authChanged CustomEvent
- Firestore: users/{uid}/data/HDB_state → {payload: JSON.stringify(state)}
- Conflict resolution: timestamp compare + confirm() dialog
- Font scaling: FS_STEPS=[75,85,92,100,108,116,125,135,146,158], applied as % on documentElement
- Auto-export: >4 days since HDB_lastexport triggers silent JSON export
- Version check: fetches version.json?_=timestamp, compares to APP_VERSION
- Settings modal: font A-/A+, version check, export, import
- Topbar: app title, ⚙ gear → settings modal, auth state (sign in / email + sync + sign out)
- Toast notifications: window._showToast(msg), 3s timeout
- PWA: sw.js registered, network-first for index.html/version.json, cache-first for assets

## Key Technical Decisions
- Single-file HTML (all CSS + JS inline)
- Firebase imported via ESM type="module" in <head>; app script is regular <script> in <body>
- window.* bridge: _signIn, _signOut, _syncNow, _authUser, _showToast, _reloadAppState
- authChanged CustomEvent dispatched after onAuthStateChanged fires
- Utility functions renamed: idd(p) (was id()), getp(n) (was get()) — avoid naming conflicts
- ASCII hyphens only in button text — Unicode minus (−) silently breaks Babel
- Old key migration: edifice-draft-board-v1 / hubble-draft-board-v1 → HDB_state
- localStorage keys prefixed HDB_: HDB_state, HDB_fontsize, HDB_lastexport
- scoreDefaults uses ASCII dash, not Unicode minus

## Firebase Config
```js
apiKey: "AIzaSyCrTmJNohK-7_t2BHx70HA6AfLmZyryLUY"
authDomain: "zeptrack-f8720.firebaseapp.com"
projectId: "zeptrack-f8720"
storageBucket: "zeptrack-f8720.firebasestorage.app"
messagingSenderId: "791166858370"
appId: "1:791166858370:web:9ccf77cdad85cb3689b09b"
```

## Version Bump Checklist
- APP_VERSION in index.html
- CACHE_VERSION in sw.js (must match)
- version.json "version" field

## Packaging Convention
Zip name: `Hubble-Draft-Board-vX.X.zip`
Include: all repo files + updated CONTEXT.md

## Log
- 2026-09-02: v1.0 initial build — consolidated 3-script source into single-file PWA with Firebase sync
