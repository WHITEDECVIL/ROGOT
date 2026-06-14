import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { ThreatReport, AuditLog } from '../types';

export class AuditLogger {
  private db: Database.Database;

  constructor(dbPath: string) {
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    this.db = new Database(dbPath);
    this.init();
  }

  private init() {
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS audit_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          timestamp TEXT,
          input_hash TEXT,
          threat_level TEXT,
          threat_type TEXT,
          confidence REAL,
          safe_to_proceed INTEGER
        )`
      )
      .run();
  }

  log(report: ThreatReport, inputHash: string) {
    const stmt = this.db.prepare(
      `INSERT INTO audit_logs (timestamp, input_hash, threat_level, threat_type, confidence, safe_to_proceed)
      VALUES (?, ?, ?, ?, ?, ?)`
    );
    stmt.run(new Date().toISOString(), inputHash, report.threat_level, report.threat_type, report.confidence, report.safe_to_proceed ? 1 : 0);
  }

  getRecentLogs(limit = 20): AuditLog[] {
    const rows = this.db
      .prepare('SELECT id, timestamp, input_hash, threat_level, threat_type, confidence, safe_to_proceed FROM audit_logs ORDER BY id DESC LIMIT ?')
      .all(limit);
    return rows.map((r: any) => ({
      id: r.id,
      timestamp: r.timestamp,
      input_hash: r.input_hash,
      threat_level: r.threat_level,
      threat_type: r.threat_type,
      confidence: r.confidence,
      safe_to_proceed: !!r.safe_to_proceed,
    }));
  }
}
