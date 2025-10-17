import { Message } from '@ai-sdk/react';
import ReactMarkdown from 'react-markdown';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`${styles.message} ${isUser ? styles.user : styles.assistant}`}>
      <div className={styles.avatar}>
        {isUser ? (
          <UserAvatar />
        ) : (
          <AssistantAvatar />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.role}>
          {isUser ? 'You' : 'Assistant'}
        </div>
        <div className={styles.text}>
          {isUser ? (
            message.content
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
                code: ({ inline, children, ...props }: any) => {
                  return inline ? (
                    <code className={styles.inlineCode} {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className={styles.codeBlock} {...props}>
                      {children}
                    </code>
                  );
                },
                ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
                ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
                li: ({ children }) => <li className={styles.listItem}>{children}</li>,
                strong: ({ children }) => <strong className={styles.bold}>{children}</strong>,
                em: ({ children }) => <em className={styles.italic}>{children}</em>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
          {isStreaming && !isUser && <span className={styles.cursor}>▊</span>}
        </div>
      </div>
    </div>
  );
}

function UserAvatar() {
  return (
    <div className={styles.userAvatar}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M17.5 17.5C17.5 14.4624 14.1421 12 10 12C5.85786 12 2.5 14.4624 2.5 17.5" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function AssistantAvatar() {
  return (
    <div className={styles.assistantAvatar}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M10 2.5L12.5 7.5L17.5 8.25L13.75 12L14.5 17.5L10 15L5.5 17.5L6.25 12L2.5 8.25L7.5 7.5L10 2.5Z" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}