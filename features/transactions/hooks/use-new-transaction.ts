import { create } from 'zustand';

export interface NewTransactionState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewTransaction = create<NewTransactionState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));
