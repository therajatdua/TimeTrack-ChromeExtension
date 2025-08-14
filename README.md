# TimeTrack — Chrome extension for time tracking & productivity analytics

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: RAJAT DUA

*INTERN ID*: CT04DZ228

*DOMAIN*: FULL STACK WEB DEVLOPMENT

*DURATION*: 4 WEEKS

*MENTOR*: NEELA SANTHOSH

## Overview

TimeTrack is a lightweight Chrome extension that records the time you spend on websites, classifies them as productive/unproductive, and provides simple productivity analytics via a small backend and dashboard. This repository includes the extension source (`extension/`) and a minimal Node/Express backend (`server/`) used for prototyping and local testing.

## 🌟 Core Features

- Per-domain time tracking (background service worker increments time while a tab is active)
- Local aggregation in extension storage with a buffered event queue
- Manual or periodic upload to a backend API (`POST /api/events`)
- Dashboard displaying weekly aggregated time (`/dashboard`)
- Configurable productive/unproductive domain lists via the Options page

## 🛠️ Technologies & Stack

- Chrome Extension (Manifest V3)
- Background service worker (extension/background.js)
- Popup & Options UIs (HTML/JS)
- Node.js + Express backend (server/index.js)
- Simple JSON file persistence for prototype (`server/data.json`)

## Project structure

```
task4/
├── extension/        # Chrome extension source (manifest, background, popup, options)
├── server/           # Minimal Express backend + dashboard
│   ├── public/       # dashboard UI
│   └── data.json     # prototype persistent store
└── README.md         # this file
```

## Run locally (quick start)

1. Start the backend server:

```bash
cd server
npm install
node index.js
```

Server runs on http://localhost:3000. Dashboard available at http://localhost:3000/dashboard

2. Load the extension in Chrome:

- Open chrome://extensions
- Enable Developer mode
- Click "Load unpacked" and choose the `extension/` folder in this repo

3. Configure extension options (optional):

- Open the extension popup → click Options
- Set Server URL (default: http://localhost:3000/api/events)
- Edit productive and unproductive domain lists as needed

4. Testing flow:

- The extension accumulates per-domain time in `chrome.storage.local` (keys prefixed with `tt:`)
- Click "Send to Server" in the popup to POST buffered events to the backend
- View aggregated results on the dashboard at `/dashboard` or query `/api/summary`

## API endpoints (prototype)

- POST /api/events — Accepts { events: [ { domain, duration, ts } ] } and appends to `server/data.json`
- GET /api/summary — Returns aggregation for the last 7 days
- GET /api/raw — Returns raw stored events (development only)

## Deployment notes

- Vercel (serverless) is possible but not ideal for the current server because `data.json` is ephemeral. If deploying to Vercel, switch to an external database (Supabase/Postgres, Firebase, MongoDB Atlas) and convert endpoints to serverless functions.
- Render, Railway, or a simple VPS are straightforward for this Node server. For production, replace the JSON file with Postgres or another persistent DB and add authentication.

## Configuration & development tips

- Adjust the tick interval in `extension/background.js` (currently per-second alarm) to change sampling frequency.
- Update domain classification lists in the Options UI; the classification is keyword-based (hostname contains keyword).
- For privacy, consider hashing domains or implementing opt-in telemetry.

## Troubleshooting

- "Failed to load extension" referencing icons: add valid icons in `extension/icons/` or remove icon entries from `manifest.json` (the repo already handles this).
- If Send-to-server fails: ensure `server` is running and the Server URL in Options matches your backend (use HTTPS in production).

## Next steps & suggestions

- Add user authentication and per-user DB storage
- Replace `server/data.json` with Postgres and provide migration scripts
- Add charts (Chart.js) and weekly reports
- Harden extension idle detection and background sync

## Author

**Rajat Dua**

- GitHub: https://github.com/therajatdua

Built as part of a web development internship and prototype for productivity analytics.

## License

MIT

## Gallery

<img width="404" height="221" alt="image" src="https://github.com/user-attachments/assets/b2d1b757-fd21-45f5-b35d-25d321dc4f40" />

<img width="392" height="235" alt="image" src="https://github.com/user-attachments/assets/d26b5417-c1ce-4d25-8799-dd91b036f974" />

<img width="406" height="143" alt="image" src="https://github.com/user-attachments/assets/3ae5480a-9802-4ac6-9447-95a5d4a3608c" />

