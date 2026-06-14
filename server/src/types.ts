export type ThreatLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ThreatType =
  | 'NONE'
  | 'PROMPT_INJECTION'
  | 'JAILBREAK'
  | 'DATA_LEAK'
  | 'PII_EXPOSURE'
  | 'COMMAND_INJECTION'
  | 'SOCIAL_ENGINEERING';

export interface ThreatReport {
  threat_level: ThreatLevel;
  threat_type: ThreatType;
  confidence: number;
  indicators: string[];
  pii_detected: string[];
  recommendation: string;
  safe_to_proceed: boolean;
}

export interface AuditLog {
  id: number;
  timestamp: string;
  input_hash: string;
  threat_level: ThreatLevel;
  threat_type: ThreatType;
  confidence: number;
  safe_to_proceed: boolean;
}

export interface AnalyzeRequest {
  input: string;
  context?: string;
}

export interface AnalyzeResponse {
  threatReport: ThreatReport;
  analysisId: string;
  timestamp: string;
}

export interface WebSocketEvent {
  type: string;
  payload: any;
}
