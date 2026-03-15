# ChatFlow

A real-time chat application built with **React.js** (frontend) and **Express.js** (API server).

## Project Structure

```
chatflow/
├── package.json                # Dependencies & scripts
├── server/
│   └── index.js                # Express API server (port 4000)
├── public/
│   └── index.html              # HTML template
└── src/
    ├── index.js                # React entry point
    ├── App.js                  # Router & global state
    ├── api/
    │   └── chatApi.js          # API service (fetch from server)
    ├── components/
    │   ├── Login.js            # Login view
    │   ├── ChannelList.js      # Channel list view
    │   └── MessageView.js      # Message view
    └── styles/
        └── shared.css          # Shared custom styles for all views
```

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start both API server and React frontend
npm run dev
```

This runs two processes concurrently:
- **API Server** → http://localhost:4000
- **React App** → http://localhost:3000

Or start them separately:
```bash
npm run server   # Start API server only
npm start        # Start React frontend only
```

## API Endpoints

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | `/api/channels`                 | Get all channels         |
| GET    | `/api/channels/:id/messages`    | Get messages in channel  |
| POST   | `/api/channels/:id/messages`    | Send a new message       |

## Features

- ✅ **Login View** – Enter username to join
- ✅ **Channel List** – Fetched from API server, shows name & description
- ✅ **Message View** – Messages loaded from API, can send new messages
- ✅ **Shared Styles** – All views use the same `shared.css` custom stylesheet
- ✅ **Navigation** – React Router handles Login → Channels → Messages → Back
- ✅ **Username** – Entered in login form and passed through all views
