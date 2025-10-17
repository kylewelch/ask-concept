import styles from './SuggestionButton.module.css';

interface SuggestionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export function SuggestionButton({ icon, label, onClick }: SuggestionButtonProps) {
  return (
    <button className={styles.button} onClick={onClick} type="button">
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </button>
  );
}