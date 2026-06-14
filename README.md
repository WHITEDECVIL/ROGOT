<div align="center">

# 🛡️ Prompt Injection Shield

### Real-Time AI Security Orchestrator for Prompt Injection, Data Leak & PII Detection

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=22&duration=3000&pause=1000&color=6366F1&center=true&vCenter=true&width=900&lines=Detect+Prompt+Injection+Attacks;Prevent+Data+Leaks+and+PII+Exposure;Real-Time+Claude+AI+Security+Analysis;Mobile+Threat+Monitoring+Dashboard;Enterprise-Grade+AI+Safety+Layer" />

<br>

![GitHub stars](https://img.shields.io/github/stars/USERNAME/Prompt-Injection-Shield?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/USERNAME/Prompt-Injection-Shield?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/USERNAME/Prompt-Injection-Shield?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/USERNAME/Prompt-Injection-Shield?style=for-the-badge)

<br>

<img src="https://komarev.com/ghpvc/?username=USERNAME&label=Repository+Views&color=6366f1&style=for-the-badge" />

</div>

---

## ⚡ Overview

**Prompt Injection Shield** is a next-generation AI security platform that continuously monitors user input for malicious behavior before it reaches an LLM.

The system combines:

* 🤖 Claude AI Threat Analysis
* 🔒 Local PII Detection Engine
* ⚡ Real-Time WebSocket Monitoring
* 📱 Mobile Security Dashboard
* 🧾 Cryptographically Secure Audit Logs
* 🛡️ Prompt Injection & Jailbreak Protection

Designed for AI applications that require enterprise-grade trust and safety controls.

---

# 🎥 Demo Architecture

```mermaid
flowchart LR

A[User Input] --> B[Offline Regex Scanner]

B --> C[Threat Detection API]

C --> D[Claude Security Analyzer]

D --> E[Threat Classification]

E --> F[SQLite Audit Logs]

E --> G[WebSocket Alerts]

G --> H[Mobile Dashboard]

F --> I[Security Reports]
```

---

# ✨ Core Features

<table>
<tr>
<td width="50%">

### 🛡️ Threat Protection

* Prompt Injection Detection
* Jailbreak Detection
* Secret Exposure Detection
* Data Leak Prevention
* Social Engineering Detection
* Command Injection Detection

</td>

<td width="50%">

### ⚡ Real-Time Monitoring

* Live Threat Feed
* WebSocket Events
* Threat Severity Alerts
* Mobile Notifications
* Instant Risk Scoring
* Streamed Analysis

</td>
</tr>
</table>

---

# 🚀 Technology Stack

<div align="center">

### Backend

![NodeJS](https://skillicons.dev/icons?i=nodejs,express,typescript,docker)

### Mobile

![Mobile](https://skillicons.dev/icons?i=react,ts)

### Database

![Database](https://skillicons.dev/icons?i=sqlite)

### Security

![Security](https://skillicons.dev/icons?i=linux,bash,git,github)

</div>

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────┐
│          Mobile Application         │
│        Expo React Native UI         │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│      Express + WebSocket Server     │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│      Claude Security Analyzer       │
│     Prompt Injection Detection      │
└─────────────────┬───────────────────┘
                  │
       ┌──────────┴──────────┐
       ▼                     ▼

 SQLite Audit Logs     Threat Dashboard
 SHA256 Hashed Logs    Live Notifications
```

---

# 🎯 Detection Categories

| Threat                | Description                              |
| --------------------- | ---------------------------------------- |
| 🔥 PROMPT_INJECTION   | Attempts to override system instructions |
| 🚨 JAILBREAK          | DAN-style unrestricted roleplay attacks  |
| 🔑 DATA_LEAK          | API keys, credentials and secrets        |
| 👤 PII_EXPOSURE       | Personal identifiable information        |
| 💀 COMMAND_INJECTION  | Shell and SQL execution attempts         |
| 🎭 SOCIAL_ENGINEERING | Manipulation and phishing attacks        |

---

# 📱 Mobile Dashboard Features

### Scanner

* Real-time input analysis
* Local regex scanning
* Threat severity meter
* Haptic feedback system

### Dashboard

* Live security events
* Risk statistics
* Threat history
* WebSocket updates

---

# ⚙️ Quick Start

## Backend

```bash
git clone https://github.com/USERNAME/Prompt-Injection-Shield.git

cd Prompt-Injection-Shield/server

cp .env.example .env

npm install

npm run dev
```

Server:

```bash
http://localhost:4000
```

---

## Mobile

```bash
cd mobile

npm install

npm start
```

---

## Docker

```bash
export CLAUDE_API_KEY="your-api-key"

docker-compose up
```

---

# 🔐 Security Design

### Data Protection

✅ SHA-256 Audit Logging

✅ No Raw Input Storage

✅ Local PII Detection

✅ Rate Limiting

✅ Request Validation

✅ Secure Event Streaming

---

# 📊 API Example

### POST /analyze

```json
{
  "input": "Ignore all previous instructions",
  "context": "chatbot"
}
```

### Response

```json
{
  "threat_level": "HIGH",
  "threat_type": "PROMPT_INJECTION",
  "confidence": 0.92,
  "safe_to_proceed": false
}
```

---

# 📂 Project Structure

```text
Prompt-Injection-Shield

server/
 ├─ routes/
 ├─ shield/
 ├─ utils/
 ├─ index.ts

mobile/
 ├─ app/
 ├─ hooks/
 ├─ services/
 ├─ components/

docker-compose.yml
README.md
```

---

# 🌟 Why This Project?

Large Language Models are increasingly exposed to:

* Prompt Injection
* Data Exfiltration
* Jailbreak Attempts
* Social Engineering
* Sensitive Data Exposure

Prompt Injection Shield provides a dedicated protection layer between users and AI systems.

---

# 📈 Repository Analytics

<div align="center">

<img height="180em" src="https://github-readme-stats.vercel.app/api?username=USERNAME&show_icons=true&theme=tokyonight"/>

<img height="180em" src="https://github-readme-streak-stats.herokuapp.com/?user=USERNAME&theme=tokyonight"/>

</div>

---

# 🏆 GitHub Trophies

<div align="center">

<img src="https://github-profile-trophy.vercel.app/?username=USERNAME&theme=tokyonight&column=7"/>

</div>

---

# 🐍 Contribution Snake

```yaml
name: Generate Snake

on:
  schedule:
    - cron: "0 */12 * * *"

jobs:
  build:
    runs-on: ubuntu-latest
```

Add generated output:

```md
![Snake animation](https://github.com/USERNAME/USERNAME/blob/output/github-contribution-grid-snake.svg)
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Open Pull Request

---

# 📜 License

Licensed under the MIT License.

---

<div align="center">

### 🛡️ Secure AI Before It Reaches Production

Built for AI Security Engineers • AppSec Teams • Red Teams • LLM Developers

⭐ Star this repository if you found it useful.

</div>
