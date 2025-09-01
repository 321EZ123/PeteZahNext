"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type TopbarContextType = {
  topbarToggled: boolean;
  toggleTopbar: () => void;
  hydrated: boolean;
};

const topbarContext = createContext<TopbarContextType | undefined>(undefined);

export const TopbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [topbarToggled, setTopbarToggled] = useState(true);
  const [hydrated, setHydrated] = useState(false); // ← NEW

  useEffect(() => {
    const storedToggle = localStorage.getItem("topbarToggled");
    if (storedToggle !== null) {
      setTopbarToggled(storedToggle === "true");
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("topbarToggled", String(topbarToggled));
    }
  }, [topbarToggled, hydrated]);

  const toggleTopbar = () => {
    setTopbarToggled((prev) => !prev);
  };

  return (
    <topbarContext.Provider value={{ topbarToggled: topbarToggled, toggleTopbar: toggleTopbar, hydrated }}>
      {children}
    </topbarContext.Provider>
  );
};

export const useTopbar = (): TopbarContextType => {
  const context = useContext(topbarContext);
  if (!context)
    throw new Error("useTopbar must be used within a TopbarProvider!!!");
  return context;
};
