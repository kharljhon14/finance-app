import { create } from 'zustand';

export interface NewAccountState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewAccount = create<NewAccountState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));
