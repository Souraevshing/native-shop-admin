"use client";

import { ExternalToast, toast } from "sonner";

export function useToast() {
  const showSuccess = (message: string, data?: ExternalToast) => {
    toast.success(message, data);
  };

  const showWarning = (message: string, data?: ExternalToast) => {
    toast.warning(message, data);
  };

  const showError = (message: string, data?: ExternalToast) => {
    toast.error(message, data);
  };

  const showInfo = (message: string, data?: ExternalToast) => {
    toast.info(message, data);
  };

  const showPromise = <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  };

  return { showSuccess, showWarning, showError, showInfo, showPromise };
}
