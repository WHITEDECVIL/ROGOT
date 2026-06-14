import express from 'express';
import http from 'http';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import WebSocket, { WebSocketServer } from 'ws';
import createAnalyzeRouter from './routes/analyze';
import { ShieldAnalyzer } from './shield/injectionDetector';
import { AuditLogger } from './shield/auditLogger';
import path from 'path';

const PORT = Number(process.env.PORT || 4000);
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'audit.db');

const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(cors());

const limiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
app.use(limiter);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const clients = new Set<WebSocket>();

wss.on('connection', (ws) => {
  clients.add(ws);
  ws.on('close', () => clients.delete(ws));
});

function broadcast(event: any) {
  const str = JSON.stringify(event);
  for (const c of clients) {
    if (c.readyState === WebSocket.OPEN) c.send(str);
  }
}

const analyzer = new ShieldAnalyzer(process.env.CLAUDE_API_KEY);
const logger = new AuditLogger(DB_PATH);

app.use('/analyze', createAnalyzeRouter(analyzer, logger, broadcast));

// health
app.get('/health', (req, res) => res.json({ ok: true }));

server.listen(PORT, () => {
  console.log(`Prompt Injection Shield server running on port ${PORT}`);
});
