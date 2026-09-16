'use client';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Modal } from '../components/overlays/Modal';

export interface ModalStackItem {
  readonly id: string;
  readonly content: ReactNode;
}

export interface ModalContextValue {
  readonly openModals: readonly ModalStackItem[];
  readonly openModal: (id: string, content: ReactNode) => void;
  readonly closeModal: (id: string) => void;
  readonly closeAll: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export interface ModalProviderProps {
  readonly children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps): JSX.Element {
  const [openModals, setOpenModals] = useState<readonly ModalStackItem[]>([]);

  const openModal = useCallback((id: string, content: ReactNode) => {
    setOpenModals((prev) => (prev.some((m) => m.id === id) ? prev : [...prev, { id, content }]));
  }, []);

  const closeModal = useCallback((id: string) => {
    setOpenModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const closeAll = useCallback(() => setOpenModals([]), []);

  const value: ModalContextValue = { openModals, openModal, closeModal, closeAll };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {openModals.map((m) => (
        <Modal
          key={m.id}
          open
          onClose={() => closeModal(m.id)}
          size="md"
        >
          {m.content}
        </Modal>
      ))}
    </ModalContext.Provider>
  );
}

export function useModalContext(): ModalContextValue {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalContext must be used within <ModalProvider>');
  return ctx;
}
