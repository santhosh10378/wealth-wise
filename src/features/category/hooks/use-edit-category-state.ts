import { Category } from '@prisma/client';
import { create } from 'zustand';

type EditCategoryState = {
  category: Category;
  isOpen: boolean;
  onOpen: (category: Category) => void;
  onClose: () => void;
};

const initialState = {
  name: '',
  id: '',
  userId: '',
  plaidId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useEditCategoryState = create<EditCategoryState>((set) => ({
  category: initialState,
  isOpen: false,
  onOpen: (category) => set({ isOpen: true, category }),
  onClose: () => set({ isOpen: false, category: initialState }),
}));
