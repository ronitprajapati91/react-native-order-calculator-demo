import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useOrder } from '../context/OrderContext';

export default function HistoryScreen() {
  const { history, clearHistory } = useOrder();

  if (history.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No saved totals yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowTitle}>${item.total.toFixed(2)}</Text>
            <Text style={styles.rowSub}>
              Subtotal {item.subtotal.toFixed(2)} · Tax {item.taxRate}%
            </Text>
          </View>
        )}
      />
      <Button title="Clear history" onPress={clearHistory} color="#dc2626" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 16, backgroundColor: '#f1f5f9' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f5f9' },
  emptyText: { fontSize: 16, color: '#64748b' },
  row: { backgroundColor: '#ffffff', borderRadius: 12, padding: 14, marginBottom: 10 },
  rowTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  rowSub: { fontSize: 13, color: '#64748b', marginTop: 4 },
});