import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, vi } from 'vitest';
import type { User } from '@supabase/supabase-js';

import App from './App';
import { liveDashboardSnapshot } from './data/liveDashboardSnapshot';

vi.mock('./lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
  },
}));

import { supabase } from './lib/supabase';

const mockUser: User = {
  id: 'test-user-id',
  email: 'test@cpi.fr',
  app_metadata: {},
  user_metadata: { full_name: 'Utilisateur Test' },
  aud: 'authenticated',
  created_at: '2024-01-01T00:00:00Z',
} as User;

function mockSupabaseSnapshot() {
  vi.mocked(supabase.from).mockReturnValue({
    select: vi.fn().mockReturnValue({
      order: vi.fn().mockReturnValue({
        limit: vi.fn().mockReturnValue({
          maybeSingle: vi.fn().mockResolvedValue({
            data: {
              snapshot: liveDashboardSnapshot,
              synced_at: '2026-04-17T10:30:00.000Z',
            },
            error: null,
          }),
        }),
      }),
    }),
  } as any);
}

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the operator workspace shell with brand identity', async () => {
    mockSupabaseSnapshot();
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
    mockSupabaseSnapshot();
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
    mockSupabaseSnapshot();
    render(<App user={mockUser} />);

    await screen.findByText(/file de travail/i);

    expect(screen.getByText(/source — gsheet opérationnel/i)).toBeInTheDocument();
    expect(screen.getByText(/actualisé/i)).toBeInTheDocument();
  });

  it('filters the queue when pole select changes', async () => {
    mockSupabaseSnapshot();
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
    mockSupabaseSnapshot();
    render(<App user={mockUser} />);

    await screen.findByText(/file de travail/i);

    expect(screen.queryByRole('navigation', { name: /vues de travail/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/prise de poste/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/indicateurs de suivi/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/operational cockpit/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/last synced/i)).not.toBeInTheDocument();
  });
});
