import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ThreatType = 'NONE' | 'PROMPT_INJECTION' | 'JAILBREAK' | 'DATA_LEAK' | 'PII_EXPOSURE' | 'COMMAND_INJECTION' | 'SOCIAL_ENGINEERING';

const MAP: Record<ThreatType, { color: string; label: string }> = {
  NONE: { color: '#22c55e', label: 'No Threat' },
  PROMPT_INJECTION: { color: '#f97316', label: 'Prompt Injection' },
  JAILBREAK: { color: '#ef4444', label: 'Jailbreak' },
  DATA_LEAK: { color: '#ef4444', label: 'Data Leak' },
  PII_EXPOSURE: { color: '#eab308', label: 'PII Exposed' },
  COMMAND_INJECTION: { color: '#ef4444', label: 'Command Injection' },
  SOCIAL_ENGINEERING: { color: '#f97316', label: 'Social Engineering' },
};

export default function ThreatBadge({ type = 'NONE' as ThreatType }) {
  const meta = MAP[type] || MAP.NONE;
  return (
    <View style={[styles.badge, { backgroundColor: meta.color }]}> 
      <Text style={styles.text}>{meta.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 },
  text: { color: '#fff', fontWeight: '700' }
});
