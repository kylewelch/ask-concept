import { useMemo } from 'react';

interface Suggestion {
  id: string;
  icon: string;
  label: string;
  prompt: string;
}

const suggestionsByContext: Record<string, Suggestion[]> = {
  dashboard: [
    { id: 'summary', icon: '📊', label: 'Summarize today', prompt: 'Can you summarize my activity today?' },
    { id: 'metrics', icon: '📈', label: 'Show metrics', prompt: 'Show me key metrics from this week' },
  ],
  recipes: [
    { id: 'all-recipes', icon: '🍳', label: 'All recipes', prompt: 'Show me all my recipes' },
    { id: 'suggest', icon: '🤔', label: 'Suggest dinner', prompt: 'Suggest a dinner recipe for tonight' },
  ],
  todos: [
    { id: 'recent', icon: '📝', label: 'List recent todos', prompt: 'List my recent todos' },
    { id: 'urgent', icon: '⚡', label: "What's urgent?", prompt: "What tasks are urgent?" },
  ],
  meetings: [
    { id: 'notes', icon: '📝', label: 'My notes', prompt: 'Show me my meeting notes' },
    { id: 'recap', icon: '📅', label: 'Write weekly recap', prompt: 'Write a recap of my meetings this week' },
  ],
  team: [
    { id: 'org-chart', icon: '👥', label: 'Team structure', prompt: "Show me our team's organization" },
    { id: 'whos-who', icon: '🔍', label: "Who's who", prompt: "Who is Evan Park's manager?" },
  ],
  default: [
    { id: 'help', icon: '💡', label: 'Get help', prompt: 'What can you help me with?' },
    { id: 'search', icon: '🔍', label: 'Search', prompt: 'Search for...' },
  ],
};

export function useSuggestions(pageContext: string): Suggestion[] {
  return useMemo(() => {
    return suggestionsByContext[pageContext] || suggestionsByContext.default;
  }, [pageContext]);
}