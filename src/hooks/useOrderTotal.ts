import { useEffect, useState } from 'react';
import { calculateTotal } from '../native/orderCalc';

// Acts like an Android ViewModel: holds UI state and calls the native layer.
export function useOrderTotal(subtotal: number, taxRatePercent: number) {
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    calculateTotal(subtotal, taxRatePercent)
      .then(value => {
        if (active) {
          setTotal(value);
          setError(null);
        }
      })
      .catch(err => {
        if (active) {
          setError(String(err?.message ?? err));
        }
      });
    return () => {
      active = false;
    };
  }, [subtotal, taxRatePercent]);

  return { total, error };
}
