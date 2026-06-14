# 🛡️ Prompt Injection Shield - Navigation Guide

Welcome to the Prompt Injection Shield project! This is a complete real-time mobile security orchestrator.

## 📖 Where to Start

### First Time Here?
1. **[README.md](README.md)** ← Start here! Overview, features, quick start
2. **[IMPLEMENTATION.md](IMPLEMENTATION.md)** ← Architecture & detailed guide
3. **[USAGE_EXAMPLES.md](USAGE_EXAMPLES.md)** ← API examples & integration patterns

### Reference Docs
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** — Complete file structure & metrics
- **[DELIVERY_MANIFEST.md](DELIVERY_MANIFEST.md)** — Feature checklist & deliverables

### Setup & Testing
- **[server/README.md](server/README.md)** — Backend setup
- **[mobile/README.md](mobile/README.md)** — Mobile setup
- **[quickstart.sh](quickstart.sh)** — Automated setup script
- **[verify.sh](verify.sh)** — Project verification
- **[test-api.sh](test-api.sh)** — API test suite

---

## 🏗️ Project Structure

```
Rogot/
├── Backend (Node.js + Express + TypeScript)
│   └── server/
│       ├── src/index.ts              ← Main server
│       ├── src/shield/               ← Claude analyzer & SQLite logger
│       ├── src/routes/analyze.ts     ← API endpoint
│       └── Dockerfile                ← Docker image
│
├── Mobile (Expo React Native)
│   └── mobile/
│       ├── app/(tabs)/scanner.tsx    ← Main threat scanner
│       ├── app/(tabs)/dashboard.tsx  ← Live WebSocket feed
│       ├── components/               ← ThreatMeter, ThreatBadge
│       └── services/shieldApi.ts     ← API + local regex
│
├── Deployment
│   ├── docker-compose.yml            ← Docker setup
│   ├── .github/workflows/build.yml   ← CI/CD
│   └── .env.example                  ← Environment
│
└── Documentation
    ├── README.md                     ← Main docs
    ├── IMPLEMENTATION.md             ← Architecture
    ├── USAGE_EXAMPLES.md             ← API examples
    ├── PROJECT_SUMMARY.md            ← File index
    └── DELIVERY_MANIFEST.md          ← Checklist
```

---

## 🚀 Quick Start

### Option 1: Automated Setup
```bash
export CLAUDE_API_KEY="your-key-here"
./quickstart.sh
```

### Option 2: Manual Setup

**Backend:**
```bash
cd server
cp .env.example .env
# Edit .env and add CLAUDE_API_KEY
npm install
npm run dev
```

**Mobile (in new terminal):**
```bash
cd mobile
npm install
npm start
```

### Option 3: Docker
```bash
export CLAUDE_API_KEY="your-key-here"
docker-compose up
```

---

## 🔑 Key Features

| Feature | Location |
|---------|----------|
| **Threat Scanner** | `mobile/app/(tabs)/scanner.tsx` |
| **Live Dashboard** | `mobile/app/(tabs)/dashboard.tsx` |
| **Claude Analysis** | `server/src/shield/injectionDetector.ts` |
| **SQLite Logging** | `server/src/shield/auditLogger.ts` |
| **WebSocket Events** | `server/src/index.ts` |
| **API Endpoint** | `server/src/routes/analyze.ts` |
| **Animated Gauge** | `mobile/components/ThreatMeter.tsx` |
| **Demo Payloads** | `mobile/constants/demoPayloads.ts` |

---

## 🧠 What It Detects

The system identifies 7 threat types:

1. **PROMPT_INJECTION** — Override system context
2. **JAILBREAK** — Unrestricted AI attempts (DAN)
3. **DATA_LEAK** — Secrets, API keys, credentials
4. **PII_EXPOSURE** — Personal data (email, SSN, etc.)
5. **COMMAND_INJECTION** — Shell/SQL commands
6. **SOCIAL_ENGINEERING** — Phishing, urgency tactics
7. **NONE** — No threat detected

---

## 📱 Mobile App Flow

```
User Input
    ↓
[TextInput] ← Paste suspicious text
    ↓
[Scan Button] ← Tap to analyze
    ↓
Local Regex Pre-scan (offline)
    ↓
POST /analyze (backend)
    ↓
Claude LLM Analysis
    ↓
WebSocket Stream (tokens)
    ↓
[ThreatMeter] ← Animated gauge
[ThreatBadge] ← Threat type
[Confidence] ← % certainty
[Indicators] ← What was found
[PII Chips] ← Personal data
[Verdict] ← Safe/Blocked
    ↓
Haptic Feedback (scaled)
    ↓
Cache Result (AsyncStorage)
```

---

## 🔗 API Reference

### POST /analyze
**Request:**
```json
{
  "input": "text to analyze",
  "context": "optional context"
}
```

**Response:**
```json
{
  "threatReport": {
    "threat_level": "HIGH",
    "threat_type": "PROMPT_INJECTION",
    "confidence": 0.92,
    "indicators": ["string"],
    "pii_detected": [],
    "recommendation": "string",
    "safe_to_proceed": false
  },
  "analysisId": "id",
  "timestamp": "2026-06-14T10:30:00Z"
}
```

### WebSocket Events
- `analysis.started` — Analysis beginning
- `analysis.token` — Token chunk (streaming)
- `analysis.complete` — Final result

### GET /health
Simple health check returning `{ ok: true }`.

---

## 📚 Documentation Map

| Document | Contains |
|----------|----------|
| **README.md** | Overview, features, setup, API |
| **IMPLEMENTATION.md** | Architecture, config, deployment, troubleshooting |
| **USAGE_EXAMPLES.md** | curl commands, mobile flow, error handling |
| **PROJECT_SUMMARY.md** | File structure, metrics, statistics |
| **DELIVERY_MANIFEST.md** | Feature checklist, deliverables |
| **server/README.md** | Backend-specific setup |
| **mobile/README.md** | Mobile-specific setup |

---

## 🛠️ Useful Commands

### Backend
```bash
cd server
npm run dev          # Development mode
npm run build        # Compile TypeScript
npm start            # Production
```

### Mobile
```bash
cd mobile
npm start            # Expo CLI
npm run android      # Run on Android
npm run ios          # Run on iOS
npm run web          # Run on web
```

### Testing
```bash
./test-api.sh        # Test API with curl
./verify.sh          # Verify project structure
```

### Docker
```bash
docker-compose up         # Start container
docker-compose down       # Stop container
docker-compose logs -f    # View logs
```

---

## 🔐 Security Model

- **Input Hashing**: SHA-256 (never logs raw input)
- **Rate Limiting**: 30 requests/minute per IP
- **Offline Detection**: PII regex works without internet
- **Privacy**: No personal data stored
- **CORS**: Cross-origin requests enabled safely

---

## 📊 Project Stats

- **Total Files**: 26
- **Lines of Code**: 2,012
- **TypeScript Files**: 14
- **React Components**: 7
- **Threat Types**: 7
- **Demo Payloads**: 5
- **PII Patterns**: 6
- **API Endpoints**: 2
- **Documentation Pages**: 4+

---

## ❓ Troubleshooting

### Backend won't start
→ Check `CLAUDE_API_KEY` is set in `.env`

### Mobile can't connect
→ Update `API_BASE` in `mobile/services/shieldApi.ts`

### Database error
→ Run `mkdir -p server/data` and restart

### API returns NONE threat
→ Check Claude API key validity

See **[IMPLEMENTATION.md](IMPLEMENTATION.md)** for more troubleshooting.

---

## 🎯 Next Steps

1. **Read** → Start with [README.md](README.md)
2. **Setup** → Run [quickstart.sh](quickstart.sh)
3. **Learn** → Review [IMPLEMENTATION.md](IMPLEMENTATION.md)
4. **Test** → Try [test-api.sh](test-api.sh)
5. **Explore** → Check source in `server/src/` and `mobile/`
6. **Deploy** → Use [docker-compose.yml](docker-compose.yml)

---

## 📞 Project Info

- **Status**: ✅ Production-Ready
- **Version**: 0.1.0
- **License**: MIT
- **Stack**: React Native + Node.js + Claude AI + SQLite
- **Date**: June 14, 2026

---

**Ready to begin? → Open [README.md](README.md)** 🚀
