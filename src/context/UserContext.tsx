import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

export type UserContextValue = {
  user: User;
  displayName: string;
};

export const UserContext = createContext<UserContextValue | null>(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserContext.Provider');
  return ctx;
}

export function getDisplayName(user: User): string {
  return (
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Utilisateur'
  );
}
