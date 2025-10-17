'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { useAI } from '@/contexts/AIContext';
import { ChatMessage } from './ChatMessage';
import styles from './ChatDrawer.module.css';

export function ChatDrawer() {
  const { isChatOpen, setIsChatOpen, initialPrompt, setInitialPrompt } = useAI();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Exact pattern from official guide
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  // Send initial prompt when drawer opens
  useEffect(() => {
    if (initialPrompt && isChatOpen) {
      // Simulate typing and submitting the initial prompt
      const sendInitialMessage = async () => {
        // Create a synthetic form event
        const syntheticEvent = {
          preventDefault: () => {},
        } as React.FormEvent<HTMLFormElement>;
        
        // Call handleSubmit with synthetic event and options
        await handleSubmit(syntheticEvent, {
          data: { message: initialPrompt }
        });
        
        setInitialPrompt(null);
      };
      
      sendInitialMessage();
    }
  }, [initialPrompt, isChatOpen, handleSubmit, setInitialPrompt]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleClose = () => {
    setIsChatOpen(false);
  };

  // Wrap handleSubmit to prevent event bubbling
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation(); // Prevent bubbling to overlay
    handleSubmit(e);
  };

  if (!isChatOpen) return null;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleClose}
    >
      <motion.div
        className={styles.drawer}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 className={styles.title}>Chat</h2>
            <span className={styles.badge}>AI Assistant</span>
          </div>
          <div className={styles.headerRight}>
            <button
              className={styles.iconButton}
              onClick={handleClose}
              title="Close"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💬</div>
              <p className={styles.emptyText}>Start a conversation</p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isStreaming={isLoading && index === messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input - EXACT pattern from official guide */}
        <div className={styles.inputContainer}>
          <form onSubmit={onFormSubmit} className={styles.form}>
            <input
              className={styles.input}
              value={input}
              placeholder="Type a message..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={isLoading}
            >
              {isLoading ? <LoadingIcon /> : <SendIcon />}
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.5 1.5L8.25 9.75M16.5 1.5L11.25 16.5L8.25 9.75M16.5 1.5L1.5 6.75L8.25 9.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.spinner}
    >
      <path
        d="M9 1.5V4.5M9 13.5V16.5M16.5 9H13.5M4.5 9H1.5M14.25 14.25L12.18 12.18M5.82 5.82L3.75 3.75M14.25 3.75L12.18 5.82M5.82 12.18L3.75 14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}