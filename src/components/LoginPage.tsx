import { useState } from 'react';

import { supabase } from '../lib/supabase';

type Mode = 'login' | 'signup';

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: name },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Compte créé. Vérifiez votre email pour confirmer votre inscription.');
      }
    }

    setLoading(false);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <span className="brand-eyebrow">Espace opérateur</span>
          <h1 className="brand-title">
            <span className="brand-accent">C</span>entral Parc Immo
          </h1>
        </div>

        <div className="login-tabs">
          <button
            type="button"
            className={mode === 'login' ? 'login-tab active' : 'login-tab'}
            onClick={() => { setMode('login'); setError(null); setSuccess(null); }}
          >
            Connexion
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'login-tab active' : 'login-tab'}
            onClick={() => { setMode('signup'); setError(null); setSuccess(null); }}
          >
            Créer un compte
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-field">
              <label htmlFor="name">Prénom et nom</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Fabrice Dupont"
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@centralparcimmo.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'signup' ? 'Minimum 6 caractères' : ''}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength={mode === 'signup' ? 6 : undefined}
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading
              ? 'Chargement…'
              : mode === 'login'
                ? 'Se connecter'
                : 'Créer mon compte'}
          </button>
        </form>
      </div>
    </div>
  );
}
