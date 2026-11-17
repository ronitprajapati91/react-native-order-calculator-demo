import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOrder } from '../context/OrderContext';
import { useOrderTotal } from '../hooks/useOrderTotal';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { defaultTax, addHistory } = useOrder();
  const [subtotal, setSubtotal] = useState('100');
  const [tax, setTax] = useState(defaultTax);

  // Pick up a new default when the user changes it in Settings
  useEffect(() => setTax(defaultTax), [defaultTax]);

  const subNum = Number(subtotal) || 0;
  const taxNum = Number(tax) || 0;
  const { total, error } = useOrderTotal(subNum, taxNum);

  let result = 'Calculating...';
  if (error) {
    result = `Error: ${error}`;
  } else if (total !== null) {
    result = `$${total.toFixed(2)}`;
  }

  const save = () => {
    if (total === null || error) return;
    addHistory({ subtotal: subNum, taxRate: taxNum, total });
    navigation.navigate('History');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.label}>Subtotal</Text>
        <TextInput
          style={styles.input}
          value={subtotal}
          onChangeText={setSubtotal}
          keyboardType="decimal-pad"
        />
        <Text style={styles.label}>Tax (%)</Text>
        <TextInput
          style={styles.input}
          value={tax}
          onChangeText={setTax}
          keyboardType="decimal-pad"
        />
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>{result}</Text>
      </View>

      <View style={styles.buttons}>
        <Button title="Save to history" onPress={save} disabled={total === null || !!error} />
        <View style={styles.spacer} />
        <Button title="View history" onPress={() => navigation.navigate('History')} />
        <View style={styles.spacer} />
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, backgroundColor: '#f1f5f9' },
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 20 },
  label: { fontSize: 13, fontWeight: '600', color: '#475569', marginTop: 12, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  totalCard: {
    marginTop: 24,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  totalLabel: { fontSize: 13, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 },
  total: { fontSize: 32, fontWeight: '700', color: '#ffffff', marginTop: 6 },
  buttons: { marginTop: 24 },
  spacer: { height: 12 },
});