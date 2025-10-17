'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AIContextType {
  // Prompt Input State
  isPromptExpanded: boolean;
  setIsPromptExpanded: (expanded: boolean) => void;
  
  // Chat Drawer State
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isFullscreen: boolean;
  setIsFullscreen: (fullscreen: boolean) => void;
  
  // Current Page Context
  pageContext: string;
  setPageContext: (context: string) => void;
  
  // Initial prompt to pass to chat when opening
  initialPrompt: string | null;
  setInitialPrompt: (prompt: string | null) => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageContext, setPageContext] = useState('dashboard');
  const [initialPrompt, setInitialPrompt] = useState<string | null>(null);

  return (
    <AIContext.Provider
      value={{
        isPromptExpanded,
        setIsPromptExpanded,
        isChatOpen,
        setIsChatOpen,
        isFullscreen,
        setIsFullscreen,
        pageContext,
        setPageContext,
        initialPrompt,
        setInitialPrompt,
      }}
    >
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}