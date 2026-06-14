import express from 'express';
import { AnalyzeRequest, AnalyzeResponse } from '../types';
import { ShieldAnalyzer } from '../shield/injectionDetector';
import { AuditLogger } from '../shield/auditLogger';
import { sha256 } from '../utils/hash';

export default function createAnalyzeRouter(analyzer: ShieldAnalyzer, logger: AuditLogger, broadcaster: (event: any) => void) {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const body = req.body as AnalyzeRequest;
    const input = (body && body.input) || '';
    if (!input || typeof input !== 'string' || input.trim().length === 0) {
      return res.status(400).json({ error: 'input is required' });
    }
    if (input.length > 10000) {
      return res.status(413).json({ error: 'input too large' });
    }

    const inputHash = sha256(input);

    // broadcast that analysis started
    const analysisId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    broadcaster({ type: 'analysis.started', payload: { analysisId, input_hash: inputHash, timestamp: new Date().toISOString() } });

    try {
      const threatReport = await analyzer.analyzePrompt(input);

      // log to DB
      logger.log(threatReport, inputHash);

      // stream tokens simulated: break recommendation and indicators into small chunks
      const streamText = JSON.stringify(threatReport);
      for (let i = 0; i < streamText.length; i += 40) {
        const chunk = streamText.slice(i, i + 40);
        broadcaster({ type: 'analysis.token', payload: { analysisId, token: chunk } });
      }

      // final event
      broadcaster({ type: 'analysis.complete', payload: { analysisId, threatReport, timestamp: new Date().toISOString() } });

      const response: AnalyzeResponse = { threatReport, analysisId, timestamp: new Date().toISOString() };
      res.json(response);
    } catch (err: any) {
      res.status(500).json({ error: 'analysis_failed', details: String(err?.message || err) });
    }
  });

  return router;
}
