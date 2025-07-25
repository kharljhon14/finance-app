import { create } from 'zustand';

export interface OpenCategoryState {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useOpenCategory = create<OpenCategoryState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false })
}));
