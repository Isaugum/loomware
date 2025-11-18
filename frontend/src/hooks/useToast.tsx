'use client';

import * as React from 'react';
import { ToastProps } from '@components/ui/toast';

type ToasterToast = ToastProps & {
  id: string;
};

const toastQueue: ToasterToast[] = [];

type ToastListeners = (toast: ToasterToast) => void;
let listeners: ToastListeners[] = [];

export function toast({ ...props }: ToastProps) {
  const id = Math.random().toString(36);
  const newToast = { id, ...props };
  toastQueue.push(newToast);
  listeners.forEach((listener) => listener(newToast));
  return id;
}

export function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([]);

  React.useEffect(() => {
    const listener = (toast: ToasterToast) => {
      setToasts((prev) => [...prev, toast]);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return {
    toasts,
  };
}
