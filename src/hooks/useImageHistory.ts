import { useState, useEffect } from "react";

interface ImageHistoryEntry {
  id: string;
  originalImageUrl: string;
  processedImageUrl: string;
  timestamp: number;
}

const LOCAL_STORAGE_KEY = "imageHistory";

export const useImageHistory = () => {
  const [history, setHistory] = useState<ImageHistoryEntry[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load image history from local storage:", error);
    }
  }, []);

  const addHistoryEntry = (originalImageUrl: string, processedImageUrl: string) => {
    const newEntry: ImageHistoryEntry = {
      id: Date.now().toString(), // Simple unique ID
      originalImageUrl,
      processedImageUrl,
      timestamp: Date.now(),
    };
    setHistory((prevHistory) => {
      const updatedHistory = [newEntry, ...prevHistory];
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
      } catch (error) {
        console.error("Failed to save image history to local storage:", error);
      }
      return updatedHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear image history from local storage:", error);
    }
  };

  return { history, addHistoryEntry, clearHistory };
};
