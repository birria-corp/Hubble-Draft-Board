# Hubble Draft Board
NFL auction draft board with cloud sync and keeper tracking.

**Live:** https://birria-corp.github.io/Hubble-Draft-Board/

## Features
- Auction draft board for 182 NFL players
- Keeper tracking with budget deduction
- Best Available and Sleepers views
- Roster view with slot assignments
- League settings (season, budget, trades, scoring)
- Firebase Auth (Google sign-in) + Firestore cloud sync
- Conflict resolution on multi-device sync
- Font scaling (10 steps)
- Auto-export JSON if no export in 4+ days
- Version checker
- PWA (installable, offline-capable)

## File Structure
```
index.html       # Single-file app (all CSS + JS inline)
sw.js            # Service worker (PWA, cache-first/network-first)
manifest.json    # PWA manifest
icon.svg         # Source icon (192x192 viewBox)
icon-192.png     # PWA icon (generate from SVG)
icon-512.png     # PWA icon (generate from SVG)
version.json     # {"version":"X.X"}
README.md
CONTEXT.md
```

## Update Workflow
1. Pull origin in GitHub Desktop
2. Edit index.html — bump `APP_VERSION`
3. Edit sw.js — bump `CACHE_VERSION` to match
4. Edit version.json — bump `"version"`
5. Commit and push
6. GitHub Pages deploys automatically

## Version History
| Version | Changes |
|---------|---------|
| 1.0 | Initial release — full PWA with Firebase sync, consolidated from 3-script source |
