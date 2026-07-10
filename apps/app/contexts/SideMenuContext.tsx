import React, { createContext, useContext, useState, ReactNode } from "react";

interface SideMenuContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SideMenuContext = createContext<SideMenuContextValue | undefined>(undefined);

export function SideMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SideMenuContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle: () => setIsOpen((prev) => !prev),
      }}
    >
      {children}
    </SideMenuContext.Provider>
  );
}

export function useSideMenu() {
  const ctx = useContext(SideMenuContext);
  if (!ctx) throw new Error("useSideMenu must be used within SideMenuProvider");
  return ctx;
}