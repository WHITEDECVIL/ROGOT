import { useState } from 'react';
import { analyzeText } from '../services/shieldApi';
import * as Haptics from 'expo-haptics';
import { ThreatReport } from '../../../server/src/types';

export default function useShieldAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [threatReport, setThreatReport] = useState<ThreatReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ThreatReport[]>([]);

  const analyze = async (text: string) => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const report = await analyzeText(text);
      setThreatReport(report);
      setHistory((h) => [report, ...h].slice(0, 50));

      // haptic feedback scaled to threat
      const intensity = {
        NONE: 0.3,
        LOW: 0.5,
        MEDIUM: 0.7,
        HIGH: 0.9,
        CRITICAL: 1.0,
      }[report.threat_level] || 0.3;
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {
      setError(String(e));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return { isAnalyzing, threatReport, error, history, analyze };
}
