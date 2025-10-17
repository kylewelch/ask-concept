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
      <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '20px' }}>
        Try asking about team members, like "Who is Evan Park's manager?"
      </p>
      
      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
        <p>Some example queries to try:</p>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          <li>Who is Evan Park's manager?</li>
          <li>Tell me about the team structure</li>
          <li>What projects is Mike Johnson working on?</li>
          <li>Who reports to Jane Smith?</li>
        </ul>
      </div>
      
      {/* Only show prompt input when chat drawer is closed */}
      {!isChatOpen && <PromptInput />}
      
      {/* Chat drawer with animation */}
      <AnimatePresence>
        {isChatOpen && <ChatDrawer />}
      </AnimatePresence>
    </div>
  );
}