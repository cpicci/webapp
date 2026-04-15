import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, vi } from 'vitest';
import type { User } from '@supabase/supabase-js';

import App from './App';
import { liveDashboardSnapshot } from './data/liveDashboardSnapshot';

const mockUser: User = {
  id: 'test-user-id',
  email: 'test@cpi.fr',
  app_metadata: {},
  user_metadata: { full_name: 'Utilisateur Test' },
  aud: 'authenticated',
  created_at: '2024-01-01T00:00:00Z',
} as User;

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => liveDashboardSnapshot,
    } as Response);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the operator workspace shell with brand identity', async () => {
    render(<App user={mockUser} />);

    // Loading state appears first
    expect(screen.getByText(/chargement des données/i)).toBeInTheDocument();

    // Shell renders — h1 accessible name includes split span text
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/central parc immo/i);

    expect(screen.getByText(/espace opérateur/i)).toBeInTheDocument();
    expect(screen.getByText((_, el) =>
      el?.tagName === 'SPAN' && !!el?.textContent?.match(/bonjour/i)
    )).toBeInTheDocument();
  });

  it('renders the work queue and persistent detail after data loads', async () => {
    render(<App user={mockUser} />);

    // Wait for data to load — queue region appears
    await screen.findByText(/file de travail/i);

    // Queue structure
    expect(screen.getByLabelText(/file de travail/i)).toBeInTheDocument();

    // At least one queue group heading visible
    const groupHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(groupHeadings.length).toBeGreaterThan(0);

    // Detail panel present — either empty state or with item
    await waitFor(() => {
      const detail = document.querySelector('aside.detail-region');
      expect(detail).toBeInTheDocument();
    });
  });

  it('shows source freshness info after data loads', async () => {
    render(<App user={mockUser} />);

    await screen.findByText(/file de travail/i);

    expect(screen.getByText(/source — gsheet opérationnel/i)).toBeInTheDocument();
    expect(screen.getByText(/mis à jour le/i)).toBeInTheDocument();
  });

  it('filters the queue when pole select changes', async () => {
    const user = userEvent.setup();

    render(<App user={mockUser} />);

    await screen.findByText(/file de travail/i);

    const poleSelect = screen.getByLabelText(/pôle/i);
    await user.selectOptions(poleSelect, 'Travaux');

    await waitFor(() => {
      expect((poleSelect as HTMLSelectElement).value).toBe('Travaux');
    });
  });

  it('does not render old dashboard-era elements', async () => {
    render(<App user={mockUser} />);

    await screen.findByText(/file de travail/i);

    expect(screen.queryByRole('navigation', { name: /vues de travail/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/prise de poste/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/indicateurs de suivi/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/operational cockpit/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last synced/i)).not.toBeInTheDocument();
  });
});
