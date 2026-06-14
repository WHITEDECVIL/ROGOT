# Server Setup

## Install
```bash
cd server
npm install
```

## Environment
Copy `.env.example` to `.env` and add your Claude API key:
```bash
cp .env.example .env
```

## Run (Local)
```bash
npm run dev
```

## Run (Docker)
```bash
docker-compose up
```

The server will listen on port 4000. WebSocket is available at `ws://localhost:4000`.

### Endpoints
- `POST /analyze` - Submit text for analysis
- `GET /health` - Health check
