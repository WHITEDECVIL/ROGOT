import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import ThreatMeter from '../../components/ThreatMeter';
import ThreatBadge from '../../components/ThreatBadge';
import { analyzeText } from '../../services/shieldApi';
import useShieldAnalysis from '../../hooks/useShieldAnalysis';

export default function Scanner() {
  const [text, setText] = useState('');
  const { isAnalyzing, threatReport, analyze } = useShieldAnalysis();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prompt Injection Scanner</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Paste suspicious prompt here"
        placeholderTextColor="#666"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => analyze(text)}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? <ActivityIndicator color="#fff" /> : <Text style={styles.scanText}>Scan</Text>}
      </TouchableOpacity>

      <View style={styles.resultRow}>
        <ThreatMeter level={(threatReport?.threat_level) ?? 'NONE'} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <ThreatBadge type={(threatReport?.threat_type) ?? 'NONE'} />
          <Text style={styles.confidence}>{Math.round(((threatReport?.confidence ?? 0) * 100))}%</Text>
        </View>
      </View>

      <ScrollView style={styles.details}>
        <Text style={styles.sectionTitle}>Indicators</Text>
        {(threatReport?.indicators || []).map((i, idx) => (
          <Text key={idx} style={styles.indicator}>- {i}</Text>
        ))}

        <Text style={styles.sectionTitle}>PII Detected</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {(threatReport?.pii_detected || []).map((p, idx) => (
            <View key={idx} style={styles.piiChip}><Text style={{ color: '#fff' }}>{p}</Text></View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Verdict</Text>
        <Text style={styles.verdict}>{threatReport?.safe_to_proceed ? 'Safe to proceed' : 'BLOCKED'}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0a0a0f' },
  title: { color: '#fff', fontSize: 20, marginBottom: 12 },
  input: { minHeight: 120, backgroundColor: '#12121a', color: '#fff', padding: 12, borderRadius: 12, borderColor: '#1e1e2e', borderWidth: 1 },
  scanButton: { marginTop: 12, backgroundColor: '#6366f1', padding: 14, borderRadius: 12, alignItems: 'center' },
  scanText: { color: '#fff', fontWeight: '600' },
  resultRow: { flexDirection: 'row', marginTop: 16, alignItems: 'center' },
  confidence: { color: '#9ca3af', marginTop: 6 },
  details: { marginTop: 16 },
  sectionTitle: { color: '#fff', fontWeight: '700', marginTop: 12 },
  indicator: { color: '#ddd', marginTop: 6 },
  piiChip: { padding: 8, backgroundColor: '#1e1e2e', borderRadius: 12, margin: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  verdict: { color: '#fff', fontSize: 18, marginTop: 8 }
});
