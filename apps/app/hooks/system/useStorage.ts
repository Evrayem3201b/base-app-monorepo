import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useMemo, useState } from "react";

type StorageBackend = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

export function useStorage<T>(key: string, secure = false) {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<Error | null>(null);

  const backend = useMemo<StorageBackend>(
    () =>
      secure
        ? {
            getItem: SecureStore.getItemAsync,
            setItem: SecureStore.setItemAsync,
            removeItem: SecureStore.deleteItemAsync,
          }
        : {
            getItem: AsyncStorage.getItem.bind(AsyncStorage),
            setItem: AsyncStorage.setItem.bind(AsyncStorage),
            removeItem: AsyncStorage.removeItem.bind(AsyncStorage),
          },
    [secure],
  );

  useEffect(() => {
    let cancelled = false;
    const loadItem = async () => {
      try {
        setLoading(true);
        setErr(null);

        const data = await backend.getItem(key);
        if (cancelled) return;

        setValue(data ? safeParse<T>(data) : null);
      } catch (error) {
        if (!cancelled) {
          setErr(error instanceof Error ? error : new Error(String(error)));
        }
      }
      setLoading(false);
    };
    loadItem();

    return () => {
      cancelled = true;
    };
  }, [key, backend]); // include backend

  const addItem = useCallback(
    async (newValue: T) => {
      try {
        setErr(null);
        const jsonValue = JSON.stringify(newValue);
        await backend.setItem(key, jsonValue);
        setValue(newValue);
      } catch (error) {
        setErr(error instanceof Error ? error : new Error(String(error)));
      }
    },
    [key, backend],
  );

  const editItem = useCallback(
    async (newValue: T) => {
      await addItem(newValue);
    },
    [addItem],
  );

  const removeItem = useCallback(async () => {
    try {
      setErr(null);
      await backend.removeItem(key);
      setValue(null);
    } catch (error) {
      setErr(error instanceof Error ? error : new Error(String(error)));
    }
  }, [key, backend]);

  const getItem = useCallback(async (): Promise<T | null> => {
    try {
      const data = await backend.getItem(key);
      return data ? safeParse<T>(data) : null;
    } catch (error) {
      setErr(error instanceof Error ? error : new Error(String(error)));
      return null;
    }
  }, [key, backend]);

  return {
    value,
    setValue,
    addItem,
    editItem,
    getItem,
    removeItem,
    loading,
    err,
  };
}

function safeParse<T>(data: string): T | null {
  try {
    return JSON.parse(data) as T;
  } catch {
    return data as unknown as T; // fall back to raw string
  }
}
