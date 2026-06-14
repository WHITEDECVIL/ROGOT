# Prompt Injection Shield

A full-stack real-time mobile security orchestrator that detects **prompt injection attacks**, **data leaks**, and **PII exposure** using Claude AI.

## Architecture

- **Backend**: Node.js + Express + WebSocket (TypeScript)
- **Mobile**: Expo React Native
- **Security Analyzer**: Claude Sonnet 4.6 LLM
- **Audit Logger**: SQLite with SHA-256 hashing (never stores raw input)
- **Deployment**: Docker Compose

## Key Features

✅ **Real-time threat detection** via Claude API  
✅ **Token-stream responses** for "thinking" state UI feedback  
✅ **Rate limiting** (30 req/min per IP)  
✅ **Local PII regex pre-scan** (works offline)  
✅ **SHA-256 hashed audit logs** in SQLite  
✅ **WebSocket live alerts** to mobile dashboard  
✅ **Haptic feedback** scaled to threat level  
✅ **5 demo attack payloads** (prompt injection, jailbreak, data leak, PII, SQL injection)

## Quick Start

### Backend

```bash
cd server
cp .env.example .env
# Add your CLAUDE_API_KEY to .env
npm install
npm run dev
```

Server runs on `http://localhost:4000`.

### Mobile

```bash
cd mobile
npm install
npm start
# Scan via Android/iOS emulator or device
```

### Docker (Backend only)

```bash
export CLAUDE_API_KEY="your-key-here"
docker-compose up
```

## Project Structure

```
.
├── server/
│   ├── src/
│   │   ├── index.ts              # Express + WebSocket server
│   │   ├── types.ts              # TypeScript interfaces
│   │   ├── shield/
│   │   │   ├── injectionDetector.ts  # ShieldAnalyzer (calls Claude)
│   │   │   └── auditLogger.ts        # SQLite audit logs
│   │   ├── routes/
│   │   │   └── analyze.ts            # POST /analyze route
│   │   └── utils/
│   │       └── hash.ts               # SHA-256 hashing
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── mobile/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── scanner.tsx       # Main scanner screen
│   │   │   └── dashboard.tsx     # Live feed dashboard
│   │   └── index.tsx
│   ├── components/
│   │   ├── ThreatMeter.tsx       # Animated threat gauge
│   │   └── ThreatBadge.tsx       # Threat type pill
│   ├── services/
│   │   └── shieldApi.ts          # API + WebSocket + local regex
│   ├── hooks/
│   │   └── useShieldAnalysis.ts  # State + haptics
│   ├── constants/
│   │   └── demoPayloads.ts       # 5 demo attack payloads
│   ├── App.tsx
│   ├── package.json
│   └── app.json
├── docker-compose.yml
└── README.md
```

## Detection Rules

The Claude analyzer detects:
1. **PROMPT_INJECTION** - Override/escape system context
2. **JAILBREAK** - Unrestricted AI roleplay (DAN, etc.)
3. **DATA_LEAK** - Credentials, API keys, secrets
4. **PII_EXPOSURE** - Emails, phones, SSNs, credit cards
5. **COMMAND_INJECTION** - Shell/SQL commands, script tags
6. **SOCIAL_ENGINEERING** - Urgency, authority spoofing, phishing

## Local Pre-Scan Regex

Before calling Claude, the mobile app runs offline checks:
- **Email**: `/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}/g`
- **API Keys**: `/(sk-|pk_|ghp_|xox[baprs]-)[a-zA-Z0-9]{16,}/g`
- **SSN**: `/\b\d{3}-\d{2}-\d{4}\b/g`
- **Credit Card**: `/\b(?:\d[ -]?){13,16}\b/g`
- **SQL Injection**: `/(\bUNION\b|\bSELECT\b|\bDROP\b|\bINSERT\b).+\b(FROM|INTO|TABLE)\b/gi`
- **Prompt Override**: `/ignore (all )?(previous|prior|above)|forget your (instructions?|training)|you are now|act as (an? )?(unrestricted|unfiltered|DAN)/gi`

## API Endpoints

### POST /analyze
Request:
```json
{
  "input": "your text to analyze",
  "context": "optional context"
}
```

Response:
```json
{
  "threatReport": {
    "threat_level": "HIGH",
    "threat_type": "PROMPT_INJECTION",
    "confidence": 0.92,
    "indicators": ["override_attempt", "system_context_escape"],
    "pii_detected": [],
    "recommendation": "Block this input immediately.",
    "safe_to_proceed": false
  },
  "analysisId": "1234567890-abc123",
  "timestamp": "2026-06-14T10:30:00Z"
}
```

### WebSocket Events
- `analysis.started` - Analysis beginning
- `analysis.token` - Token stream (LLM thinking)
- `analysis.complete` - Final result

### GET /health
Returns `{ ok: true }`

## Demo Payloads

5 pre-built attack examples in [mobile/constants/demoPayloads.ts](mobile/constants/demoPayloads.ts):
1. Prompt Injection
2. Jailbreak (DAN)
3. Data Leak
4. PII Exposure
5. SQL Injection

Load into scanner to see real threat analysis.

## Security

✅ **Never logs raw input** — all stored data is SHA-256 hashed  
✅ **Rate limiting** — max 30 requests/minute per IP  
✅ **CORS enabled** for cross-origin requests  
✅ **Input validation** — max 10,000 chars, rejects empty input  
✅ **Offline PII detection** — works without internet  

## Design System

| Token | Value |
|-------|-------|
| Background | `#0a0a0f` |
| Surface | `#12121a` |
| Border | `#1e1e2e` |
| Accent | `#6366f1` |
| Success | `#22c55e` |
| Warning | `#f97316` |
| Danger | `#ef4444` |
| Critical | `#7c3aed` |

Font: JetBrains Mono (indicators), system font (UI).  
Radius: 16px. Border: 1px 15% white.

## Environment Variables

### Server
- `CLAUDE_API_KEY` (required) - Your Anthropic API key
- `PORT` (default: 4000)
- `DB_PATH` (default: `./data/audit.db`)

## License

MIT