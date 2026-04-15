import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import OperationalPanels from '../OperationalPanels';
import { buildDashboardViewModel } from '../../data/dashboardAdapter';
import { liveDashboardSnapshot } from '../../data/liveDashboardSnapshot';
import type { ComptaRow, DossierRow, FollowUpItem, RelanceRow } from '../../types/dashboard';

describe('OperationalPanels', () => {
  it('renders an editorial home view with a persistent detail panel', () => {
    const viewModel = buildDashboardViewModel(liveDashboardSnapshot, {
      pole: 'all',
      status: 'all',
    });

    render(
      <OperationalPanels
        actionItems={viewModel.actionItems}
        recentItems={viewModel.recentItems}
        dossiers={viewModel.dossiers}
        relances={viewModel.relances}
        comptaRows={viewModel.comptaRows}
        kpiCards={viewModel.kpiCards}
        activeView="home"
      />,
    );

    const panels = screen.getByRole('region', { name: /accueil opérateur/i });
    const detail = screen.getByRole('region', { name: /détail de l'élément sélectionné/i });

    expect(within(panels).getByRole('heading', { name: /urgences du jour/i })).toBeInTheDocument();
    expect(within(panels).getByRole('heading', { name: /dossiers à reprendre/i })).toBeInTheDocument();
    expect(within(panels).getByRole('heading', { name: /relances à reprendre/i })).toBeInTheDocument();
    expect(within(panels).getByText(/les sujets qui demandent une reprise immédiate/i)).toBeInTheDocument();
    expect(within(panels).getAllByText(/toiture lot 32/i).length).toBeGreaterThan(0);
    expect(within(panels).queryByText(/subject:empty\|/i)).not.toBeInTheDocument();
    expect(within(panels).queryAllByText(/^relance sans objet$/i)).toHaveLength(0);
    expect(within(detail).getByText(/élément sélectionné/i)).toBeInTheDocument();
    expect(within(detail).getByText(/contexte de traitement/i)).toBeInTheDocument();
    expect(within(detail).getByRole('heading', { name: /activité liée/i })).toBeInTheDocument();
    expect(within(detail).queryByRole('heading', { name: /repère comptable/i })).not.toBeInTheDocument();
    expect(within(detail).queryByText(/repères de suivi/i)).not.toBeInTheDocument();
  });

  it('updates the detail panel when a dossier is selected in the dossiers view', async () => {
    const user = userEvent.setup();
    const viewModel = buildDashboardViewModel(liveDashboardSnapshot, {
      pole: 'all',
      status: 'all',
    });

    render(
      <OperationalPanels
        actionItems={viewModel.actionItems}
        recentItems={viewModel.recentItems}
        dossiers={viewModel.dossiers}
        relances={viewModel.relances}
        comptaRows={viewModel.comptaRows}
        kpiCards={viewModel.kpiCards}
        activeView="dossiers"
      />,
    );

    const dossiersSection = screen.getByRole('region', { name: /liste des dossiers/i });

    await user.click(
      within(dossiersSection).getAllByRole('button')[0],
    );

    const detail = screen.getByRole('region', { name: /détail de l'élément sélectionné/i });
    expect(within(detail).getByText(/dossier suivi/i)).toBeInTheDocument();
    expect(within(detail).getByRole('heading', { name: /constat de dégâts reçu pour ouverture de sinistre/i })).toBeInTheDocument();
    expect(within(detail).getByText(/référence dossier/i)).toBeInTheDocument();
  });

  it('renders dedicated relance sections in the relances view', () => {
    const viewModel = buildDashboardViewModel(liveDashboardSnapshot, {
      pole: 'all',
      status: 'all',
    });

    render(
      <OperationalPanels
        actionItems={viewModel.actionItems}
        recentItems={viewModel.recentItems}
        dossiers={viewModel.dossiers}
        relances={viewModel.relances}
        comptaRows={viewModel.comptaRows}
        kpiCards={viewModel.kpiCards}
        activeView="relances"
      />,
    );

    const relances = screen.getByRole('region', { name: /liste des relances/i });
    expect(within(relances).getByRole('heading', { name: /^relances à traiter$/i })).toBeInTheDocument();
    expect(within(relances).getByRole('heading', { name: /relances préparées/i })).toBeInTheDocument();
    expect(within(relances).queryByRole('heading', { name: /dossiers à reprendre/i })).not.toBeInTheDocument();
  });

  it('replaces raw unknown values with user-facing fallbacks', () => {
    const actionItems: FollowUpItem[] = [
      {
        id: 'rel-1',
        kind: 'relance',
        title: 'Relance test',
        context: 'Texte de relance tres long pour verifier le rendu metier',
        pole: 'unknown',
        state: 'action-needed',
        primaryDate: '',
        secondaryDateLabel: 'Due',
      },
    ];

    const dossiers: DossierRow[] = [
      {
        dossierId: 'DOS-1',
        title: 'Dossier test',
        copro: 'Residence de test',
        status: 'open',
        priority: 'Haute',
        createdAt: '',
        updatedAt: '',
        followUpState: 'routine',
        normalizedAgency: 'CPI',
        normalizedMetier: 'Syndic',
        pole: 'unknown',
        dataQuality: 'known',
      },
    ];

    const relances: RelanceRow[] = [
      {
        relanceId: 'REL-1',
        dossierId: 'DOS-1',
        status: 'pending',
        dueDate: '',
        createdAt: '',
        reminder: 'Rappel',
        followUpState: 'action-needed',
        normalizedAgency: 'CPI',
        normalizedMetier: 'Syndic',
        pole: 'unknown',
        dataQuality: 'known',
      },
    ];

    const comptaRows: ComptaRow[] = [];

    render(
      <OperationalPanels
        actionItems={actionItems}
        recentItems={[]}
        dossiers={dossiers}
        relances={relances}
        comptaRows={comptaRows}
        kpiCards={[]}
        activeView="home"
      />,
    );

    const panels = screen.getByRole('region', { name: /accueil opérateur/i });

    expect(within(panels).queryByText(/^unknown$/i)).not.toBeInTheDocument();
  });
});
