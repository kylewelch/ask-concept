'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PromptInput } from '@/components/AIPrompt/PromptInput';
import { ChatDrawer } from '@/components/ChatDrawer/ChatDrawer';
import { useAI } from '@/contexts/AIContext';

export default function HomePage() {
  const { setPageContext, isChatOpen } = useAI();

  useEffect(() => {
    setPageContext('team');
  }, [setPageContext]);

  return (
    <div style={{ padding: '40px', minHeight: '100vh', background: '#1a1a1a' }}>
      <h1 style={{ color: 'white', marginBottom: '20px' }}>Team Page</h1>
      
      {/* Only show prompt input when chat drawer is closed */}
      {!isChatOpen && <PromptInput />}
      
      {/* Chat drawer with animation */}
      <AnimatePresence>
        {isChatOpen && <ChatDrawer />}
      </AnimatePresence>
    </div>
  );
}