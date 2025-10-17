'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '@/contexts/AIContext';
import { useSuggestions } from '@/hooks/useSuggestions';
import { SuggestionButton } from '@/components/shared/SuggestionButton';
import styles from './PromptInput.module.css';

export function PromptInput() {
  const { pageContext, setInitialPrompt, setIsChatOpen, isPromptExpanded, setIsPromptExpanded } = useAI();
  const suggestions = useSuggestions(pageContext);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSuggestionClick = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Pass the prompt to context and open chat drawer
      setInitialPrompt(inputValue);
      setIsChatOpen(true);
      setInputValue('');
      setIsPromptExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsPromptExpanded(true);
  };

  const handleCollapse = () => {
    setIsPromptExpanded(false);
  };

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        handleCollapse();
      }
    };

    if (isPromptExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPromptExpanded]);

  // Handle Escape key to collapse
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCollapse();
        inputRef.current?.blur();
      }
    };

    if (isPromptExpanded) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isPromptExpanded]);

  return (
    <AnimatePresence>
      <motion.div 
        ref={containerRef}
        className={styles.container}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className={`${styles.wrapper} ${isPromptExpanded ? styles.expanded : ''}`}>
          {/* Top row: Input */}
          <div className={styles.inputRow}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                ref={inputRef}
                type="text"
                className={styles.input}
                placeholder="Ask anything"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleFocus}
              />
            </form>

            {/* Suggestions in compact state (right side) */}
            {!isPromptExpanded && (
              <div className={styles.suggestionsCompact}>
                {suggestions.map((suggestion) => (
                  <SuggestionButton
                    key={suggestion.id}
                    icon={suggestion.icon}
                    label={suggestion.label}
                    onClick={() => handleSuggestionClick(suggestion.prompt)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Bottom row: Tools (only in expanded state) */}
          <AnimatePresence initial={false}>
            {isPromptExpanded && (
              <motion.div 
                className={styles.toolsWrapper}
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: 'auto',
                  opacity: 1,
                  transition: {
                    height: {
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    },
                    opacity: {
                      duration: 0.2,
                      ease: 'easeOut'
                    }
                  }
                }}
                exit={{ 
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: {
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    },
                    opacity: {
                      duration: 0.2,
                      ease: 'easeIn'
                    }
                  }
                }}
              >
                <div className={styles.tools}>
                  <div className={styles.toolsLeft}>
                    <button 
                      type="button" 
                      className={styles.toolButton}
                      title="Attach file"
                    >
                      <AttachmentIcon />
                    </button>
                    <button 
                      type="button" 
                      className={styles.toolButton}
                      title="Voice input"
                    >
                      <VoiceIcon />
                    </button>

                    {/* Suggestions in expanded state (next to tools) */}
                    <div className={styles.suggestionsExpanded}>
                      {suggestions.map((suggestion) => (
                        <SuggestionButton
                          key={suggestion.id}
                          icon={suggestion.icon}
                          label={suggestion.label}
                          onClick={() => handleSuggestionClick(suggestion.prompt)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className={styles.toolsRight}>
                    <button 
                      type="submit" 
                      className={styles.submitButton}
                      disabled={!inputValue.trim()}
                      onClick={handleSubmit}
                    >
                      <SendIcon />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Icon components
function AttachmentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M17.5 9.16667V10C17.5 13.2217 14.8883 15.8333 11.6667 15.8333C8.445 15.8333 5.83333 13.2217 5.83333 10V5.83333C5.83333 3.53215 7.69881 1.66667 10 1.66667C12.3012 1.66667 14.1667 3.53215 14.1667 5.83333V10C14.1667 11.3807 13.047 12.5 11.6667 12.5C10.2864 12.5 9.16667 11.3807 9.16667 10V5.83333" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VoiceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10V5C12.5 3.61929 11.3807 2.5 10 2.5C8.61929 2.5 7.5 3.61929 7.5 5V10C7.5 11.3807 8.61929 12.5 10 12.5Z" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M15.8333 9.16667V10C15.8333 13.2217 13.2217 15.8333 10 15.8333M10 15.8333C6.77834 15.8333 4.16667 13.2217 4.16667 10V9.16667M10 15.8333V18.3333M6.66667 18.3333H13.3333" 
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