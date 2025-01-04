import { TransactionResponse } from '../schemas/transaction-schemas';
import { create } from 'zustand';

type EditTransactionState = {
  transaction: TransactionResponse;
  isOpen: boolean;
  onOpen: (transaction: TransactionResponse) => void;
  onClose: () => void;
};

const initialState = {
  id: '',
  amount: 0,
  payee: '',
  notes: '',
  description: '',
  accountId: '',
  categoryId: '',
  date: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useEditTransactionState = create<EditTransactionState>((set) => ({
  transaction: initialState,
  isOpen: false,
  onOpen: (transaction) => set({ isOpen: true, transaction }),
  onClose: () => set({ isOpen: false, transaction: initialState }),
}));
