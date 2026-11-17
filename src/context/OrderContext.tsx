import React, { createContext, ReactNode, useContext, useState } from 'react';

export type HistoryItem = { id: string; subtotal: number; taxRate: number; total: number };

type OrderContextValue = {
  defaultTax: string;
  setDefaultTax: (v: string) => void;
  history: HistoryItem[];
  addHistory: (item: Omit<HistoryItem, 'id'>) => void;
  clearHistory: () => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [defaultTax, setDefaultTax] = useState('18');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addHistory = (item: Omit<HistoryItem, 'id'>) =>
    setHistory(prev => [
      { ...item, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` },
      ...prev,
    ]);

  const clearHistory = () => setHistory([]);

  return (
    <OrderContext.Provider
      value={{ defaultTax, setDefaultTax, history, addHistory, clearHistory }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used inside OrderProvider');
  return ctx;
}