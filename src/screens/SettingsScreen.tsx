import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useOrder } from '../context/OrderContext';

export default function SettingsScreen() {
  const { defaultTax, setDefaultTax } = useOrder();

  return (
    <View style={styles.screen}>
      <Text style={styles.label}>Default tax (%)</Text>
      <TextInput
        style={styles.input}
        value={defaultTax}
        onChangeText={setDefaultTax}
        keyboardType="decimal-pad"
      />
      <Text style={styles.hint}>Used as the starting tax rate on the Home screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 24, backgroundColor: '#f1f5f9' },
  label: { fontSize: 13, fontWeight: '600', color: '#475569', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  hint: { fontSize: 13, color: '#64748b', marginTop: 8 },
});