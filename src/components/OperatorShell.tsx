import { supabase } from '../lib/supabase';
import { useUser } from '../context/UserContext';

export default function OperatorShell() {
  const { displayName } = useUser();

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <header className="shell">
      <div className="brand">
        <span className="brand-eyebrow">Espace opérateur</span>
        <h1 className="brand-title">
          <span className="brand-accent">C</span>entral Parc Immo
        </h1>
      </div>
      <div className="operator">
        <span className="operator-name">Bonjour, {displayName}</span>
        <span className="operator-context">CPI</span>
        <button type="button" className="btn-logout" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}
