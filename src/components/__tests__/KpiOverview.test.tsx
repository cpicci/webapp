import { render, screen, within } from '@testing-library/react';

import KpiOverview from '../KpiOverview';
import { buildDashboardViewModel } from '../../data/dashboardAdapter';
import { liveDashboardSnapshot } from '../../data/liveDashboardSnapshot';

function getKpiCard(container: HTMLElement, title: string) {
  const titleNode = within(container).getByText(title);

  return titleNode.closest('article') as HTMLElement;
}

describe('KpiOverview', () => {
  it('renders secondary KPI cards with canonical French labels', () => {
    const viewModel = buildDashboardViewModel(liveDashboardSnapshot, {
      pole: 'all',
      status: 'all',
    });

    render(<KpiOverview cards={viewModel.kpiCards} />);

    const overview = screen.getByRole('region', { name: /indicateurs de suivi/i });
    expect(within(overview).getByText('Dossiers ouverts')).toBeInTheDocument();
    expect(within(overview).getByText('Relances à traiter')).toBeInTheDocument();
    expect(within(overview).getByText('Priorités du jour')).toBeInTheDocument();
    expect(within(overview).getByText('Activité récente')).toBeInTheDocument();
    expect(within(overview).getByText('Indicateurs à venir')).toBeInTheDocument();
    expect(within(overview).queryByText(/^ready$/i)).not.toBeInTheDocument();
    expect(within(overview).queryByText(/^placeholder$/i)).not.toBeInTheDocument();
    expect(within(overview).getByText(/source à confirmer/i)).toBeInTheDocument();
    expect(within(overview).queryByText(/coming soon/i)).not.toBeInTheDocument();
    expect(within(getKpiCard(overview, 'Dossiers ouverts')).getByText('9')).toBeInTheDocument();
    expect(within(getKpiCard(overview, 'Priorités du jour')).getByText('9')).toBeInTheDocument();
  });
});
