// ReceiptContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface ReceiptData {
  method: string;
  total: number;
  cash: number;
  change: number;
  customerName: string;
  currentDate: string;
  currentTime: string;
}

interface ReceiptContextType {
  receiptData: ReceiptData | null;
  setReceiptData: React.Dispatch<React.SetStateAction<ReceiptData | null>>;
}

const ReceiptContext = createContext<ReceiptContextType>({
  receiptData: null,
  setReceiptData: () => {},
});

export const ReceiptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  return (
    <ReceiptContext.Provider value={{ receiptData, setReceiptData }}>
      {children}
    </ReceiptContext.Provider>
  );
};

export const useReceipt = () => useContext(ReceiptContext);
