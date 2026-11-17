import { NativeModules } from 'react-native';

type OrderCalcNative = {
  calculateTotal(subtotal: number, taxRatePercent: number): Promise<number>;
};

console.log('Native modules:', Object.keys(NativeModules));

const native = NativeModules.OrderCalc as OrderCalcNative | undefined;

// Typed wrapper around the native module. Components never touch NativeModules directly.
export function calculateTotal(subtotal: number, taxRatePercent: number): Promise<number> {
  if (!native) {
    return Promise.reject(new Error('OrderCalc native module not found. Rebuild the app.'));
  }
  return native.calculateTotal(subtotal, taxRatePercent);
}
