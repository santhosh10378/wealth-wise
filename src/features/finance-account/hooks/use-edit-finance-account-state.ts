import { FinanceAccount } from '@prisma/client';
import { create } from 'zustand';

type EditAccountState = {
  account: FinanceAccount;
  isOpen: boolean;
  onOpen: (id: FinanceAccount) => void;
  onClose: () => void;
};

const initialState = {
  name: '',
  id: '',
  userId: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useEditFinanceAccountState = create<EditAccountState>((set) => ({
  account: initialState,
  isOpen: false,
  onOpen: (account) => set({ isOpen: true, account }),
  onClose: () => set({ isOpen: false, account: initialState }),
}));
