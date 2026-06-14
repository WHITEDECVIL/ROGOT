import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { WebSocketEvent } from '../../../server/src/types';
import { subscribeToAlerts } from '../../services/shieldApi';

export default function Dashboard() {
  const [feed, setFeed] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsub = subscribeToAlerts((ev) => {
      setFeed((s) => [ev, ...s].slice(0, 20));
    });
    return unsub;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Feed</Text>
      <FlatList
        data={feed}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item.type}</Text>
            <Text style={styles.rowSub}>{JSON.stringify(item.payload).slice(0, 80)}</Text>
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(false)} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#0a0a0f' },
  title: { color: '#fff', fontSize: 20, marginBottom: 12 },
  row: { padding: 12, backgroundColor: '#12121a', borderRadius: 12, marginBottom: 8, borderColor: '#1e1e2e', borderWidth: 1 },
  rowText: { color: '#fff', fontWeight: '700' },
  rowSub: { color: '#9ca3af', marginTop: 6 }
});
